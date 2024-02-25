import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProvider from "@/components/ClientProvider";
import FirebaseAuthProvidee from "@/components/FirebaseAuthProvidee";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with Your Language",
  description: "Generated by Digistacks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="ar" >
      <body className={inter.className}>
        <FirebaseAuthProvidee>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        </FirebaseAuthProvidee>
      </body>
    </html>
    </ClientProvider>
  );
}
