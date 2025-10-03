import jsPDF from 'jspdf';

interface ArtworkData {
  id: string;
  title: string;
  period: string;
  origin: string;
  description: string;
  technicalDetails: string;
  audioDuration: string;
}

export const generateArtworkPDF = (artwork: ArtworkData) => {
  const pdf = new jsPDF();
  
  // Colors from design system
  const primaryColor = '#C97542';
  const textColor = '#1A1614';
  
  // Header
  pdf.setFillColor(primaryColor);
  pdf.rect(0, 0, 210, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text('MCN - Musée des Civilisations Noires', 105, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.text('Fiche Œuvre', 105, 32, { align: 'center' });
  
  // Content
  pdf.setTextColor(textColor);
  let yPos = 55;
  
  // Title
  pdf.setFontSize(20);
  pdf.text(artwork.title, 20, yPos);
  yPos += 12;
  
  // Period and Origin
  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`${artwork.period} • ${artwork.origin}`, 20, yPos);
  yPos += 15;
  
  // Description
  pdf.setTextColor(textColor);
  pdf.setFontSize(11);
  pdf.text('Description', 20, yPos);
  yPos += 8;
  
  pdf.setFontSize(10);
  const descriptionLines = pdf.splitTextToSize(artwork.description, 170);
  pdf.text(descriptionLines, 20, yPos);
  yPos += descriptionLines.length * 6 + 10;
  
  // Technical Details
  pdf.setFontSize(11);
  pdf.text('Détails techniques', 20, yPos);
  yPos += 8;
  
  pdf.setFontSize(10);
  const technicalLines = pdf.splitTextToSize(artwork.technicalDetails, 170);
  pdf.text(technicalLines, 20, yPos);
  yPos += technicalLines.length * 6 + 15;
  
  // Audio Info
  pdf.setFillColor(primaryColor);
  pdf.setTextColor(255, 255, 255);
  pdf.roundedRect(20, yPos, 170, 20, 3, 3, 'F');
  pdf.setFontSize(11);
  pdf.text(`🎧 Guide audio disponible - Durée: ${artwork.audioDuration}`, 25, yPos + 13);
  
  // Footer
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(9);
  pdf.text('Généré par MCN-XP • mcn.sn', 105, 285, { align: 'center' });
  
  // QR Code placeholder
  pdf.setDrawColor(primaryColor);
  pdf.setLineWidth(2);
  pdf.rect(165, 240, 30, 30);
  pdf.setFontSize(8);
  pdf.text('QR', 180, 257, { align: 'center' });
  
  // Save
  pdf.save(`MCN-${artwork.id}-${artwork.title.replace(/\s+/g, '-')}.pdf`);
};
