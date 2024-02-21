import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Hanuman,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontHanuman = Hanuman({
  variable: "--font-hanuman",
  weight: ["400", "700", "900"],
  subsets: ["khmer"],
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
