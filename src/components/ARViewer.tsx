import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Box, Download } from "lucide-react";
import { useState } from "react";

interface ARViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artworkTitle: string;
}

const ARViewer = ({ open, onOpenChange, artworkTitle }: ARViewerProps) => {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Visualisation 3D - {artworkTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 3D Viewer Placeholder */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center gap-6 p-8 border-2 border-dashed border-primary/30 relative overflow-hidden">
            {/* Rotating 3D Icon */}
            <div className={`w-32 h-32 rounded-2xl gradient-hero flex items-center justify-center shadow-glow ${isRotating ? 'animate-spin' : ''}`}
                 style={{ animationDuration: '4s' }}>
              <Box className="w-16 h-16 text-primary-foreground" />
            </div>

            {/* Info */}
            <div className="text-center space-y-3 z-10">
              <p className="font-semibold text-lg">Modèle 3D interactif</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Utilisez votre smartphone pour voir l'œuvre en réalité augmentée dans votre espace
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-primary rounded-full"
                  style={{
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animation: `pulse ${Math.random() * 3 + 2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setIsRotating(!isRotating)}
              className="gap-2"
            >
              <Box className="w-4 h-4" />
              {isRotating ? 'Pause' : 'Rotation'}
            </Button>
            <Button variant="outline" className="gap-2">
              <Camera className="w-4 h-4" />
              Capturer
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Sauvegarder
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            WebAR - Compatible avec iOS 12+ et Android 8+
            <br />
            <span className="text-primary">(Fonctionnalité en développement)</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARViewer;
