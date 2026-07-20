import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewOptions = {
  /** Trigger only once when first visible (default true). */
  once?: boolean;
  /** Root margin for earlier/later trigger. */
  rootMargin?: string;
  /** Visibility threshold 0–1. */
  threshold?: number;
};

export const useInView = <T extends Element>(
  options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] => {
  const { once = true, rootMargin = "0px 0px -8% 0px", threshold = 0.12 } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setIsInView(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, isInView];
};
