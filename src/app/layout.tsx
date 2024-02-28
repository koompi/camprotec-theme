import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../config/site";
import { ApolloWrapper } from "@/libs/apollo-wrapper";
import AuthProvider from "@/context/useAuth";
import ThemeProvider from "@/context/useTheme";
import NavbarLayout from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import MobileNavigator from "./components/layouts/MobileNavigator";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

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
      <body className={poppins.className} suppressHydrationWarning={true}>
        <ApolloWrapper>
          <AuthProvider>
            <ThemeProvider>
              <NavbarLayout />
              {children}
              <Footer />
              <MobileNavigator />
            </ThemeProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
