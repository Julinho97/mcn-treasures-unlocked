import ArtworkCard from "./ArtworkCard";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Grid3X3, List, Play, Share2, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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

const artworks = [
  {
    id: "1",
    title: "Masque Cérémoniel Dogon",
    period: "XIXe siècle",
    origin: "Mali",
    duration: "4:32",
    imageUrl: image1,
    description: "Masque rituel du peuple Dogon utilisé lors des cérémonies du Dama",
    category: "Masques"
  },
  {
    id: "2",
    title: "Statue Royale Ashanti",
    period: "XVIIIe siècle",
    origin: "Ghana",
    duration: "5:18",
    imageUrl: image2,
    description: "Figure de pouvoir de l'empire Ashanti, symbole d'autorité royale",
    category: "Sculptures"
  },
  {
    id: "3",
    title: "Poterie Ancestrale Nok",
    period: "500 av. J.-C.",
    origin: "Nigeria",
    duration: "3:45",
    imageUrl: image3,
    description: "Céramique de la civilisation Nok, l'une des plus anciennes d'Afrique",
    category: "Céramiques"
  },
  {
    id: "4",
    title: "Masque Dan",
    period: "XIXe siècle",
    origin: "Côte d'Ivoire",
    duration: "4:15",
    imageUrl: image4,
    description: "Masque traditionnel du peuple Dan, utilisé dans les rites d'initiation",
    category: "Masques"
  },
  {
    id: "5",
    title: "Sculpture Baoulé",
    period: "XIXe siècle",
    origin: "Côte d'Ivoire",
    duration: "4:50",
    imageUrl: image5,
    description: "Figure de culte Baoulé représentant les esprits ancestraux",
    category: "Sculptures"
  },
  {
    id: "6",
    title: "Masque Bwa",
    period: "XXe siècle",
    origin: "Burkina Faso",
    duration: "3:30",
    imageUrl: image6,
    description: "Masque de cérémonie Bwa aux motifs géométriques complexes",
    category: "Masques"
  },
  {
    id: "7",
    title: "Statue Fon",
    period: "XVIIIe siècle",
    origin: "Bénin",
    duration: "5:25",
    imageUrl: image7,
    description: "Sculpture du royaume du Dahomey, témoin de l'art royal",
    category: "Sculptures"
  },
  {
    id: "8",
    title: "Masque Senoufo",
    period: "XIXe siècle",
    origin: "Côte d'Ivoire",
    duration: "4:05",
    imageUrl: image8,
    description: "Masque initiatique Senoufo aux symboles sacrés",
    category: "Masques"
  },
  {
    id: "9",
    title: "Poterie Yoruba",
    period: "XVIIe siècle",
    origin: "Nigeria",
    duration: "3:55",
    imageUrl: image9,
    description: "Céramique rituelle Yoruba aux motifs traditionnels",
    category: "Céramiques"
  },
  {
    id: "10",
    title: "Sculpture Kongo",
    period: "XIXe siècle",
    origin: "RDC",
    duration: "4:40",
    imageUrl: image10,
    description: "Figure de pouvoir Kongo, symbole d'autorité spirituelle",
    category: "Sculptures"
  },
  {
    id: "11",
    title: "Masque Bambara",
    period: "XIXe siècle",
    origin: "Mali",
    duration: "4:20",
    imageUrl: image11,
    description: "Masque de société secrète Bambara aux motifs abstraits",
    category: "Masques"
  },
  {
    id: "12",
    title: "Statue Luba",
    period: "XVIIIe siècle",
    origin: "RDC",
    duration: "5:10",
    imageUrl: image12,
    description: "Figure royale du royaume Luba, gardienne de la mémoire",
    category: "Sculptures"
  },
  {
    id: "13",
    title: "Masque Gelede",
    period: "XIXe siècle",
    origin: "Bénin",
    duration: "4:35",
    imageUrl: image13,
    description: "Masque de cérémonie Gelede honorant les mères et les ancêtres",
    category: "Masques"
  },
];

// Composant ArtworkCard optimisé pour la galerie
const GalleryArtworkCard = ({ id, title, period, duration, imageUrl, origin, category }: any) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/artwork/${id}`);
  };

  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover-lift border-2 hover:border-primary/20 transition-all duration-300"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle' dy='.3em'%3EImage%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Floating Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow pulse-glow transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
          </div>
        </div>

        {/* QR Badge */}
        <div className="absolute top-4 right-4 transform translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
          <Badge variant="secondary" className="shadow-soft backdrop-blur-sm">
            <QrCode className="w-3 h-3 mr-1" />
            Scannable
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4 bg-card/80 backdrop-blur-sm">
        <div className="space-y-2">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <p className="text-muted-foreground">{period}</p>
            {origin && (
              <>
                <span className="text-muted-foreground">•</span>
                <p className="text-muted-foreground">{origin}</p>
              </>
            )}
          </div>
          {category && (
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <Play className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-primary/10 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const itemsPerPage = 6;

  // Filtrage par catégorie
  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'all') return artworks;
    return artworks.filter(artwork => artwork.category === selectedCategory);
  }, [selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, endIndex);

  // Catégories uniques
  const categories = ['all', ...Array.from(new Set(artworks.map(a => a.category)))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset à la première page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Collection Complète
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explorez nos 13 œuvres emblématiques avec des guides audio immersifs
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{filteredArtworks.length} œuvres</span>
            <span>•</span>
            <span>{categories.length - 1} catégories</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="capitalize"
              >
                {category === 'all' ? 'Toutes' : category}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className={cn(
          "gap-8 md:gap-10",
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col space-y-6"
        )}>
          {currentArtworks.map((artwork, index) => (
            <div 
              key={artwork.id} 
              className="scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GalleryArtworkCard {...artwork} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Info Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Page {currentPage} sur {totalPages} • {filteredArtworks.length} œuvres au total</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
