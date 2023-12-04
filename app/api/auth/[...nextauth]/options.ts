import axios from "axios";
import { signOut } from "next-auth/react";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
          placeholder: "Email",
        },
        password: {
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            const user = response.data;
            return user;
          } else {
            return null;
          }
        } catch (err: any) {
          console.error(
            "Error during login",
            err.response?.data || err.message
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signOut({ session }) {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`);
        await signOut({ redirect: false });
      } catch (err: any) {
        console.error(
          "Error during sign out",
          err.response?.data || err.message
        );
      }
    },
  },
};
