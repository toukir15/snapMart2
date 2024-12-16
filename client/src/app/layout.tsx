import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";


import { fontSans } from "@/src/config/fonts";
import { siteConfig } from "@/src/config/site";
import { Providers } from "../lib/providers";
// import { Navbar } from "@/src/components/navbar";
// import Footer from "../components/Footer";
// import { Providers } from "../lib/providers";
import "@smastrom/react-rating/style.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          " bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="flex flex-col ">
            <main className="">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
