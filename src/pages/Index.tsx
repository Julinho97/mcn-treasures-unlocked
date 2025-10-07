import VideoHero from "@/components/VideoHero";
import Features from "@/components/Features";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import YouTubeSection from "@/components/YouTubeSection";
import YouTubeGallery from "@/components/YouTubeGallery";
import VirtualExperience from "@/components/VirtualExperience";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ImagePreloader from "@/components/ImagePreloader";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  const handleExploreClick = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <ImagePreloader priority={true} />
      
      {/* Hero Section */}
      <VideoHero onExploreClick={handleExploreClick} />
      
      {/* Features Section */}
      <Features />
      <SectionDivider variant="gradient" className="my-16" />
      
      {/* Stats Section */}
      <StatsSection />
      <SectionDivider variant="dots" />

      {/* Gallery Section */}
      <Gallery />
      <SectionDivider variant="gradient" className="my-16" />
      
      
        {/* Virtual Experience Section */}
        <VirtualExperience />
        <SectionDivider variant="gradient" className="my-16" />
        
        {/* YouTube Section */}
        <YouTubeSection />
        <SectionDivider variant="wave" className="my-16" />
      
      {/* CTA Section */}
      <CTA />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      <SectionDivider variant="gradient" className="my-16" />
      
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
