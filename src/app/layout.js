"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Providers from "../redux/Provider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
    let pathname = usePathname();
    pathname = `/${pathname.split("/", 2)[1]}`;

    const [hideNavbar, setHideNavbar] = useState(true);
    const [hideFooter, setHideFooter] = useState(true);

    useEffect(() => {
        const navHidingPages = ["/login", "/signup", "/admin"];
        const shouldHide = navHidingPages.includes(pathname);
        setHideNavbar(shouldHide);
        setHideFooter(shouldHide);
    }, [pathname]);

    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <SessionProvider session={session}>
                    <ChakraProvider>
                        <Providers>
                            <div className="flex flex-col min-h-screen justify-between">
                                {!hideNavbar && <Navbar />}
                                <div className="flex">
                                    <div
                                        className={`w-full ${
                                            !hideFooter ? "mt-[100px]" : "mt-0"
                                        } `}>
                                        {children}
                                    </div>
                                </div>
                                {!hideFooter && <Footer />}
                            </div>
                        </Providers>
                    </ChakraProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
