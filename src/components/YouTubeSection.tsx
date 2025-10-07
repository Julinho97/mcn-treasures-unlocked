import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  embedId: string;
  date: string;
  category: string;
  thumbnail?: string;
}

const videos: YouTubeVideo[] = [
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

const YouTubeSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 scroll-reveal">
          <Badge variant="outline" className="text-sm px-4 py-2">
            <Play className="w-4 h-4 mr-2" />
            Actualités Vidéo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Découvrez le <span className="gradient-text">MCN en Vidéo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plongez dans l'univers du Musée des Civilisations Noires à travers nos vidéos exclusives
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((video, index) => (
            <Card 
              key={video.id}
              className="group overflow-hidden hover-lift border-2 hover:border-primary/20 transition-all duration-300"
            >
              <CardContent className="p-0">
                {/* Video Container */}
                <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}?si=helRy4aDWCwYX6bQ`}
                    title={video.title}
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
                      {video.category}
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
                      {video.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {video.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{video.date}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="gap-2 hover:bg-primary/10"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${video.embedId}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Voir sur YouTube
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 scroll-reveal">
          <Card className="border-2 gradient-subtle overflow-hidden hover-lift max-w-2xl mx-auto">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Restez Informé des <span className="gradient-text">Actualités</span>
                </h3>
                <p className="text-muted-foreground">
                  Abonnez-vous à notre chaîne YouTube pour ne rien rater des dernières expositions et événements
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open('https://www.youtube.com/@museedescivilisationsnoires', '_blank')}
                >
                  <Play className="w-5 h-5" />
                  S'abonner sur YouTube
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() => {
                    const gallerySection = document.getElementById('gallery');
                    if (gallerySection) {
                      gallerySection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Explorer la Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
