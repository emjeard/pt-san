import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui-custom/Reveal";

export type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
  /** Disable scroll reveal for this heading. */
  noReveal?: boolean;
};

export const SectionHeading = ({
  label,
  title,
  subtitle,
  align = "left",
  id,
  className,
  noReveal = false,
}: SectionHeadingProps) => {
  const content = (
    <>
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
    </>
  );

  const classes = cn(
    "max-w-3xl",
    align === "center" && "mx-auto text-center",
    className,
  );

  if (noReveal) {
    return <div className={classes}>{content}</div>;
  }

  return (
    <Reveal className={classes} delay={0}>
      {content}
    </Reveal>
  );
};
