import ArtworkCard from "./ArtworkCard";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const artworks = [
  {
    id: "1",
    title: "Masque Cérémoniel Dogon",
    period: "XIXe siècle",
    duration: "4:32",
    imageUrl: artwork1,
  },
  {
    id: "2",
    title: "Textile Traditionnel Kente",
    period: "XVIIIe siècle",
    duration: "5:18",
    imageUrl: artwork2,
  },
  {
    id: "3",
    title: "Poterie Ancestrale Nok",
    period: "500 av. J.-C.",
    duration: "3:45",
    imageUrl: artwork3,
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 px-6">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Collection en Vedette
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez nos œuvres les plus emblématiques avec des guides audio immersifs
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} {...artwork} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
