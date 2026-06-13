interface SkeletonCardProps {
  className?: string;
}

/** A generic pulsing skeleton card placeholder */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-muted overflow-hidden${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div className="aspect-[16/10] w-full bg-muted-foreground/10" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-1/4 rounded-full bg-muted-foreground/15" />
        <div className="h-5 w-3/4 rounded-full bg-muted-foreground/20" />
        <div className="h-4 w-full rounded-full bg-muted-foreground/10" />
        <div className="h-4 w-5/6 rounded-full bg-muted-foreground/10" />
      </div>
    </div>
  );
}

interface SkeletonTextProps {
  lines?: number;
}

/** Pulsing text line placeholders */
export function SkeletonText({ lines = 3 }: SkeletonTextProps) {
  return (
    <div className="animate-pulse space-y-2" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded-full bg-muted-foreground/15 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}
