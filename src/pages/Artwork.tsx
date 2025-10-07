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
import OptimizedImage from "@/components/OptimizedImage";
import { generateArtworkPDF } from "@/utils/pdfGenerator";
// Import des 13 images
import image1 from "@/assets/images/1.jpg";
import image2 from "@/assets/images/2.jpg";
import image3 from "@/assets/images/3.jpg";
import image4 from "@/assets/images/4.jpg";
import image5 from "@/assets/images/5.jpg";
import image6 from "@/assets/images/6.jpg";
import image7 from "@/assets/images/7.jpg";
import image8 from "@/assets/images/8.jpg";
import image9 from "@/assets/images/9.jpg";
import image10 from "@/assets/images/10.jpg";
import image11 from "@/assets/images/11.jpg";
import image12 from "@/assets/images/12.jpg";
import image13 from "@/assets/images/13.jpg";

const artworksData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Masque Cérémoniel Dogon",
    period: "XIXe siècle",
    origin: "Mali",
    duration: "4:32",
    videoDuration: "8:45",
    imageUrl: image1,
    description: "Ce masque cérémoniel exceptionnel témoigne de l'art sophistiqué du peuple Dogon. Utilisé lors des cérémonies du Dama, il représente un lien sacré entre le monde des vivants et celui des ancêtres.",
    details: {
      materials: "Bois, pigments naturels",
      dimensions: "45 x 18 x 12 cm",
      acquisition: "Don, 1952",
    }
  },
  "2": {
    id: "2",
    title: "Statue Royale Ashanti",
    period: "XVIIIe siècle",
    origin: "Ghana",
    duration: "5:18",
    videoDuration: "7:22",
    imageUrl: image2,
    description: "Cette statue royale de l'empire Ashanti incarne l'autorité et la puissance des rois. Symbole de pouvoir divin, elle était utilisée lors des cérémonies royales et des rites d'intronisation.",
    details: {
      materials: "Bois d'ébène, or",
      dimensions: "120 x 35 x 25 cm",
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
    imageUrl: image3,
    description: "Cette poterie appartient à la culture Nok, l'une des plus anciennes civilisations d'Afrique subsaharienne. Elle révèle un niveau de maîtrise technique remarquable pour son époque.",
    details: {
      materials: "Terre cuite",
      dimensions: "32 x 28 x 28 cm",
      acquisition: "Fouilles archéologiques, 1995",
    }
  },
  "4": {
    id: "4",
    title: "Masque Dan",
    period: "XIXe siècle",
    origin: "Côte d'Ivoire",
    duration: "4:15",
    videoDuration: "7:10",
    imageUrl: image4,
    description: "Le masque Dan est un objet rituel central dans la société traditionnelle. Il sert de médiateur entre le monde visible et invisible, utilisé lors des initiations et cérémonies de guérison.",
    details: {
      materials: "Bois de teck, fibres",
      dimensions: "38 x 22 x 15 cm",
      acquisition: "Don, 1965",
    }
  },
  "5": {
    id: "5",
    title: "Sculpture Baoulé",
    period: "XIXe siècle",
    origin: "Côte d'Ivoire",
    duration: "4:50",
    videoDuration: "8:15",
    imageUrl: image5,
    description: "Cette sculpture Baoulé représente un esprit ancestral protecteur. Elle était placée dans les sanctuaires familiaux pour invoquer la protection et la prospérité de la communauté.",
    details: {
      materials: "Bois de santal, perles",
      dimensions: "65 x 20 x 18 cm",
      acquisition: "Achat, 1980",
    }
  },
  "6": {
    id: "6",
    title: "Masque Bwa",
    period: "XXe siècle",
    origin: "Burkina Faso",
    duration: "3:30",
    videoDuration: "6:45",
    imageUrl: image6,
    description: "Le masque Bwa se distingue par ses motifs géométriques complexes et ses couleurs vives. Il est utilisé lors des cérémonies d'initiation et des fêtes de récolte.",
    details: {
      materials: "Bois léger, pigments",
      dimensions: "55 x 35 x 20 cm",
      acquisition: "Don, 1985",
    }
  },
  "7": {
    id: "7",
    title: "Statue Fon",
    period: "XVIIIe siècle",
    origin: "Bénin",
    duration: "5:25",
    videoDuration: "9:20",
    imageUrl: image7,
    description: "Cette statue du royaume de Dahomey témoigne de l'art royal sophistiqué. Elle était placée dans les palais royaux comme symbole de pouvoir et de continuité dynastique.",
    details: {
      materials: "Bronze, corail",
      dimensions: "85 x 30 x 25 cm",
      acquisition: "Achat, 1972",
    }
  },
  "8": {
    id: "8",
    title: "Masque Senoufo",
    period: "XIXe siècle",
    origin: "Côte d'Ivoire",
    duration: "4:05",
    videoDuration: "7:30",
    imageUrl: image8,
    description: "Le masque Senoufo est utilisé dans les rites d'initiation de la société du Poro. Il représente les esprits de la nature et joue un rôle central dans l'éducation des jeunes.",
    details: {
      materials: "Bois de fromager, cauris",
      dimensions: "42 x 28 x 18 cm",
      acquisition: "Don, 1970",
    }
  },
  "9": {
    id: "9",
    title: "Poterie Yoruba",
    period: "XVIIe siècle",
    origin: "Nigeria",
    duration: "3:55",
    videoDuration: "7:00",
    imageUrl: image9,
    description: "Cette poterie Yoruba aux motifs traditionnels était utilisée dans les cérémonies religieuses. Elle témoigne de la maîtrise technique et artistique des potiers Yoruba.",
    details: {
      materials: "Terre cuite émaillée",
      dimensions: "40 x 35 x 30 cm",
      acquisition: "Achat, 1983",
    }
  },
  "10": {
    id: "10",
    title: "Sculpture Kongo",
    period: "XIXe siècle",
    origin: "RDC",
    duration: "4:40",
    videoDuration: "8:30",
    imageUrl: image10,
    description: "Cette sculpture Kongo représente un chef spirituel porteur de pouvoir. Elle était utilisée par les nganga (guérisseurs) pour communiquer avec le monde des esprits.",
    details: {
      materials: "Bois d'ébène, métal",
      dimensions: "75 x 25 x 20 cm",
      acquisition: "Don, 1968",
    }
  },
  "11": {
    id: "11",
    title: "Masque Bambara",
    period: "XIXe siècle",
    origin: "Mali",
    duration: "4:20",
    videoDuration: "7:45",
    imageUrl: image11,
    description: "Le masque Bambara aux motifs abstraits était utilisé par les sociétés secrètes. Il représente les forces cosmiques et joue un rôle dans l'équilibre de la communauté.",
    details: {
      materials: "Bois de caïlcédrat",
      dimensions: "48 x 32 x 22 cm",
      acquisition: "Achat, 1975",
    }
  },
  "12": {
    id: "12",
    title: "Statue Luba",
    period: "XVIIIe siècle",
    origin: "RDC",
    duration: "5:10",
    videoDuration: "9:00",
    imageUrl: image12,
    description: "Cette statue royale Luba est un gardien de la mémoire collective. Elle était utilisée lors des conseils royaux pour évoquer la sagesse des ancêtres.",
    details: {
      materials: "Bois d'ébène, perles",
      dimensions: "90 x 28 x 22 cm",
      acquisition: "Don, 1960",
    }
  },
  "13": {
    id: "13",
    title: "Masque Gelede",
    period: "XIXe siècle",
    origin: "Bénin",
    duration: "4:35",
    videoDuration: "8:00",
    imageUrl: image13,
    description: "Le masque Gelede honore les mères et les ancêtres féminins. Il est utilisé lors des cérémonies qui célèbrent la fertilité et la sagesse des femmes âgées.",
    details: {
      materials: "Bois, tissus colorés",
      dimensions: "50 x 40 x 25 cm",
      acquisition: "Achat, 1987",
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
      <header className="sticky top-0 z-50 border-b border-border bg-background/98 backdrop-blur-xl shadow-soft">
        <div className="container px-6 py-4">
          <div className="flex items-center justify-between stagger-1">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="gap-2 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <h2 className="text-lg font-bold hidden md:block">MCN-221</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleShare}
              className="hover:scale-105 transition-transform"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <div className="space-y-6 stagger-2">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-glow group">
                <OptimizedImage
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="transition-transform duration-700 group-hover:scale-105"
                  priority={true}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="shadow-soft backdrop-blur-sm">
                    <QrCode className="w-3 h-3 mr-1" />
                    QR #{artwork.id}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="gap-2 hover:scale-105 hover:border-primary/50 transition-all duration-300"
                  onClick={() => setArViewerOpen(true)}
                >
                  <Box className="w-4 h-4" />
                  Vue AR
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 hover:scale-105 hover:border-primary/50 transition-all duration-300"
                  onClick={handleDownloadPDF}
                >
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8 stagger-3">
              <div className="space-y-6">
                <div className="flex flex-wrap items-start gap-3">
                  <Badge variant="secondary" className="text-sm px-4 py-1.5">
                    {artwork.period}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5 text-sm px-4 py-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {artwork.origin}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  {artwork.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Details Card */}
              <Card className="border-2 hover:border-primary/20 transition-all duration-300 hover-lift">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Info className="w-5 h-5" />
                    Détails techniques
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-muted-foreground font-medium">Matériaux</span>
                      <span className="font-semibold text-right">{artwork.details.materials}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-muted-foreground font-medium">Dimensions</span>
                      <span className="font-semibold text-right">{artwork.details.dimensions}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-muted-foreground font-medium">Acquisition</span>
                      <span className="font-semibold text-right">{artwork.details.acquisition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Audio Player */}
          <div className="scroll-reveal">
            <AudioPlayer title={artwork.title} />
          </div>

          {/* Video Player */}
          <div className="scroll-reveal">
            <VideoPlayer 
              title={artwork.title}
              poster={artwork.imageUrl}
            />
          </div>

          {/* QR Code Section */}
          <div className="space-y-6 scroll-reveal">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">QR Code de l'œuvre</h2>
              <p className="text-muted-foreground">
                Partagez cet accès direct à l'œuvre
              </p>
            </div>
            <QRCodeDisplay
              value={window.location.href}
              title={artwork.title}
              size={200}
            />
          </div>

          {/* Share Section */}
          <div className="scroll-reveal">
            <Card className="border-2 gradient-subtle overflow-hidden hover-lift">
              <CardContent className="p-10 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold">Partagez votre découverte</h3>
                    <p className="text-lg text-muted-foreground">
                      Invitez vos amis à explorer cette œuvre fascinante
                    </p>
                  </div>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="gap-2 shadow-glow hover:scale-110 transition-all duration-300 text-lg px-8 py-6"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
