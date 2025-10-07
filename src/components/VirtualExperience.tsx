import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Compass, 
  Headphones, 
  Camera, 
  Map, 
  Play, 
  Eye,
  Star,
  ArrowRight,
  RotateCcw,
  Maximize2
} from "lucide-react";
import VirtualTour from "./VirtualTour";
import GuidedTour from "./GuidedTour";

// Mock data for guided tour
const guidedTourStops = [
  {
    id: "1",
    title: "Introduction au MCN",
    description: "Découvrez l'histoire et la mission du Musée des Civilisations Noires",
    duration: "3 min",
    audioUrl: "/audio/intro-mcn.mp3",
    imageUrl: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&h=600&fit=crop",
    highlights: ["Fondation du musée", "Architecture moderne", "Mission culturelle"]
  },
  {
    id: "2",
    title: "Hall des Masques",
    description: "Explorez la collection exceptionnelle de masques traditionnels africains",
    duration: "5 min",
    audioUrl: "/audio/masques.mp3",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Masques Dogon", "Symbolisme religieux", "Techniques artisanales"]
  },
  {
    id: "3",
    title: "Galerie Contemporaine",
    description: "Découvrez les créations d'artistes africains contemporains",
    duration: "7 min",
    audioUrl: "/audio/contemporain.mp3",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    highlights: ["Innovation artistique", "Messages sociaux", "Techniques mixtes"]
  },
  {
    id: "4",
    title: "Histoire du Sénégal",
    description: "Plongez dans l'histoire riche du Sénégal",
    duration: "6 min",
    audioUrl: "/audio/histoire-senegal.mp3",
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop",
    highlights: ["Époque précoloniale", "Résistance", "Indépendance"]
  }
];

const VirtualExperience = () => {
  const [activeTab, setActiveTab] = useState("360");

  return (
    <section className="py-0 px-6 z-1000 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-0 mb-16">
          <Badge variant="outline" className="text-sm px-4 py-2">
            <Compass className="w-4 h-4 mr-2" />
            Expérience Virtuelle Complète
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Explorez le <span className="gradient-text">MCN Virtuellement</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez le Musée des Civilisations Noires comme jamais auparavant avec nos expériences virtuelles immersives
          </p>
        </div>

        {/* Experience Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="360" className="gap-2">
              <Camera className="w-4 h-4" />
              Visite 360°
            </TabsTrigger>
           {/*  <TabsTrigger value="guided" className="gap-2">
              <Headphones className="w-4 h-4" />
              Visite Guidée
            </TabsTrigger>
            <TabsTrigger value="interactive" className="gap-2">
              <Eye className="w-4 h-4" />
              Mode Interactif
            </TabsTrigger> */}
          </TabsList>

          {/* 360° Virtual Tour */}
          <TabsContent value="360" className="space-y-0">
            
            <VirtualTour />
          </TabsContent>

          {/* Guided Audio Tour */}
          <TabsContent value="guided" className="space-y-0">
           
            <GuidedTour 
              tourStops={guidedTourStops}
              tourTitle="Visite Complète du MCN"
              totalDuration="21 minutes"
            />
          </TabsContent>

          {/* Interactive Mode */}
          <TabsContent value="interactive" className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Mode Interactif</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explorez à votre rythme avec des hotspots interactifs, des informations détaillées et des liens vers les œuvres.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Interactive Features */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Fonctionnalités Interactives
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Camera className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-semibold">Hotspots d'Œuvres</h5>
                          <p className="text-sm text-muted-foreground">
                            Cliquez sur les points rouges pour découvrir les œuvres en détail
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Map className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <h5 className="font-semibold">Navigation Intelligente</h5>
                          <p className="text-sm text-muted-foreground">
                            Suivez le parcours recommandé ou explorez librement
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Eye className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <h5 className="font-semibold">Informations Contextuelles</h5>
                          <p className="text-sm text-muted-foreground">
                            Obtenez des informations détaillées sur chaque élément
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-4">Contrôles de Navigation</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Reset Vue
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Maximize2 className="w-4 h-4" />
                        Plein Écran
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <ArrowRight className="w-4 h-4" />
                        Salle Suivante
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Play className="w-4 h-4" />
                        Mode Auto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Start */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-4">Démarrage Rapide</h4>
                    <div className="space-y-4">
                      <Button className="w-full gap-2" size="lg">
                        <Camera className="w-5 h-5" />
                        Commencer la Visite 360°
                      </Button>
                      <Button variant="outline" className="w-full gap-2" size="lg">
                        <Headphones className="w-5 h-5" />
                        Démarrer la Visite Guidée
                      </Button>
                      <Button variant="outline" className="w-full gap-2" size="lg">
                        <Map className="w-5 h-5" />
                        Voir le Plan du Musée
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-4">Informations Pratiques</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durée recommandée</span>
                        <span className="font-medium">30-45 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Niveau</span>
                        <span className="font-medium">Tous publics</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Langues</span>
                        <span className="font-medium">Français, Anglais</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accessibilité</span>
                        <span className="font-medium">Audio disponible</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VirtualExperience;
