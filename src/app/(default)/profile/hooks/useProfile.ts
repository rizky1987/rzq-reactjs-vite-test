import { useState, useRef } from 'react';
import { generateCvPdf } from '@/utils/pdfGenerator';
import { logger } from '@/lib/logger'; 

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false); 
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      logger.warn("Gagal download PDF: Elemen printRef tidak ditemukan di DOM", {
        location: "useProfile -> handleDownloadPdf"
      });
      return;
    }
    
    setIsLoading(true);
    setIsPrinting(true); 
    
    setTimeout(async () => {
      try {
        await generateCvPdf({
          element: element,
          fileName: 'CV-Rizky-Mochammad-Soleh.pdf'
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        logger.error('Gagal membuat dokumen PDF untuk CV', error, {
          location: "useProfile -> handleDownloadPdf -> setTimeout Block",
          payload: { fileName: 'CV-Rizky-Mochammad-Soleh.pdf' }
        });
      } finally {
        setIsLoading(false);
        setIsPrinting(false);
      }
    }, 100);
  };

  return {
    isLoading,
    isPrinting,
    printRef,
    handleDownloadPdf,
    socialLinks: [
      { icon: '/icons/linkedin.png', label: 'LinkedIn', link: 'rizky-mochammad-soleh' },
      { icon: '/icons/github.png', label: 'GitHub', link: 'rizky1987' },
      { icon: '/icons/gmail.png', label: 'Email', link: 'rizky.msoleh@gmail.com' },
      { icon: '/icons/wa.png', label: 'WhatsApp', link: '+62 857 2251 7987' }
    ],
    skills: [
      'Go-lang', 
      'C# .Net', 
      'Native PHP', 
      'React.js + Vite', 
      'TypeScript', 
      'TailwindCSS', 
      'Next.js', 
      'AWS / Azure', 
      'Kubernetes', 
      'MongoDB', 
      'MsSQL'
    ]
  };
};