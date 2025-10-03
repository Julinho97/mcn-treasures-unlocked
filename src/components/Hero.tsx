import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, Headphones, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-museum.jpg";
import QRScanner from "./QRScanner";

const Hero = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Musée des Civilisations Noires</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Découvrez l'Histoire
            <span className="block gradient-hero bg-clip-text text-transparent">
              en 3 Secondes
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Scannez, écoutez et explorez les trésors du MCN comme jamais auparavant
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              variant="hero" 
              size="lg"
              className="gap-3"
              onClick={() => setScannerOpen(true)}
            >
              <QrCode className="w-5 h-5" />
              Scanner une œuvre
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-3"
              onClick={() => {
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Headphones className="w-5 h-5" />
              Voir la galerie
            </Button>
          </div>

          <QRScanner open={scannerOpen} onOpenChange={setScannerOpen} />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Œuvres</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">3s</div>
              <div className="text-sm text-muted-foreground">Scan rapide</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">FR/EN</div>
              <div className="text-sm text-muted-foreground">Multilingue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
