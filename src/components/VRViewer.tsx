import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Move3D, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Info,
  Compass
} from "lucide-react";

interface VRViewerProps {
  image360: string;
  title: string;
  description: string;
  hotspots?: Array<{
    x: number;
    y: number;
    title: string;
    description: string;
  }>;
  onHotspotClick?: (hotspot: any) => void;
}

const VRViewer = ({ image360, title, description, hotspots = [], onHotspotClick }: VRViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => prev + deltaX * 0.5);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div 
          ref={containerRef}
          className={`
            relative aspect-video bg-black overflow-hidden cursor-grab active:cursor-grabbing
            ${isFullscreen ? 'fixed inset-0 z-50 aspect-auto' : ''}
          `}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 360° Image */}
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
            style={{
              backgroundImage: `url(${image360})`,
              transform: `scale(${zoom}) rotateY(${rotation}deg)`,
              backgroundPosition: 'center center'
            }}
          />

          {/* VR Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
              <div className="flex gap-2">
                <Badge variant="secondary" className="backdrop-blur-sm">
                  <Move3D className="w-3 h-3 mr-1" />
                  360° VR
                </Badge>
                <Badge variant="secondary" className="backdrop-blur-sm">
                  <Compass className="w-3 h-3 mr-1" />
                  Interactif
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowHotspots(!showHotspots)}
                  className="backdrop-blur-sm"
                >
                  <Info className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="backdrop-blur-sm"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Center Info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <div className="text-center space-y-4 bg-black/40 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-white/90 max-w-md">{description}</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Explorer'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleZoomOut}
                  className="backdrop-blur-sm"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleZoomIn}
                  className="backdrop-blur-sm"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="bg-black/40 backdrop-blur-sm rounded px-3 py-1">
                  <span className="text-white text-sm">
                    Zoom: {Math.round(zoom * 100)}% | Rotation: {Math.round(rotation)}°
                  </span>
                </div>
              </div>
            </div>

            {/* Hotspots */}
            {showHotspots && hotspots.map((hotspot, index) => (
              <div
                key={index}
                className="absolute w-6 h-6 bg-primary rounded-full cursor-pointer pointer-events-auto hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => onHotspotClick?.(hotspot)}
              >
                <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200">
                  {hotspot.title}
                </div>
              </div>
            ))}

            {/* Instructions */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-lg p-4 pointer-events-auto">
              <div className="text-white text-sm space-y-2">
                <p className="font-semibold">Instructions:</p>
                <p>• Cliquez et glissez pour tourner</p>
                <p>• Molette pour zoomer</p>
                <p>• Cliquez sur les points rouges</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VRViewer;
