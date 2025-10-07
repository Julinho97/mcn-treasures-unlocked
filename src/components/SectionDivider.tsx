import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: 'default' | 'gradient' | 'dots' | 'wave';
}

const SectionDivider = ({ className, variant = 'default' }: SectionDividerProps) => {
  if (variant === 'gradient') {
    return (
      <div className={cn("w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent", className)} />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn("flex justify-center py-8", className)}>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-muted/50"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-px bg-border/50", className)} />
  );
};

export default SectionDivider;
