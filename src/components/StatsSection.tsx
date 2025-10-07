import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Headphones, Eye, Users, Globe, Star } from "lucide-react";

const stats = [
  {
    icon: QrCode,
    value: "13",
    label: "Œuvres Scannables",
    description: "QR Codes intégrés",
    color: "text-blue-600"
  },
  {
    icon: Headphones,
    value: "100%",
    label: "Audio Immersif",
    description: "Guides multilingues",
    color: "text-green-600"
  },
  {
    icon: Eye,
    value: "3D",
    label: "Réalité Augmentée",
    description: "Visualisation WebAR",
    color: "text-purple-600"
  },
  {
    icon: Users,
    value: "∞",
    label: "Visiteurs",
    description: "Accessible à tous",
    color: "text-orange-600"
  },
  {
    icon: Globe,
    value: "24/7",
    label: "Disponibilité",
    description: "Expérience continue",
    color: "text-cyan-600"
  },
  {
    icon: Star,
    value: "5★",
    label: "Expérience",
    description: "Interface moderne",
    color: "text-yellow-600"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16 scroll-reveal">
          <Badge variant="outline" className="text-sm px-4 py-2">
            Chiffres Clés
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Une Expérience <span className="gradient-text">Révolutionnaire</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les statistiques qui font de MCN-221 une expérience unique au monde
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="group hover-lift border-2 hover:border-primary/20 transition-all duration-300 text-center"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
