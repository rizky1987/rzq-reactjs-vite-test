"use server";

import { signOut } from "@/auth"; 
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";

export async function handleServerLogout() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      try {
        await redis.del(`session:${token}`);
        console.log("[Redis] Sukses menghapus session custom token manual.");
      } catch (redisError) {
        console.error("[Redis] Gagal menghapus token manual di Redis:", redisError);
      }

      cookieStore.delete("auth_token");
    }

    await signOut({ 
      redirectTo: "/login", 
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Gagal melakukan proses pembersihan logout gabungan:", error);
  }
}