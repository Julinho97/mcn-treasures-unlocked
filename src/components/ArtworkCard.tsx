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
      className="group overflow-hidden cursor-pointer transition-smooth hover:shadow-glow"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Floating Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center shadow-glow">
            <Play className="w-8 h-8 text-primary-foreground fill-current" />
          </div>
        </div>

        {/* QR Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="shadow-soft">
            <QrCode className="w-3 h-3 mr-1" />
            Scannable
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-smooth">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Play className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtworkCard;
