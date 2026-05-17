import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma"; 
import { redis } from "@/lib/redis"; // 💡 Pastikan impor redis kamu sudah benar ke sini

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  events: {
    async signOut(message) {
      if ('token' in message && message.token?.sub) {
        const userId = message.token.sub;
        try {
          // Hapus session berdasarkan ID user yang sedang logout
          await redis.del(`session:${userId}`); 
          console.log(`[Redis] Sukses menghapus session untuk user: ${userId}`);
        } catch (error) {
          console.error("[Redis] Gagal menghapus session saat logout:", error);
        }
      }
    }
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          return "/login?error=EmailNotRegistered";
        }

        return true; 
      } catch (error) {
        console.error(error);
        return "/login?error=DatabaseError";
      }
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/product`;
    },

    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    
    async session({ session, token }) {
      if (token) session.user.id = token.sub as string;
      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
});