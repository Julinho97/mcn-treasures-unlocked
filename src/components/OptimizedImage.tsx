import { useState, useRef, useEffect } from "react";
import { useLazyImage } from "@/utils/imageOptimization";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  placeholder,
  blurDataURL,
  width,
  height,
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, imageRef] = useLazyImage(src, placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Preload si priorité ou charger directement
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
      img.src = src;
    }
  }, [priority, src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder avec blur */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover filter blur-sm scale-110",
            "transition-opacity duration-300",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
          aria-hidden="true"
        />
      )}

      {/* Image principale */}
      <img
        ref={(el) => {
          imageRef(el);
          imgRef.current = el;
        }}
        src={priority ? src : currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />

      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm">Erreur de chargement</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
