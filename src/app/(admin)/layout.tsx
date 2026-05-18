import Sidebar from "@/components/layout/sidebar/Sidebar";
import Topbar from "@/components/layout/topbar/Topbar";
import Footer from "@/components/layout/footer/Footer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
  <div id="wrapper" className="flex min-h-screen w-full bg-gray-50 overflow-x-hidden">
      
      <aside className="shrink-0 z-40 bg-blue-700 border-r border-blue-800">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="w-full z-30 sticky top-0">
          <Topbar />
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
  </div>

  );
}