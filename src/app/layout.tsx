import { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: 'Menu App',
    description: 'App for choosing of food on menu'
}

export default function RootLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Providers>
                    <Header/>
                    <main>
                        {children}
                    </main>
                    <Footer/>
                </Providers>
            </body>
        </html>
    )
}