import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "../../../../lib/mongoDB";
import User from "../../../../models/user";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
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
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw Error(`Email and password are required.`);
                }
                try {
                    const { email, password } = credentials;
                    await connect(); // connecting to db
                    const foundUser = await User.findOne({
                        email,
                    });

                    if (foundUser) {
                        const isPasswordValid = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (isPasswordValid) {
                            return foundUser;
                        } else {
                            throw new Error(`Wrong Password`);
                        }
                    } else {
                        throw new Error(`User account could not found.`);
                    }
                } catch (error) {
                    throw new Error(`${error} error encounterd`);
                }
            },
        }),
    ],

    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user }) {
            return token;
        },
    },

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.AUTH_SECRET,
};
