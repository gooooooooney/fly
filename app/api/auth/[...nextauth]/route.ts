import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
<<<<<<< HEAD
import EmailProvider from "next-auth/providers/email";
=======
>>>>>>> 9ae5774a2b57fc69e3fe62199a6d2de3cfd05a72

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
<<<<<<< HEAD
            httpOptions: {
                timeout: 50000,
            },
=======
>>>>>>> 9ae5774a2b57fc69e3fe62199a6d2de3cfd05a72
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
<<<<<<< HEAD
            httpOptions: {
                timeout: 50000,
            },
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            //maxAge: 24 * 60 * 60, // 设置邮箱链接失效时间，默认24小时
=======
>>>>>>> 9ae5774a2b57fc69e3fe62199a6d2de3cfd05a72
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
