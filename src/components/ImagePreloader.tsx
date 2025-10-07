import { useEffect } from "react";
import { preloadImages } from "@/utils/imageOptimization";

// Import des images pour le preloading
import image1 from "@/assets/images/1.jpg";
import image2 from "@/assets/images/2.jpg";
import image3 from "@/assets/images/3.jpg";
import image4 from "@/assets/images/4.jpg";
import image5 from "@/assets/images/5.jpg";
import image6 from "@/assets/images/6.jpg";
import image7 from "@/assets/images/7.jpg";
import image8 from "@/assets/images/8.jpg";
import image9 from "@/assets/images/9.jpg";
import image10 from "@/assets/images/10.jpg";
import image11 from "@/assets/images/11.jpg";
import image12 from "@/assets/images/12.jpg";
import image13 from "@/assets/images/13.jpg";

const allImages = [
  image1, image2, image3, image4, image5, image6, image7,
  image8, image9, image10, image11, image12, image13
];

interface ImagePreloaderProps {
  onPreloadComplete?: () => void;
  priority?: boolean;
}

const ImagePreloader = ({ onPreloadComplete, priority = false }: ImagePreloaderProps) => {
  useEffect(() => {
    if (priority) {
      // Preload les premières images en priorité
      const priorityImages = allImages.slice(0, 6);
      preloadImages(priorityImages).then(() => {
        onPreloadComplete?.();
      });

      // Preload le reste en arrière-plan
      setTimeout(() => {
        const remainingImages = allImages.slice(6);
        preloadImages(remainingImages);
      }, 1000);
    } else {
      // Preload progressif
      preloadImages(allImages).then(() => {
        onPreloadComplete?.();
      });
    }
  }, [onPreloadComplete, priority]);

  return null; // Composant invisible
};

export default ImagePreloader;
