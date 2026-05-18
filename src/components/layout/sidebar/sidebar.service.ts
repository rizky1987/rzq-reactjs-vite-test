// 📄 src/components/layout/sidebar/sidebar.service.ts
import { cookies } from "next/headers";
import { redis } from "@/lib/redis"; 
import { UserRole } from "./sidebar.types";
import { ALL_MENUS } from "./sidebar.menus";

export function filterMenusByRole(role: UserRole) {
  return ALL_MENUS.filter((menu) => {
    if (!menu.roles) return true;
    return menu.roles.some((menuRole) => menuRole === role);
  });
}

export async function getCurrentUserRole(): Promise<UserRole> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return "ANONIM";

  try {
    const cachedSession = await redis.get(`session:${token}`);
    if (cachedSession) {
      const sessionData = JSON.parse(cachedSession);
      return sessionData.role as UserRole;
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data sesi dari Redis:", error);
  }

  return "ANONIM";
}