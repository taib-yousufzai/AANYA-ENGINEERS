import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wraps children in a div that fades up into view when it enters the viewport.
 * Uses IntersectionObserver with a CSS-only animation (no animation library).
 * Gracefully degrades: if IntersectionObserver is unavailable, content is
 * immediately visible.
 */
export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Graceful degradation: if IO not available, show immediately
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = visible
    ? { animationDelay: `${delay}ms` }
    : { opacity: 0, transform: "translateY(24px)" };

  return (
    <div
      ref={ref}
      className={`${visible ? "animate-fade-up" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
