// src/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // OIDC secara default meminta scope: openid, profile, email
    }),
  ],
  callbacks: {
    // Di sini kamu bisa intercept token sebelum dikirim ke frontend
    async jwt({ token, account, profile }) {
      if (account) {
        // Jika butuh menyimpan access token dari Google untuk nembak API Google eksternal:
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Menyediakan data token ke client-side session secara aman
      if (token) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login', // Mengarahkan custom login page ke route kita
  },
})