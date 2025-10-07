import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, Download } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  poster?: string;
}

const VideoPlayer = ({ videoUrl, title, poster }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Demo video URL (Sintel - Open source Blender movie)
  const demoVideoUrl = videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      setVolume(newVolume);
      videoRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="overflow-hidden border-2">
      <div className="space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Explication détaillée</h3>
          <Button variant="ghost" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black group">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            poster={poster}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
            playsInline
          >
            <source src={demoVideoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          {/* Play Overlay */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity group-hover:bg-black/40"
              onClick={togglePlayPause}
            >
              <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow">
                <Play className="w-10 h-10 text-primary-foreground ml-1" />
              </div>
            </div>
          )}

          {/* Video clicked overlay */}
          {isPlaying && (
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={togglePlayPause}
            />
          )}
        </div>

        {/* Progress Bar */}
        <Slider
          value={[currentTime]}
          onValueChange={handleSeek}
          max={duration || 100}
          step={0.1}
          className="cursor-pointer"
        />

        {/* Time Display */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>

          {/* Volume */}
          <div className="flex-1 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-10">
              {isMuted ? 0 : volume}%
            </span>
          </div>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Info */}
        <p className="text-sm text-muted-foreground text-center">
          Vidéo explicative complète avec contexte historique et culturel
        </p>
      </div>
    </Card>
  );
};

export default VideoPlayer;
