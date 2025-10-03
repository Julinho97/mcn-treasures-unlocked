import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Headphones, Share2, Wifi, Globe, Smartphone } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Scan Instantané",
    description: "Scannez un QR code et accédez à l'œuvre en moins de 3 secondes",
  },
  {
    icon: Headphones,
    title: "Audio Immersif",
    description: "Écoutez des récits captivants avec sous-titres FR/EN",
  },
  {
    icon: Smartphone,
    title: "Vue AR",
    description: "Découvrez les œuvres en réalité augmentée sur votre téléphone",
  },
  {
    icon: Share2,
    title: "Partage Social",
    description: "Partagez vos découvertes avec vos amis en un clic",
  },
  {
    icon: Wifi,
    title: "Mode Hors Ligne",
    description: "Continuez à explorer même sans connexion internet",
  },
  {
    icon: Globe,
    title: "Multilingue",
    description: "Contenu disponible en français et en anglais",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6 gradient-subtle">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Une Expérience Révolutionnaire
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            MCN-XP repousse les limites de l'exploration culturelle numérique
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-soft transition-smooth hover:shadow-glow hover:-translate-y-1"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
