import Link from "next/link";
import { cookies } from "next/headers";
import { filterMenusByRole } from "./sidebar.actions";
import { redis } from "@/lib/redis"; // 💡 Sesuaikan dengan path file instansiasi ioredis Anda

interface SessionData {
  role: "SUPERADMIN" | "ADMIN" | "USER";
  email: string;
}

// 💡 Mengubah fungsi menjadi 'async' karena ada proses I/O pembacaan Cookie & Redis
export default async function Sidebar() {
  // 1. Ambil Token/Session ID yang tersimpan di Cookie Browser
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value; // Sesuaikan "token" dengan nama cookie login Anda

  // Fallback default jika user tidak punya sesi atau belum login
  let currentRole: "SUPERADMIN" | "ADMIN" | "USER" | "ANONIM" = "ANONIM";

  // 2. Jika token ditemukan, tarik data JSON dari memori Redis
  if (token) {
    try {
     const cachedSession = await redis.get(`session:${token}`);

      if (cachedSession) {
        // Karena yang disimpan di atas adalah JSON string, di sini aman untuk di-parse
        const sessionData = JSON.parse(cachedSession);
        currentRole = sessionData.role; // Hasilnya pasti "ADMIN", "SUPERADMIN", atau "USER"
      }
    } catch (error) {
      console.error("Gagal mengambil data sesi dari Redis:", error);
    }
  }

  // 💡 DIAGNOSTIK 3: Lihat role akhir sebelum filter dijalankan
  console.log("=== FINAL ROLE FOR FILTER ===", currentRole);

  const menus = filterMenusByRole(currentRole);

  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white">
      <nav className="space-y-2 p-4">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="flex items-center rounded-lg px-4 py-3 hover:bg-blue-800 transition-colors"
          >
            <i className={`${menu.icon} w-5`} />
            <span className="ml-3">{menu.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}