import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface QRCodeDisplayProps {
  value: string;
  title: string;
  size?: number;
}

const QRCodeDisplay = ({ value, title, size = 200 }: QRCodeDisplayProps) => {
  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `QR-${title.replace(/\s+/g, '-')}.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success("QR code téléchargé !");
        }
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShareQR = async () => {
    try {
      await navigator.share({
        title: `QR Code - ${title}`,
        text: `Scannez ce QR code pour découvrir "${title}"`,
        url: value,
      });
      toast.success("QR code partagé !");
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        navigator.clipboard.writeText(value);
        toast.success("Lien copié !");
      }
    }
  };

  return (
    <Card className="border-2">
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-xl shadow-soft">
            <QRCodeSVG
              id="qr-code-svg"
              value={value}
              size={size}
              level="H"
              includeMargin={true}
              fgColor="#1A1614"
              bgColor="#FFFFFF"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Scannez pour accéder à cette œuvre
          </p>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleDownloadQR}
            >
              <Download className="w-4 h-4" />
              Télécharger QR
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleShareQR}
            >
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
