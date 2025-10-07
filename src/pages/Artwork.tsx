import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Share2, 
  QrCode, 
  Box, 
  Download,
  MapPin,
  Info
} from "lucide-react";
import { toast } from "sonner";
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import ARViewer from "@/components/ARViewer";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { generateArtworkPDF } from "@/utils/pdfGenerator";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const artworksData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Masque Cérémoniel Dogon",
    period: "XIXe siècle",
    origin: "Mali",
    duration: "4:32",
    videoDuration: "8:45",
    imageUrl: artwork1,
    description: "Ce masque cérémoniel exceptionnel témoigne de l'art sophistiqué du peuple Dogon. Utilisé lors des cérémonies du Dama, il représente un lien sacré entre le monde des vivants et celui des ancêtres.",
    details: {
      materials: "Bois, pigments naturels",
      dimensions: "45 x 18 x 12 cm",
      acquisition: "Don, 1952",
    }
  },
  "2": {
    id: "2",
    title: "Textile Traditionnel Kente",
    period: "XVIIIe siècle",
    origin: "Ghana",
    duration: "5:18",
    videoDuration: "7:22",
    imageUrl: artwork2,
    description: "Le Kente est un textile royal tissé à la main, symbole de richesse et de prestige dans la culture Ashanti. Chaque motif et couleur porte une signification spécifique transmise de génération en génération.",
    details: {
      materials: "Coton, soie",
      dimensions: "180 x 120 cm",
      acquisition: "Achat, 1978",
    }
  },
  "3": {
    id: "3",
    title: "Poterie Ancestrale Nok",
    period: "500 av. J.-C.",
    origin: "Nigeria",
    duration: "3:45",
    videoDuration: "6:30",
    imageUrl: artwork3,
    description: "Cette poterie appartient à la culture Nok, l'une des plus anciennes civilisations d'Afrique subsaharienne. Elle révèle un niveau de maîtrise technique remarquable pour son époque.",
    details: {
      materials: "Terre cuite",
      dimensions: "32 x 28 x 28 cm",
      acquisition: "Fouilles archéologiques, 1995",
    }
  },
};

const Artwork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [arViewerOpen, setArViewerOpen] = useState(false);
  const artwork = artworksData[id || "1"];

  const handleShare = async () => {
    const shareData = {
      title: `${artwork.title} - MCN`,
      text: `Découvrez "${artwork.title}" au Musée des Civilisations Noires`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Partagé avec succès !");
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error("Erreur lors du partage");
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  const handleDownloadPDF = () => {
    const technicalDetails = `Matériaux: ${artwork.details.materials}\nDimensions: ${artwork.details.dimensions}\nAcquisition: ${artwork.details.acquisition}`;
    generateArtworkPDF({
      id: artwork.id,
      title: artwork.title,
      period: artwork.period,
      origin: artwork.origin,
      description: artwork.description,
      technicalDetails,
      audioDuration: artwork.duration,
    });
    toast.success("PDF téléchargé !");
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Œuvre non trouvée</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <h2 className="text-lg font-bold hidden md:block">MCN-XP</h2>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-glow">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="shadow-soft">
                    <QrCode className="w-3 h-3 mr-1" />
                    QR #{artwork.id}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setArViewerOpen(true)}
                >
                  <Box className="w-4 h-4" />
                  Vue AR
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleDownloadPDF}
                >
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary">{artwork.period}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    {artwork.origin}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {artwork.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Details Card */}
              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Info className="w-4 h-4" />
                    Détails techniques
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Matériaux</span>
                      <span className="font-medium">{artwork.details.materials}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">{artwork.details.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Acquisition</span>
                      <span className="font-medium">{artwork.details.acquisition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Audio Player */}
          <AudioPlayer title={artwork.title} />

          {/* Video Player */}
          <VideoPlayer 
            title={artwork.title}
            poster={artwork.imageUrl}
          />

          {/* QR Code Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">QR Code de l'œuvre</h2>
            <QRCodeDisplay
              value={window.location.href}
              title={artwork.title}
              size={200}
            />
          </div>

          {/* Share Section */}
          <Card className="border-2 gradient-subtle">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold">Partagez votre découverte</h3>
                  <p className="text-muted-foreground">
                    Invitez vos amis à explorer cette œuvre fascinante
                  </p>
                </div>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                  Partager
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <ARViewer 
        open={arViewerOpen} 
        onOpenChange={setArViewerOpen}
        artworkTitle={artwork.title}
      />
    </div>
  );
};

export default Artwork;
