import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./src/lib/mongoose";
import { User, Admin } from "./src/models/user";
import bcrypt from "bcrypt";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await connectToDatabase();
                const user = await User.findOne({ email: credentials.email });
                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    return { id: user._id, name: user.name, email: user.email };
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectToDatabase();
            if (
                account.provider === "google" ||
                account.provider === "github"
            ) {
                const isAdmin = await Admin.findOne({ email: user.email });
                if (isAdmin) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: null,
    },
    debug: process.env.NODE_ENV === "development",
};

const authHandler = (req, res) => NextAuth(req, res, authOptions);

export default authHandler;
