import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type ApiError = {
  status?: number;
  error?: string;
};

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          type: "text",
          placeholder: "Name",
        },
        email: {
          type: "text",
          placeholder: "Email",
        },
        password: {
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, reg) {
        const callbackUrl = reg?.body?.callbackUrl;
        const apiTail = callbackUrl.includes("register") ? "signup" : "login";

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/${apiTail}`,
            {
              name: credentials?.name,
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("response", response.data.user);

          if (response.status === 200) {
            return response.data.user;
          }

          return null;
        } catch (err: ApiError | any) {
          console.error(err.response?.data);

          throw new Error(
            JSON.stringify({
              status: err.response?.status || 500,
              error: err.response?.data.message || "Authentication failed",
            })
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("JWT callback", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log("Session callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token?.id,
          name: token?.name,
          email: token?.email,
        },
      };
    },
  },
};
