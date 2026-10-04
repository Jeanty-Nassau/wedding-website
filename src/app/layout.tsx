import "../styles/globals.css";

import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "../trpc/react";
import { GeistSans } from "geist/font/sans";
import { Allura, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const scriptFont = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

export const metadata = {
  title: "Jeanty & Trinesha | Wedding Guest Experience",
  description:
    "A full-stack wedding guest experience built with Next.js, TypeScript, tRPC, Prisma, PostgreSQL, and Clerk.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <html
        lang="en"
        className={`${GeistSans.className} ${scriptFont.variable} ${displayFont.variable}`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <body className="bg-[#1A1A1A]">
            <Toaster />
            <main>{children}</main>
            <Analytics />
          </body>
        </TRPCReactProvider>
      </html>
    </ClerkProvider>
  );
}
