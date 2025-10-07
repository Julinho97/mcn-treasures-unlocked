import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Calendar, Youtube, Eye } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  embedId: string;
  date: string;
  category: string;
  thumbnail?: string;
}

interface YouTubeGalleryProps {
  videos?: Video[];
  title?: string;
  maxVideos?: number;
}

const defaultVideos: Video[] = [
  {
    id: "1",
    title: "Musée des Civilisations Noires - Découvrez l'héritage africain à Dakar",
    description: "Une visite immersive du musée et de ses collections exceptionnelles",
    embedId: "z_yjIVUZ5tQ",
    date: "2024",
    category: "Visite Virtuelle"
  },
  {
    id: "2", 
    title: "Collection MCN - Trésors de l'art africain",
    description: "Explorez les œuvres emblématiques et leur histoire culturelle",
    embedId: "8QaXil5TLTE",
    date: "2024",
    category: "Collection"
  }
];

const YouTubeGallery = ({ 
  videos = defaultVideos, 
  title = "Vidéos MCN",
  maxVideos = 4 
}: YouTubeGalleryProps) => {
  const displayVideos = videos.slice(0, maxVideos);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Youtube className="w-6 h-6 text-red-600" />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground">
          Découvrez nos dernières vidéos et actualités
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayVideos.map((video) => (
          <Card 
            key={video.id}
            className="group overflow-hidden hover-lift border-2 hover:border-primary/20 transition-all duration-300"
          >
            <CardContent className="p-0">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="backdrop-blur-sm text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    {video.category}
                  </Badge>
                </div>

                {/* YouTube Logo */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center">
                    <Youtube className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-semibold line-clamp-2 text-sm group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{video.date}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 px-2 text-xs hover:bg-primary/10"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.embedId}`, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Voir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {videos.length > maxVideos && (
        <div className="text-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              // Scroll to YouTube section or open full playlist
              const youtubeSection = document.getElementById('youtube-section');
              if (youtubeSection) {
                youtubeSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Youtube className="w-4 h-4" />
            Voir toutes les vidéos ({videos.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default YouTubeGallery;
