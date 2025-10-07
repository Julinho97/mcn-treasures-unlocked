import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Box, Download, RotateCw, Maximize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ARViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artworkTitle: string;
}

const ARViewer = ({ open, onOpenChange, artworkTitle }: ARViewerProps) => {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationX, setRotationX] = useState(20);
  const [rotationY, setRotationY] = useState(45);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPositionRef.current.x;
    const deltaY = e.clientY - lastPositionRef.current.y;
    setRotationY((prev) => prev + deltaX * 0.5);
    setRotationX((prev) => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.max(0.5, Math.min(2, prev - e.deltaY * 0.001)));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Visualisation 3D - {artworkTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 3D Viewer Interactive */}
          <div 
            ref={containerRef}
            className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-8 border border-border relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ perspective: "1000px" }}
          >
            {/* 3D Object */}
            <div
              className="relative transition-transform duration-100"
              style={{
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front face */}
              <div 
                className="absolute w-32 h-32 gradient-hero flex items-center justify-center shadow-glow rounded-2xl"
                style={{ transform: "translateZ(64px)" }}
              >
                <Box className="w-16 h-16 text-primary-foreground" />
              </div>
              
              {/* Back face */}
              <div 
                className="absolute w-32 h-32 bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-glow rounded-2xl"
                style={{ transform: "translateZ(-64px) rotateY(180deg)" }}
              >
                <Box className="w-16 h-16 text-primary-foreground" />
              </div>
              
              {/* Left face */}
              <div 
                className="absolute w-32 h-32 bg-gradient-to-br from-primary/80 to-secondary/80 shadow-glow rounded-2xl"
                style={{ transform: "rotateY(-90deg) translateZ(64px)" }}
              />
              
              {/* Right face */}
              <div 
                className="absolute w-32 h-32 bg-gradient-to-br from-secondary/80 to-primary/80 shadow-glow rounded-2xl"
                style={{ transform: "rotateY(90deg) translateZ(64px)" }}
              />
              
              {/* Top face */}
              <div 
                className="absolute w-32 h-32 bg-gradient-to-br from-primary/60 to-secondary/60 shadow-glow rounded-2xl"
                style={{ transform: "rotateX(90deg) translateZ(64px)" }}
              />
              
              {/* Bottom face */}
              <div 
                className="absolute w-32 h-32 bg-gradient-to-br from-secondary/60 to-primary/60 shadow-glow rounded-2xl"
                style={{ transform: "rotateX(-90deg) translateZ(64px)" }}
              />
            </div>

            {/* Grid background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }} />
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">🖱️ Glissez pour tourner • 🖲️ Molette pour zoomer</p>
            <p className="text-xs text-muted-foreground">
              Version interactive WebGL - Compatible tous navigateurs
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              variant="outline"
              onClick={() => setIsRotating(!isRotating)}
              className="gap-2"
            >
              <RotateCw className="w-4 h-4" />
              {isRotating ? 'Pause' : 'Auto-rotation'}
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                setRotationX(20);
                setRotationY(45);
                setScale(1);
              }}
            >
              <Maximize2 className="w-4 h-4" />
              Réinitialiser
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARViewer;
