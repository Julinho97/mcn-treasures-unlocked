import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, Calendar, Grid, List, Youtube } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  embedId: string;
  date: string;
  category: string;
  duration?: string;
  views?: string;
}

interface YouTubePlaylistProps {
  videos: Video[];
  title?: string;
  description?: string;
}

const YouTubePlaylist = ({ 
  videos, 
  title = "Playlist Vidéos MCN", 
  description = "Découvrez nos dernières vidéos" 
}: YouTubePlaylistProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(videos[0] || null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = Array.from(new Set(videos.map(v => v.category)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Youtube className="w-6 h-6 text-red-600" />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          {selectedVideo ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.embedId}?si=helRy4aDWCwYX6bQ`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedVideo.category}</Badge>
                      <span className="text-sm text-muted-foreground">{selectedVideo.date}</span>
                    </div>
                    <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                    <p className="text-muted-foreground">{selectedVideo.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.embedId}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Voir sur YouTube
                    </Button>
                    {selectedVideo.duration && (
                      <Badge variant="outline" className="gap-1">
                        <Play className="w-3 h-3" />
                        {selectedVideo.duration}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="aspect-video flex items-center justify-center">
              <CardContent className="text-center space-y-4">
                <Youtube className="w-16 h-16 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Sélectionnez une vidéo pour commencer</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Video List */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="recent">Récentes</TabsTrigger>
                <TabsTrigger value="featured">Vedettes</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-1 ml-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Video List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {videos.map((video) => (
              <Card 
                key={video.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedVideo?.id === video.id 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary/20'
                }`}
                onClick={() => setSelectedVideo(video)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 bg-black rounded overflow-hidden flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-white ml-0.5" />
                        </div>
                      </div>
                      {video.duration && (
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{video.date}</span>
                        {video.views && (
                          <>
                            <span>•</span>
                            <span>{video.views}</span>
                          </>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlaylist;
