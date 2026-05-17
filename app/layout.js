import { Poppins, DM_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata = {
  title: "Cedar — The Best OS Hasn't Been Made Yet",
  description:
    "A Linux-based OS built around one idea: a computer should disappear. Light enough to run on hardware others gave up on. Considered enough to feel like nothing else.",
  keywords: ["Cedar", "Linux", "OS", "operating system", "lightweight", "open source"],
  openGraph: {
    title: "Cedar — The Best OS Hasn't Been Made Yet",
    description:
      "A Linux-based OS built around one idea: a computer should disappear.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}