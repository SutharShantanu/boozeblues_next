import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./src/lib/mongoose";
import User from "./src/models/user";
import bcrypt from "bcryptjs";

const options = {
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
                try {
                    if (
                        user &&
                        (await bcrypt.compare(
                            credentials.password,
                            user.password
                        ))
                    ) {
                        return {
                            id: user._id,
                            name: user.fullName,
                            email: user.email,
                            role: user.role,
                        };
                    } else {
                        console.log(error);
                        return "no data found";
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await connectToDatabase();
            const adminEmail = process.env.ADMIN_EMAIL;
            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                const newUser = new User({
                    fullName: user.name,
                    email: user.email,
                    password: "", // Password should be set when signing up via credentials
                    phoneNumber: "", // This should be filled based on your form input
                    role: user.email === adminEmail ? "admin" : "user",
                });

                await newUser.save();
                return true;
            }

            if (
                account.provider === "google" ||
                account.provider === "github"
            ) {
                return existingUser.role === "admin";
            }

            return true;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: "/",
        // error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        newUser: null,
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = (req, res) => NextAuth(req, res, options);

export default handler;
