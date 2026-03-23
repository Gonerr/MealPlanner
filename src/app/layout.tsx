import { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Providers } from "./providers";

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
        <html lang="ru">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}