import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../config/site";
import { ApolloWrapper } from "@/libs/apollo-wrapper";
import AuthProvider from "@/context/useAuth";
import ThemeProvider from "@/context/useTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://riverbase.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "km-KH": "/km-KH",
    },
  },
  openGraph: {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    url: "https://riverbase.org",
    siteName: "Riverbase",
    images: [
      {
        url: "https://riverbase.org/images/thumbnail.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://riverbase.org/images/thumbnail.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ApolloWrapper>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
