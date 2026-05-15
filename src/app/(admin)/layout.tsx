import Sidebar from "@/components/layout/sidebar/sidebar";
import Topbar from "@/components/layout/topbar/Topbar";
import Footer from "@/components/layout/footer/Footer";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    // Menggunakan flex-row agar Sidebar dan Konten Utama berdampingan dari ujung atas
    <div id="wrapper" className="flex min-h-screen w-full bg-gray-50 overflow-x-hidden">
      
      {/* 1. SIDEBAR: Full Height dari atas sampai bawah */}
      <aside className="shrink-0 z-40 bg-blue-700 border-r border-blue-800">
        <Sidebar />
      </aside>

      {/* 2. RIGHT SECTION: Kontainer untuk Topbar, Main Content, dan Footer */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOPBAR: Sekarang lebarnya hanya sejauh sisa ruang setelah Sidebar */}
        <header className="w-full z-30 sticky top-0">
          <Topbar />
        </header>

        {/* AREA KONTEN UTAMA: Mengambil sisa ruang vertikal agar Footer terdorong ke bawah */}
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>

        {/* FOOTER: Sekarang lebarnya juga mengikuti area konten (tidak di bawah sidebar) */}
        <Footer />
      </div>
      </div>
  );
}