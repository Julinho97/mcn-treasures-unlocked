import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Download, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import WaveSurfer from "wavesurfer.js";
import audioSource from "@/assets/mp3/son.m4a";
// import audioSource from "@/assets/mp3/son.mp3";

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
}

const AudioPlayer = ({ audioUrl, title }: AudioPlayerProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Audio local du musée
    const localAudioUrl = audioUrl || audioSource;
    
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "hsl(var(--primary) / 0.3)",
      progressColor: "hsl(var(--primary))",
      cursorColor: "hsl(var(--secondary))",
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 2,
      height: 80,
      barGap: 2,
    });

    wavesurfer.load(localAudioUrl);

    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration());
      setIsReady(true);
      wavesurfer.setVolume(volume / 100);
    });

    wavesurfer.on("audioprocess", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("interaction", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume / 100);
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (wavesurferRef.current) {
      const time = value[0];
      wavesurferRef.current.seekTo(time / duration);
      setCurrentTime(time);
    }
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

      {/* Waveform Visualization */}
      <div ref={waveformRef} className="rounded-lg overflow-hidden" />

      {/* Progress Bar */}
      <Slider
        value={[currentTime]}
        onValueChange={handleSeek}
        max={duration || 100}
        step={0.1}
        className="cursor-pointer"
        disabled={!isReady}
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
          disabled={!isReady}
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
