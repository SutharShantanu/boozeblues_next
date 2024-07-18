import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Suspense } from "react";
import loader from "../app/components/loading/loader";
import Navbar from "./components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

const ClientLayout = ({ children }) => {
    return (
        <Suspense fallback={<loader />}>
            <html lang="en">
                <ChakraProvider>
                    {/* <Provider store={store}> */}
                    <div className="borde-2 border-red-500">
                        <Navbar />
                        <body className={`${inter.className} mt-[82px]`}>
                            {/* <div className="min-h-[91vh] border-4 border-yellow-800"> */}
                            {children}
                            {/* </div> */}
                        </body>
                    </div>
                    {/* </Provider> */}
                </ChakraProvider>
            </html>
        </Suspense>
    );
};

export default ClientLayout;
