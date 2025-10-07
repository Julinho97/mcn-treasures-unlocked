import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import videoSource from "@/assets/videos/le-musée-des-civilisations-noires--découvrez-lhéritage-africain-à-dakar.mp4";

interface VideoHeroProps {
  onExploreClick?: () => void;
}

const VideoHero = ({ onExploreClick }: VideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          autoPlay
          poster="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        >
          <source src={videoSource} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        
        {/* Animated Overlay Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, hsl(var(--secondary) / 0.3) 0%, transparent 50%)`,
          }} />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            <p className="text-white/80">Chargement de l'expérience...</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container px-6">
          <div className="max-w-4xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white">Expérience Immersive</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                <span className="block">Musée des</span>
                <span className="block gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Civilisations Noires
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Découvrez l'héritage africain à travers une expérience digitale immersive. 
                Scannez, écoutez, explorez en réalité augmentée.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                onClick={onExploreClick}
              >
                <span>Explorer la Collection</span>
                <div className="ml-2 w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? 'Pause' : 'Regarder'}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">13</div>
                <div className="text-sm text-white/70">Œuvres</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3D</div>
                <div className="text-sm text-white/70">Réalité Augmentée</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">QR</div>
                <div className="text-sm text-white/70">Scan Instantané</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div 
        className={cn(
          "absolute bottom-6 right-6 flex gap-2 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 hover:opacity-100"
        )}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-black/50 border-white/30 hover:bg-black/70 text-white backdrop-blur-sm"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="bg-black/50 border-white/30 hover:bg-black/70 text-white backdrop-blur-sm"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="bg-black/50 border-white/30 hover:bg-black/70 text-white backdrop-blur-sm"
          onClick={toggleFullscreen}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Click to Play Overlay */}
      {!isPlaying && !isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 transition-opacity duration-300 hover:bg-black/10"
          onClick={handleVideoClick}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoHero;
