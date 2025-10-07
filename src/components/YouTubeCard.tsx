import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Calendar, Eye } from "lucide-react";
import { useState } from "react";

interface YouTubeCardProps {
  title: string;
  description: string;
  embedId: string;
  date: string;
  category: string;
  compact?: boolean;
}

const YouTubeCard = ({ title, description, embedId, date, category, compact = false }: YouTubeCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleOpenYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${embedId}`, '_blank');
  };

  if (compact) {
    return (
      <Card className="group overflow-hidden hover-lift border-2 hover:border-primary/20 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="relative w-32 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={`https://img.youtube.com/vi/${embedId}/hqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                onClick={handlePlay}
              >
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold line-clamp-2 text-sm group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{date}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={handleOpenYouTube}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Voir
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover-lift border-2 hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-0">
        {/* Video Container */}
        <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${embedId}?si=helRy4aDWCwYX6bQ`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="backdrop-blur-sm">
              <Play className="w-3 h-3 mr-1" />
              {category}
            </Badge>
          </div>

          {/* YouTube Logo */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2 hover:bg-primary/10"
              onClick={handleOpenYouTube}
            >
              <ExternalLink className="w-4 h-4" />
              Voir sur YouTube
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeCard;
