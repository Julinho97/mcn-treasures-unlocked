import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Download, Share2, Smartphone } from "lucide-react";

const CTA = () => {
  const handleDownloadApp = () => {
    // Simuler le téléchargement d'une app
    console.log("Téléchargement de l'app...");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "MCN-221 - Musée des Civilisations Noires",
        text: "Découvrez l'héritage africain avec une expérience digitale immersive",
        url: window.location.href
      });
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="container">
        <Card className="overflow-hidden border-2 gradient-subtle hover-lift">
          <CardContent className="p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Prêt à <span className="gradient-text">Explorer</span> ?
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Commencez votre voyage à travers l'héritage africain dès maintenant. 
                    Scannez, écoutez, découvrez en réalité augmentée.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Scan QR Instantané</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Mobile First</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">PDF Téléchargeable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Partage Social</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-glow hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      const gallerySection = document.getElementById('gallery');
                      if (gallerySection) {
                        gallerySection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    Commencer l'Exploration
                    <div className="ml-2 w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 text-primary px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto rounded-full gradient-hero flex items-center justify-center shadow-glow animate-pulse-glow">
                      <QrCode className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Scanner QR</h3>
                      <p className="text-muted-foreground">
                        Pointez votre caméra vers un QR code pour commencer
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-secondary/20 animate-bounce" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
