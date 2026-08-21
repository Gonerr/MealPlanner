import FoodBackdrop from "@/components/decor/FoodBackdrop";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import "./styles/dayMenuPlanner.css";
import "./styles/global.css";

export const metadata: Metadata = {
  //   title: "NeМеню — домашний планировщик питания",
  title: "React Ne",
  description:
    "Планирование домашнего меню, покупок, КБЖУ и расходов на недели вперёд.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <FoodBackdrop />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
