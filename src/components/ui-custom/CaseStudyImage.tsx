import { ImageIcon } from "lucide-react";
import { caseStudyImages } from "@/data/caseStudyImages";
import type { Language } from "@/data/translations";
import { cn } from "@/lib/utils";

type CaseStudyImageProps = {
  caseStudyId: string;
  lang: Language;
  className?: string;
  /** Larger hero treatment on detail pages */
  size?: "card" | "hero";
};

export const CaseStudyImage = ({
  caseStudyId,
  lang,
  className,
  size = "card",
}: CaseStudyImageProps) => {
  const image = caseStudyImages[caseStudyId];

  if (!image) {
    return (
      <div
        className={cn(
          "flex aspect-[16/9] items-center justify-center border-b border-border bg-softmint/50",
          className,
        )}
      >
        <div className="text-center text-muted-foreground">
          <ImageIcon className="mx-auto mb-2 h-8 w-8 opacity-50" aria-hidden="true" />
          <p className="text-sm font-medium">
            {lang === "id" ? "Pratinjau Proyek" : "Project Preview"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure
      className={cn(
        "relative overflow-hidden border-b border-border bg-softmint/40",
        size === "hero" ? "aspect-[21/9] rounded-2xl border" : "aspect-[16/9]",
        className,
      )}
    >
      <img
        src={image.src}
        alt={image.alt[lang]}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      {image.illustrative ? (
        <figcaption className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
          {lang === "id" ? "Ilustrasi konseptual" : "Conceptual illustration"}
        </figcaption>
      ) : null}
    </figure>
  );
};
