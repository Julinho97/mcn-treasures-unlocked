import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Navigation, 
  MapPin, 
  Info, 
  RotateCcw, 
  Maximize2, 
  Eye,
  ArrowLeft,
  ArrowRight,
  Home,
  Camera,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VirtualRoom {
  id: string;
  name: string;
  description: string;
  category: string;
  image360: string;
  thumbnail: string;
  exhibits?: string[];
  highlights?: string[];
  duration: string;
}

const virtualRooms: VirtualRoom[] = [
  {
    id: "1",
    name: "Hall d'Entrée Principal",
    description: "Bienvenue dans le hall d'entrée du Musée des Civilisations Noires, un espace majestueux qui vous accueille dans l'univers de l'héritage africain.",
    category: "Accueil",
    image360: "https://th.bing.com/th/id/OIP.KR9vb996vDWNbLydOLslewHaEM?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3?w=800&h=600&fit=crop",
    thumbnail: "https://th.bing.com/th/id/OIP.KR9vb996vDWNbLydOLslewHaEM?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3?w=400&h=300&fit=crop",
    exhibits: ["Statue d'accueil", "Murale d'introduction", "Plan du musée"],
    highlights: ["Architecture moderne", "Éclairage naturel", "Acoustique exceptionnelle"],
    duration: "5-10 min"
  },
  {
    id: "2", 
    name: "Salle des Masques Traditionnels",
    description: "Découvrez une collection exceptionnelle de masques traditionnels africains, témoins de la richesse culturelle du continent.",
    category: "Art Traditionnel",
    image360: "https://tse2.mm.bing.net/th/id/OIP.MCNFf8jp222wi-26p6BIZQHaEr?cb=12&pid=ImgDet&w=177&h=111&c=7&dpr=1.5&o=7&rm=3?w=800&h=600&fit=crop",
    thumbnail: "https://tse2.mm.bing.net/th/id/OIP.MCNFf8jp222wi-26p6BIZQHaEr?cb=12&pid=ImgDet&w=177&h=111&c=7&dpr=1.5&o=7&rm=3?w=400&h=300&fit=crop",
    exhibits: ["Masques Dogon", "Masques Baoulé", "Masques Senoufo"],
    highlights: ["Symbolisme religieux", "Techniques artisanales", "Rituels traditionnels"],
    duration: "15-20 min"
  },
  {
    id: "3",
    name: "Galerie de l'Art Contemporain",
    description: "Explorez les créations d'artistes africains contemporains qui redéfinissent l'art moderne avec leur vision unique.",
    category: "Art Contemporain",
    image360: "https://c8.alamy.com/comp/E0T65H/the-main-exhibition-hall-in-the-national-history-museum-in-hanoi-E0T65H.jpg?w=800&h=600&fit=crop",
    thumbnail: "https://c8.alamy.com/comp/E0T65H/the-main-exhibition-hall-in-the-national-history-museum-in-hanoi-E0T65H.jpg?w=400&h=300&fit=crop",
    exhibits: ["Installations interactives", "Peintures modernes", "Sculptures contemporaines"],
    highlights: ["Innovation artistique", "Messages sociaux", "Techniques mixtes"],
    duration: "20-25 min"
  },
  {
    id: "4",
    name: "Salle de l'Histoire du Sénégal",
    description: "Plongez dans l'histoire riche et complexe du Sénégal, de l'époque précoloniale à l'indépendance.",
    category: "Histoire",
    image360: "https://www.settimananews.it/wp-content/uploads/2019/05/exafrica2.jpg?w=800&h=600&fit=crop",
    thumbnail: "https://www.settimananews.it/wp-content/uploads/2019/05/exafrica2.jpg?w=400&h=300&fit=crop",
    exhibits: ["Objets historiques", "Documents d'archives", "Cartes anciennes"],
    highlights: ["Résistance coloniale", "Figures historiques", "Événements marquants"],
    duration: "25-30 min"
  }
];

const VirtualTour = () => {
  const [currentRoom, setCurrentRoom] = useState(virtualRooms[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRoomChange = (room: VirtualRoom) => {
    setCurrentRoom(room);
    setIsPlaying(false);
  };

  const handlePreviousRoom = () => {
    const currentIndex = virtualRooms.findIndex(room => room.id === currentRoom.id);
    const previousIndex = currentIndex === 0 ? virtualRooms.length - 1 : currentIndex - 1;
    setCurrentRoom(virtualRooms[previousIndex]);
    setIsPlaying(false);
  };

  const handleNextRoom = () => {
    const currentIndex = virtualRooms.findIndex(room => room.id === currentRoom.id);
    const nextIndex = currentIndex === virtualRooms.length - 1 ? 0 : currentIndex + 1;
    setCurrentRoom(virtualRooms[nextIndex]);
    setIsPlaying(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Header */}
        {/* <div className="text-center space-y-4 mb-16 scroll-reveal">
          <Badge variant="outline" className="text-sm px-4 py-2">
            <Compass className="w-4 h-4 mr-2" />
            Visite Virtuelle 360°
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Explorez le <span className="gradient-text">MCN en 360°</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les salles du Musée des Civilisations Noires comme si vous y étiez
          </p>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 360° Viewer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Viewer Container */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className={cn(
                  "relative aspect-video bg-black overflow-hidden",
                  isFullscreen && "fixed inset-0 z-50 aspect-auto"
                )}>
                  {/* 360° Image/Video Placeholder */}
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <img
                      src={currentRoom.image360}
                      alt={currentRoom.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* 360° Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Navigation Controls */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handlePreviousRoom}
                        className="backdrop-blur-sm"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleNextRoom}
                        className="backdrop-blur-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Fullscreen Control */}
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="backdrop-blur-sm"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl cursor-pointer hover:bg-primary transition-colors"
                             onClick={() => setIsPlaying(!isPlaying)}>
                          <Camera className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <div className="text-white text-center space-y-2">
                          <h3 className="text-xl font-bold">{currentRoom.name}</h3>
                          <p className="text-sm opacity-90">Cliquez pour explorer en 360°</p>
                        </div>
                      </div>
                    </div>

                    {/* Room Info Badge */}
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {currentRoom.category}
                      </Badge>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        <Eye className="w-3 h-3 mr-1" />
                        {currentRoom.duration}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{currentRoom.name}</h3>
                    <p className="text-muted-foreground">{currentRoom.description}</p>
                  </div>

                  {/* Room Highlights */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Expositions
                      </h4>
                      <ul className="space-y-1">
                        {currentRoom.exhibits?.map((exhibit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {exhibit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Points d'intérêt
                      </h4>
                      <ul className="space-y-1">
                        {currentRoom.highlights?.map((highlight, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Room Navigation */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Navigation
                </h3>
                <div className="space-y-3">
                  {virtualRooms.map((room) => (
                    <Card
                      key={room.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:border-primary/20",
                        currentRoom.id === room.id && "border-primary bg-primary/5"
                      )}
                      onClick={() => handleRoomChange(room)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="relative w-16 h-12 bg-black rounded overflow-hidden flex-shrink-0">
                            <img
                              src={room.thumbnail}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Camera className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm line-clamp-2">
                              {room.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {room.category}
                              </Badge>
                              <span>•</span>
                              <span>{room.duration}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => handleRoomChange(virtualRooms[0])}
                  >
                    <Home className="w-4 h-4" />
                    Retour à l'entrée
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {isPlaying ? 'Arrêter' : 'Démarrer'} la visite
                  </Button>
                  {/* <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={toggleFullscreen}
                  >
                    <Maximize2 className="w-4 h-4" />
                    Mode plein écran
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
