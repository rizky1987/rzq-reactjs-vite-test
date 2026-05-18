import { cookies } from "next/headers";
import { redis } from "@/lib/redis"; 
import { UserRole } from "./sidebar.types";
import { ALL_MENUS } from "./sidebar.menus";
import { logger } from "@/lib/logger";

export function filterMenusByRole(role: UserRole) {
  try {
    return ALL_MENUS.filter((menu) => {
      if (!menu.roles) return true;
      return menu.roles.some((menuRole) => menuRole === role);
    });
  } catch (error) {
    logger.error("Gagal menyaring menu berdasarkan role", error, { location: "sidebar.service -> filterMenusByRole" });
    return []; // Return array kosong agar UI tidak melempar error putih ke user
  }
}

export async function getCurrentUserRole(): Promise<UserRole> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return "ANONIM";

    try {
      const cachedSession = await redis.get(`session:${token}`);
      if (!cachedSession) {
        logger.warn("Sesi token tidak ditemukan di Redis atau sudah kedaluwarsa", { 
          location: "sidebar.service -> getCurrentUserRole",
          payload: { tokenSnippet: token.substring(0, 10) + "..." }
        });
        return "ANONIM";
      }

      const sessionData = JSON.parse(cachedSession);
      
      if (sessionData && typeof sessionData.role === "string") {
        return sessionData.role as UserRole;
      }
      
    } catch (redisError) {
      logger.error("Koneksi Redis bermasalah saat mengambil session token", redisError, { 
        location: "sidebar.service -> getCurrentUserRole (Redis Block)" 
      });
    }

  } catch (cookieError) {
    logger.error("Gagal membaca cookie store pada server", cookieError, { 
      location: "sidebar.service -> getCurrentUserRole (Cookie Block)" 
    });
  }

  return "ANONIM";
}