import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "./models/user";
import connectDB from "./lib/mongoDB";

const adminEmail = process.env.ADMIN_EMAIL;

export const authOptions = {
    // adapter: MongoDBAdapter(connectDB),

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            profile: async (profile) => {
                await connectDB();
                const user = await User.findOne({ email: profile.email });

                if (profile.email == adminEmail) {
                    return {
                        id: user?._id ?? profile.id,
                        name: profile.name,
                        email: profile.email,
                        role: "admin",
                    };
                }

                if (user && user.role === "admin") {
                    return { id: user._id, email: user.email, role: user.role };
                }

                throw new Error("You do not have admin access");
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile: async (profile) => {
                await connectDB();
                const user = await User.findOne({ email: profile.email });

                if (profile.email == adminEmail) {
                    return {
                        id: user?._id ?? profile.id,
                        name: profile.name,
                        email: profile.email,
                        role: "admin",
                    };
                }

                if (user && user.role === "admin") {
                    return { id: user._id, email: user.email, role: user.role };
                }

                throw new Error("You do not have admin access");
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return Error("email and password required!");
                }
                await connectDB();
                const { email, password } = credentials;
                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error(
                        "User not exist, use correct email address!"
                    );
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    User.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                if (email == adminEmail) {
                    return { id: user._id, email: user.email, role: "admin" };
                }

                return { id: user._id, email: user.email, role: user.role };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
};
