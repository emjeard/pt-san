import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export const SectionHeading = ({
  label,
  title,
  subtitle,
  align = "left",
  id,
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      "max-w-3xl",
      align === "center" && "mx-auto text-center",
      className,
    )}
  >
    {label ? (
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
        {label}
      </p>
    ) : null}
    <h2 id={id} className="font-heading text-3xl md:text-4xl">
      {title}
    </h2>
    {subtitle ? (
      <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
    ) : null}
  </div>
);
