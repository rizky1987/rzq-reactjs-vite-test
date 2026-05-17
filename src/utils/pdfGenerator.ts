// 📄 src/utils/pdfGenerator.ts
import html2canvasPro from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

interface PdfGeneratorOptions {
  element: HTMLDivElement;
  fileName?: string;
}

export const generateCvPdf = async ({ element, fileName = 'CV-Document.pdf' }: PdfGeneratorOptions): Promise<void> => {
  // 1. Potret element HTML menggunakan versi Pro (Aman 100% dari eror warna oklch/lab)
  const canvas = await html2canvasPro(element, {
    scale: 2, // Menjaga teks CV sangat tajam saat di-zoom di PDF
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: 1200, // Mengunci lebar window virtual agar layout desktop (menyamping) tertangkap sempurna
  });

  const dataUrl = canvas.toDataURL('image/png');

  // 2. Inisialisasi dokumen A4 jsPDF (Satuan milimeter)
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // 3. Kalkulasi tinggi gambar agar pas dengan lebar kertas A4
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // 4. Loop Pembagian Halaman Otomatis (Sidebar ikut terpotong rapi secara visual)
  let isFirstPage = true;
  
  while (heightLeft > 0) {
    if (!isFirstPage) {
      pdf.addPage();
    }
    
    pdf.addImage(
      dataUrl, 
      'PNG', 
      0, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    heightLeft -= pdfHeight;
    position -= pdfHeight; // Menggeser potongan gambar ke halaman berikutnya
    isFirstPage = false;
  }

  // 5. Simpan berkas PDF asli
  pdf.save(fileName);
};