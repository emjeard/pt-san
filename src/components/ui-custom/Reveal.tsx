import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds (0–400 recommended). */
  delay?: number;
  as?: ElementType;
  once?: boolean;
};

/**
 * Lightweight scroll reveal — fade + 12–14px rise when entering the viewport.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  as: Comp = "div",
  once = true,
}: RevealProps) => {
  const [ref, isInView] = useInView<HTMLElement>({ once });

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Comp
      ref={ref}
      className={cn("reveal", isInView && "reveal-visible", className)}
      style={style}
    >
      {children}
    </Comp>
  );
};
