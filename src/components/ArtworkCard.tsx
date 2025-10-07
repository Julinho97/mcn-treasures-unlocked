import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Share2, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ArtworkCardProps {
  id: string;
  title: string;
  period: string;
  duration: string;
  imageUrl: string;
  onClick?: () => void;
}

const ArtworkCard = ({ id, title, period, duration, imageUrl, onClick }: ArtworkCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/artwork/${id}`);
    }
  };
  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover-lift border-2 hover:border-primary/20"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Floating Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow pulse-glow transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
          </div>
        </div>

        {/* QR Badge */}
        <div className="absolute top-4 right-4 transform translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
          <Badge variant="secondary" className="shadow-soft backdrop-blur-sm">
            <QrCode className="w-3 h-3 mr-1" />
            Scannable
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4 bg-card/80 backdrop-blur-sm">
        <div className="space-y-2">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <Play className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-primary/10 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtworkCard;
