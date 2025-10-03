import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Download, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
}

const AudioPlayer = ({ audioUrl, title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(272); // 4:32 demo duration
  const [volume, setVolume] = useState(80);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 p-8 rounded-2xl gradient-subtle border border-border shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Guide Audio</h3>
        <Button variant="ghost" size="icon">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Waveform Visualization (Demo) */}
      <div className="rounded-lg overflow-hidden bg-card/50 h-20 flex items-end gap-1 p-2">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-full transition-all"
            style={{
              height: `${20 + Math.random() * 60}%`,
              opacity: i < (currentTime / duration) * 60 ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <Slider
        value={[currentTime]}
        onValueChange={(value) => setCurrentTime(value[0])}
        max={duration}
        step={1}
        className="cursor-pointer"
      />

      {/* Time Display */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        {/* Play/Pause */}
        <Button
          variant="hero"
          size="lg"
          onClick={togglePlayPause}
          className="w-16 h-16 rounded-full"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>

        {/* Volume */}
        <div className="flex-1 flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-10">{volume}%</span>
        </div>
      </div>

      {/* Subtitles indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex gap-1">
          <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">FR</span>
          <span className="px-2 py-1 rounded bg-muted text-muted-foreground">EN</span>
        </div>
        <span>Sous-titres disponibles</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
