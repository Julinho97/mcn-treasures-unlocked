import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">MCN-221</h3>
            <p className="text-sm text-muted-foreground">
              Musée des Civilisations Noires
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Conçu avec</span>
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span>pour la culture africaine</span>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2025 MCN-221. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
