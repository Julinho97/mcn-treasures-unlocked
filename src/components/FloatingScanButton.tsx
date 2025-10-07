import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, X } from "lucide-react";
import QRScanner from "./QRScanner";
import { cn } from "@/lib/utils";

const FloatingScanButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleScanner = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Bouton cliqué !"); // Debug
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    console.log("Mouse enter"); // Debug
  };

  const handleMouseLeave = () => {
    console.log("Mouse leave"); // Debug
  };

  return (
    <>
      {/* Bouton Flottant */}
      <div 
        className="fixed bottom-6 right-6 z-[9999]"
        style={{ zIndex: 9999 }}
      >
        <div className="relative">
          <Button
            onClick={toggleScanner}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "w-16 h-16 rounded-full shadow-2xl transition-all duration-300",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "hover:scale-110 active:scale-95",
              "border-4 border-background",
              "cursor-pointer select-none",
              "relative z-10",
              isOpen && "rotate-45 bg-destructive hover:bg-destructive/90"
            )}
            size="icon"
            style={{ 
              pointerEvents: 'auto',
              cursor: 'pointer',
              zIndex: 10000
            }}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <QrCode className="w-7 h-7" />
            )}
          </Button>

          {/* Ripple Effect - Behind button */}
          <div className={cn(
            "absolute inset-0 rounded-full border-2 border-primary/30 animate-ping",
            "pointer-events-none",
            isOpen && "hidden"
          )} />

          {/* Tooltip */}
          {!isOpen && (
            <div 
              className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              onMouseEnter={() => console.log("Tooltip hover")}
            >
              <div className="bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                Scanner QR Code
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-l-foreground border-t-2 border-b-2 border-t-transparent border-b-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner 
        open={isOpen} 
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default FloatingScanButton;
