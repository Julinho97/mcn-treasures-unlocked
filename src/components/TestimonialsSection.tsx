import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Étudiante en Histoire",
    location: "Université Cheikh Anta Diop",
    content: "Cette expérience a révolutionné ma façon de découvrir l'art africain. Les guides audio sont incroyables !",
    rating: 5,
    avatar: "A"
  },
  {
    name: "Jean-Pierre Martin",
    role: "Touriste",
    location: "France",
    content: "En tant que visiteur étranger, j'ai pu comprendre et apprécier chaque œuvre grâce aux explications détaillées.",
    rating: 5,
    avatar: "J"
  },
  {
    name: "Prof. Sarr",
    role: "Enseignant",
    location: "Lycée Blaise Diagne",
    content: "Parfait pour mes cours ! Les élèves adorent scanner les QR codes et découvrir l'histoire de chaque pièce.",
    rating: 5,
    avatar: "S"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16 scroll-reveal">
          <Badge variant="outline" className="text-sm px-4 py-2">
            Témoignages
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Ce Que Disent Nos <span className="gradient-text">Visiteurs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'impact de MCN-221 sur l'expérience muséale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover-lift border-2 hover:border-primary/20 transition-all duration-300"
            >
              <CardContent className="p-8 space-y-6">
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
