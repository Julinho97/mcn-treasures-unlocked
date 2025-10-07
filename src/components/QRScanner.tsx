import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Camera, Hash, ScanLine, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QRScanner = ({ open, onOpenChange }: QRScannerProps) => {
  const [manualId, setManualId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [recentScans, setRecentScans] = useState<string[]>([]);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simulation de scan QR
  const simulateQRScan = () => {
    setScanStatus('scanning');
    setIsScanning(true);
    
    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 13) + 1;
      const id = randomId.toString();
      
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"].includes(id)) {
        setScanStatus('success');
        setRecentScans(prev => [id, ...prev.slice(0, 2)]);
        toast.success(`Œuvre ${id} détectée !`);
        
        setTimeout(() => {
          onOpenChange(false);
          navigate(`/artwork/${id}`);
        }, 1500);
      } else {
        setScanStatus('error');
        toast.error("QR Code non reconnu");
        setTimeout(() => setScanStatus('idle'), 2000);
      }
      
      setIsScanning(false);
    }, 2000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId) {
      const id = manualId.trim();
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"].includes(id)) {
        setRecentScans(prev => [id, ...prev.slice(0, 2)]);
        toast.success("Œuvre trouvée !");
        onOpenChange(false);
        navigate(`/artwork/${id}`);
      } else {
        toast.error("ID d'œuvre invalide. Essayez 1 à 13.");
      }
    }
  };

  // Nettoyage des streams
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleQuickScan = (id: string) => {
    toast.success(`Œuvre ${id} sélectionnée !`);
    onOpenChange(false);
    navigate(`/artwork/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Scanner une œuvre
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* QR Code Scanner */}
          <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-primary/30 overflow-hidden">
            {/* Scanner Animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
            )}
            
            {/* Scan Lines */}
            {scanStatus === 'scanning' && (
              <>
                <div className="absolute inset-0">
                  <div className="w-full h-0.5 bg-primary animate-pulse" style={{ animation: 'scanLine 2s linear infinite' }} />
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary animate-pulse" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary animate-pulse" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary animate-pulse" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary animate-pulse" />
              </>
            )}

            {/* Status Icons */}
            {scanStatus === 'success' && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
              </div>
            )}
            
            {scanStatus === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                <AlertCircle className="w-16 h-16 text-red-500 animate-bounce" />
              </div>
            )}

            <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow">
              <Camera className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="font-semibold">
                {scanStatus === 'scanning' ? 'Scan en cours...' : 
                 scanStatus === 'success' ? 'QR Code détecté !' :
                 scanStatus === 'error' ? 'QR Code non reconnu' :
                 'Scanner avec la caméra'}
              </p>
              <p className="text-sm text-muted-foreground">
                {scanStatus === 'scanning' ? 'Analyse du QR code...' :
                 scanStatus === 'success' ? 'Redirection en cours...' :
                 scanStatus === 'error' ? 'Veuillez réessayer' :
                 'Pointez votre caméra vers le QR code'}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={simulateQRScan}
              disabled={isScanning}
              className="gap-2"
            >
              <ScanLine className="w-4 h-4" />
              {isScanning ? 'Scan en cours...' : 'Simuler Scan QR'}
            </Button>
            
            <Badge variant="secondary" className="text-xs">
              Version démo
            </Badge>
          </div>

          {/* Recent Scans */}
          {recentScans.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Scans récents</h4>
              <div className="flex gap-2 flex-wrap">
                {recentScans.map((id, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickScan(id)}
                    className="gap-2"
                  >
                    <QrCode className="w-3 h-3" />
                    Œuvre #{id}
                  </Button>
                ))}
              </div>
            </div>
          )}

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
                    placeholder="Ex: 1, 2, 3... 13"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="hero" disabled={isScanning}>
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Version démo : Essayez les IDs 1 à 13
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
