import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  X, 
  ArrowRight, 
  Camera, 
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HotspotData {
  id: string;
  title: string;
  description: string;
  type: 'artwork' | 'information' | 'navigation' | 'audio';
  position: { x: number; y: number };
  image?: string;
  audioUrl?: string;
  relatedArtwork?: string;
  duration?: string;
}

interface InteractiveHotspotProps {
  hotspot: HotspotData;
  isActive: boolean;
  onClick: (hotspot: HotspotData) => void;
  onClose: () => void;
}

const InteractiveHotspot = ({ hotspot, isActive, onClick, onClose }: InteractiveHotspotProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getHotspotIcon = () => {
    switch (hotspot.type) {
      case 'artwork':
        return <Camera className="w-4 h-4" />;
      case 'information':
        return <Info className="w-4 h-4" />;
      case 'navigation':
        return <ArrowRight className="w-4 h-4" />;
      case 'audio':
        return <Clock className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getHotspotColor = () => {
    switch (hotspot.type) {
      case 'artwork':
        return 'bg-primary hover:bg-primary/90';
      case 'information':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'navigation':
        return 'bg-green-500 hover:bg-green-600';
      case 'audio':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <>
      {/* Hotspot Button */}
      <div
        className={cn(
          "absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-white shadow-lg",
          "hover:scale-110 active:scale-95",
          getHotspotColor(),
          isActive && "ring-4 ring-white/50 scale-110"
        )}
        style={{
          left: `${hotspot.position.x}%`,
          top: `${hotspot.position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={() => onClick(hotspot)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {getHotspotIcon()}
        
        {/* Pulse Animation */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-white/30 animate-ping",
          isActive && "animate-pulse"
        )} />
      </div>

      {/* Tooltip */}
      {isHovered && !isActive && (
        <div
          className="absolute bg-black/80 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10 pointer-events-none"
          style={{
            left: `${hotspot.position.x}%`,
            top: `${hotspot.position.y}%`,
            transform: 'translate(-50%, calc(-100% - 10px))'
          }}
        >
          {hotspot.title}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/80" />
        </div>
      )}

      {/* Expanded Card */}
      {isActive && (
        <div
          className="absolute z-20 max-w-sm"
          style={{
            left: `${hotspot.position.x}%`,
            top: `${hotspot.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Card className="shadow-2xl border-2 border-primary/20">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getHotspotIcon()}
                    {hotspot.type}
                  </Badge>
                  {hotspot.duration && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {hotspot.duration}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Image */}
              {hotspot.image && (
                <div className="w-full h-32 bg-black rounded-lg overflow-hidden mb-3">
                  <img
                    src={hotspot.image}
                    alt={hotspot.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">{hotspot.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {hotspot.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  {hotspot.type === 'artwork' && hotspot.relatedArtwork && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs flex-1"
                      onClick={() => {
                        // Navigate to artwork
                        window.open(`/artwork/${hotspot.relatedArtwork}`, '_blank');
                      }}
                    >
                      <Camera className="w-3 h-3 mr-1" />
                      Voir l'œuvre
                    </Button>
                  )}
                  
                  {hotspot.type === 'audio' && hotspot.audioUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs flex-1"
                      onClick={() => {
                        // Play audio
                        const audio = new Audio(hotspot.audioUrl);
                        audio.play();
                      }}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Écouter
                    </Button>
                  )}

                  {hotspot.type === 'navigation' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs flex-1"
                      onClick={() => {
                        // Navigate to next room
                        console.log('Navigate to next room');
                      }}
                    >
                      <ArrowRight className="w-3 h-3 mr-1" />
                      Continuer
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={onClose}
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default InteractiveHotspot;
