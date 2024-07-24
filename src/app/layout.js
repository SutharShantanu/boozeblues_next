import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer"
import Providers from "../redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} mt-[82px]`}>
                <ChakraProvider>
                    <Providers>
                        <Navbar />
                        <div className="border-2 border-red-500">
                            {children}
                            <Footer />
                        </div>
                    </Providers>
                </ChakraProvider>
            </body>
        </html>
    );
}
