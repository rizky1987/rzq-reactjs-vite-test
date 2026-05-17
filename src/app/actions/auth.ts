"use server";

import { signOut } from "@/auth"; // Impor signOut NextAuth server
import { cookies } from "next/headers";// Menggunakan next-headers bawaan Next.js untuk manipulasi cookie server
import { redis } from "@/lib/redis";

export async function handleServerLogout() {
  try {
    const cookieStore = await cookies();
    
    // ==========================================
    // 1. MEMBERSIHKAN JALUR LOGIN MANUAL (FORM)
    // ==========================================
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      try {
        // Hapus session data yang tersimpan di Redis berdasarkan tokennya
        await redis.del(`session:${token}`);
        console.log("[Redis] Sukses menghapus session custom token manual.");
      } catch (redisError) {
        console.error("[Redis] Gagal menghapus token manual di Redis:", redisError);
      }

      // Hancurkan cookie 'auth_token' di browser dengan mengeset maxAge ke 0 atau gunakan .delete()
      cookieStore.delete("auth_token");
    }

    // ==========================================
    // 2. MEMBERSIHKAN JALUR LOGIN GOOGLE (NextAuth)
    // ==========================================
    // Panggil signOut server. Ini akan menghapus cookie bawaan NextAuth 
    // DAN otomatis memicu 'events.signOut' di src/auth.ts untuk hapus Redis jalur Google
    await signOut({ 
      redirectTo: "/login", // Tendang balik ke halaman login setelah semuanya bersih
    });

  } catch (error) {
    // Biarkan error internal redirect Next.js lolos agar halaman bisa berpindah
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Gagal melakukan proses pembersihan logout gabungan:", error);
  }
}