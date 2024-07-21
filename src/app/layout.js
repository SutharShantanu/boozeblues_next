// "use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/common/Navbar";
import { Providers } from "../redux/Provider";
import { Suspense } from "react";
import CustomLoader from "../app/components/loading/loader";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Boozeblues Next App",
    description: "Developed by Shantanu",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} mt-[155px]`}>
                <Suspense fallback={<CustomLoader />}>
                    <Providers>
                        <ChakraProvider>
                            <Navbar />
                            <div className="min-h-[83vh] flex flex-col items-center justify-center border border-red-400">
                                {children}
                            </div>
                        </ChakraProvider>
                    </Providers>
                </Suspense>
            </body>
        </html>
    );
}

