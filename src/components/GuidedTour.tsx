import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Headphones,
  Map,
  Clock,
  Star,
  RotateCcw
} from "lucide-react";

interface TourStop {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl?: string;
  imageUrl: string;
  highlights: string[];
}

interface GuidedTourProps {
  tourStops: TourStop[];
  tourTitle: string;
  totalDuration: string;
}

const GuidedTour = ({ tourStops, tourTitle, totalDuration }: GuidedTourProps) => {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTourStop = tourStops[currentStop];

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentStop < tourStops.length - 1) {
      setCurrentStop(currentStop + 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentStop > 0) {
      setCurrentStop(currentStop - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleStopSelect = (stopIndex: number) => {
    setCurrentStop(stopIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStop(0);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-sm px-4 py-2">
            <Headphones className="w-4 h-4 mr-2" />
            Visite Guidée Audio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Visite <span className="gradient-text">Guidée du MCN</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les secrets du Musée des Civilisations Noires avec notre guide audio interactif
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tour Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Tour Image */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={currentTourStop.imageUrl}
                    alt={currentTourStop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Tour Info Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="backdrop-blur-sm">
                      <Map className="w-3 h-3 mr-1" />
                      {tourTitle}
                    </Badge>
                    <Badge variant="secondary" className="backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentTourStop.duration}
                    </Badge>
                  </div>

                  {/* Stop Counter */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-white text-sm font-medium">
                      {currentStop + 1} / {tourStops.length}
                    </span>
                  </div>
                </div>

                {/* Tour Controls */}
                <div className="p-6 space-y-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progression de la visite</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentStop === 0}
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="lg"
                      onClick={handlePlay}
                      className="w-16 h-16 rounded-full"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentStop === tourStops.length - 1}
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {isMuted ? 'Audio désactivé' : 'Audio activé'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Stop Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{currentTourStop.title}</h3>
                    <p className="text-muted-foreground">{currentTourStop.description}</p>
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Points d'intérêt
                    </h4>
                    <ul className="space-y-1">
                      {currentTourStop.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tour Stops List */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Parcours de la visite</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recommencer
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {tourStops.map((stop, index) => (
                    <Card
                      key={stop.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        currentStop === index 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/20'
                      }`}
                      onClick={() => handleStopSelect(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="relative w-16 h-12 bg-black rounded overflow-hidden flex-shrink-0">
                            <img
                              src={stop.imageUrl}
                              alt={stop.title}
                              className="w-full h-full object-cover"
                            />
                            {currentStop === index && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <div className="w-4 h-4 bg-primary rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm line-clamp-2">
                              {stop.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{stop.duration}</span>
                              {currentStop === index && (
                                <>
                                  <span>•</span>
                                  <Badge variant="secondary" className="text-xs">
                                    Actuel
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tour Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Durée totale</span>
                    <span className="font-medium">{totalDuration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nombre d'étapes</span>
                    <span className="font-medium">{tourStops.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progression</span>
                    <span className="font-medium">{Math.round(((currentStop + 1) / tourStops.length) * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidedTour;
