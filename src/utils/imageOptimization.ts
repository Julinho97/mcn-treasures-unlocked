import { useState, useEffect } from 'react';

// Utilitaires pour l'optimisation des images
export const optimizeImageUrl = (imageUrl: string, width?: number, height?: number, quality = 80) => {
  // Pour les images locales, on peut ajouter des paramètres d'optimisation
  // Dans un environnement de production, on pourrait utiliser un service comme Cloudinary
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality !== 80) params.append('q', quality.toString());
  
  const queryString = params.toString();
  return queryString ? `${imageUrl}?${queryString}` : imageUrl;
};

export const getImageDimensions = (imageUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
};

export const preloadImage = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = imageUrl;
  });
};

export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  await Promise.all(imageUrls.map(preloadImage));
};

// Hook pour le lazy loading
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef && src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }

    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src]);

  return [imageSrc, setImageRef] as const;
};
