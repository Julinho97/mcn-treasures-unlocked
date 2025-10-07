import { useState } from "react";
import { QrCode, X } from "lucide-react";
import QRScanner from "./QRScanner";

const SimpleFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log("Simple bouton cliqué !");
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bouton Simple */}
      <button
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <QrCode size={24} />
        )}
      </button>

      {/* QR Scanner Modal */}
      <QRScanner 
        open={isOpen} 
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default SimpleFloatingButton;
