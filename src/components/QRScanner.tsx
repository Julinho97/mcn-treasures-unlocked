import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Camera, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QRScanner = ({ open, onOpenChange }: QRScannerProps) => {
  const [manualId, setManualId] = useState("");
  const navigate = useNavigate();

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId) {
      const id = manualId.trim();
      if (["1", "2", "3"].includes(id)) {
        toast.success("Œuvre trouvée !");
        onOpenChange(false);
        navigate(`/artwork/${id}`);
      } else {
        toast.error("ID d'œuvre invalide. Essayez 1, 2 ou 3.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Scanner une œuvre
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* QR Code Scanner Placeholder */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-primary/30">
            <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow">
              <Camera className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold">Scanner avec la caméra</p>
              <p className="text-sm text-muted-foreground">
                Pointez votre caméra vers le QR code
              </p>
            </div>
            <Button variant="outline" disabled>
              <Camera className="w-4 h-4 mr-2" />
              Activer la caméra
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              (Fonctionnalité à venir)
            </p>
          </div>

          {/* Manual ID Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex-1 border-t" />
              <span>ou entrez l'ID</span>
              <div className="flex-1 border-t" />
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ex: 1, 2, ou 3"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="hero">
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Version démo : Essayez les IDs 1, 2 ou 3
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
