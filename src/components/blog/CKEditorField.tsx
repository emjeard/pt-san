import { useEffect, useRef, useState } from "react";
import { uploadImageKit } from "@/lib/blog";

interface CKEditorFieldProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Quill: any;
    _quillLoading?: Promise<void>;
  }
}

const QUILL_VERSION = "2.0.3";
const QUILL_CSS = `https://cdn.jsdelivr.net/npm/quill@${QUILL_VERSION}/dist/quill.snow.css`;
const QUILL_JS = `https://cdn.jsdelivr.net/npm/quill@${QUILL_VERSION}/dist/quill.js`;

function loadQuill(): Promise<void> {
  if (window.Quill) return Promise.resolve();
  if (window._quillLoading) return window._quillLoading;

  if (!document.querySelector(`link[href="${QUILL_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = QUILL_CSS;
    document.head.appendChild(link);
  }

  window._quillLoading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = QUILL_JS;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Gagal memuat editor"));
    document.head.appendChild(script);
  });

  return window._quillLoading;
}

const TOOLBAR = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline", "strike"],
  ["link", "blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["image"],
  ["clean"],
];

export function CKEditorField({ value, onChange, id = "content" }: CKEditorFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  onChangeRef.current = onChange;
  valueRef.current = value;

  useEffect(() => {
    let cancelled = false;

    loadQuill().then(() => {
      if (cancelled || !containerRef.current || quillRef.current) return;

      const quill = new window.Quill(containerRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: TOOLBAR,
            handlers: {
              // Override default image handler → upload to ImageKit
              image: () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/jpeg,image/png,image/webp,image/gif");
                input.click();

                input.onchange = async () => {
                  const file = input.files?.[0];
                  if (!file) return;
                  if (file.size > 5_000_000) {
                    setUploadError("Ukuran gambar maksimal 5 MB.");
                    return;
                  }

                  setUploading(true);
                  setUploadError("");

                  try {
                    const reader = new FileReader();
                    reader.onload = async () => {
                      try {
                        const base64 = reader.result as string;
                        const url = await uploadImageKit(base64, file.name);
                        // Insert image at current cursor position
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, "image", url, "user");
                        quill.setSelection(range.index + 1, 0, "silent");
                      } catch (err) {
                        setUploadError(err instanceof Error ? err.message : "Upload gagal.");
                      } finally {
                        setUploading(false);
                      }
                    };
                    reader.readAsDataURL(file);
                  } catch (err) {
                    setUploadError(err instanceof Error ? err.message : "Gagal membaca file.");
                    setUploading(false);
                  }
                };
              },
            },
          },
        },
        placeholder: "Tulis konten artikel di sini...",
      });

      quillRef.current = quill;

      if (valueRef.current) {
        quill.root.innerHTML = valueRef.current;
      }

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        const output = html === "<p><br></p>" ? "" : html;
        if (output !== valueRef.current) {
          onChangeRef.current(output);
        }
      });
    }).catch(console.error);

    return () => {
      cancelled = true;
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (e.g. switching between articles)
  useEffect(() => {
    if (!quillRef.current) return;
    const current = quillRef.current.root.innerHTML;
    const normalized = current === "<p><br></p>" ? "" : current;
    if (normalized !== value) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div id={id} className="quill-editor-wrapper rounded-md border border-input bg-background [&_.ql-container]:text-base [&_.ql-editor]:min-h-[400px]">
      {/* Upload status bar */}
      {(uploading || uploadError) && (
        <div className={`flex items-center gap-2 border-b px-4 py-2 text-xs ${uploadError ? "bg-destructive/10 text-destructive" : "bg-primary/5 text-primary"}`}>
          {uploading ? (
            <>
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Mengunggah gambar ke ImageKit...
            </>
          ) : (
            <>
              <span>⚠</span> {uploadError}
            </>
          )}
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
