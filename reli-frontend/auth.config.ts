import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    newUser : '/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } } : { auth: any, request: any }) {
      return !!auth?.user;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;