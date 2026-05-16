import Link from "next/link";
import { cookies } from "next/headers";
import { filterMenusByRole } from "./sidebar.actions";
import { redis } from "@/lib/redis";
import SidebarWrapper from "./SidebarWrapper"; // 💡 Import wrapper baru

export default async function Sidebar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let currentRole: "SUPERADMIN" | "ADMIN" | "USER" | "ANONIM" = "ANONIM";

  if (token) {
    try {
      const cachedSession = await redis.get(`session:${token}`);
      if (cachedSession) {
        const sessionData = JSON.parse(cachedSession);
        currentRole = sessionData.role;
      }
    } catch (error) {
      console.error("Gagal mengambil data sesi dari Redis:", error);
    }
  }

  console.log("=== FINAL ROLE FOR FILTER ===", currentRole);
  const menus = filterMenusByRole(currentRole);

  return (
    <SidebarWrapper>
      {/* Bagian Atas / Logo Area */}
      <div className="p-4 border-b border-blue-600/50 flex items-center h-20">
        <span className="font-bold text-xl tracking-wider block group-[.data-closed]:hidden truncate">
          <Link
            key='/profile'
            href='/profile'
            className="flex items-center rounded-lg px-6 py-2 hover:bg-blue-800 transition-colors group"
            title='Profile' // Tetap memunculkan tooltip kecil saat sidebar mengecil
          >
            {/* Icon tetep terlihat di tengah saat sidebar mengecil */}
            <i className="fas fa-user w-5 text-center text-lg" />
            
            {/* Teks menu otomatis hilang dengan efek opacity jika dibungkus CSS flex group */}
            <span className="ml-4 transition-opacity duration-200 block [.data-closed_&]:opacity-0 [.data-closed_&]:w-0 truncate">
              Curriculum Vitae
            </span>
          </Link>
        </span>
      </div>

      {/* Navigasi Menu */}
      <nav className="space-y-2 p-4">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="flex items-center rounded-lg px-4 py-3 hover:bg-blue-800 transition-colors group"
            title={menu.title} // Tetap memunculkan tooltip kecil saat sidebar mengecil
          >
            {/* Icon tetep terlihat di tengah saat sidebar mengecil */}
            <i className={`${menu.icon} w-5 text-center text-lg`} />
            
            {/* Teks menu otomatis hilang dengan efek opacity jika dibungkus CSS flex group */}
            <span className="ml-4 transition-opacity duration-200 block [.data-closed_&]:opacity-0 [.data-closed_&]:w-0 truncate">
              {menu.title}
            </span>
          </Link>
        ))}
      </nav>
    </SidebarWrapper>
  );
}