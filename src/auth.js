import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./lib/mongoDB";
import User from "./models/user";

const adminEmail = process.env.ADMIN_EMAIL;

export const authOptions = {
    // adapter: MongoDBAdapter(connectDB),

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            profile: async (profile) => {
                await connectDB();
                console.log(profile);
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
            async authorize(credentials) {
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
    // pages: {
    //     signIn: "/login",
    // },
    secret: process.env.AUTH_SECRET,
};

// export const authOptions = {
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             credentials: {
//                 email: {
//                     label: "Email",
//                     type: "email",
//                     placeholder: "Enter your email",
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password",
//                     placeholder: "Enter your password",
//                 },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw Error(`Email and password are required.`);
//                 }
//                 try {
//                     const { email, password } = credentials;
//                     await connect(); // connecting to db
//                     const foundUser = await User.findOne({
//                         email,
//                     });

//                     if (foundUser) {
//                         const isPasswordValid = await bcrypt.compare(
//                             password,
//                             user.password
//                         );

//                         if (isPasswordValid) {
//                             return foundUser;
//                         } else {
//                             throw new Error(`Wrong Password`);
//                         }
//                     } else {
//                         throw new Error(`User account could not found.`);
//                     }
//                 } catch (error) {
//                     throw new Error(`${error} error encounterd`);
//                 }
//             },
//         }),
//     ],

//     callbacks: {
//         async session({ session, token }) {
//             return session;
//         },
//         async jwt({ token, user }) {
//             return token;
//         },
//     },

//     pages: {
//         signIn: "/login",
//     },

//     session: {
//         strategy: "jwt",
//     },

//     secret: process.env.AUTH_SECRET,
// };
