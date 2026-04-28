import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/search/SearchModal";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Статус — Амуниция для охотников. Сделано на Урале",
  description:
    "Интернет-магазин охотничьего снаряжения: жилеты, подсумки, тактические ремни и аксессуары. Производство на Урале.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${oswald.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f0ece4] antialiased">
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Header />
              <CartDrawer />
              <SearchModal />
              <main className="flex-1">{children}</main>
              <Footer />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
