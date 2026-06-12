import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/layout/Grain";
import Cursor from "@/components/layout/Cursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "LIVLIVE — host IRL events in 10 mins",
  description:
    "LIVLIVE is the largest partnership network for hosts. Find venues, talent, vendors & sponsors and go from text to booking in minutes. #itoocanhost",
  openGraph: {
    title: "LIVLIVE — host IRL events in 10 mins",
    description:
      "The largest partnership network for hosts. Venues, talent, vendors & sponsors — booked in minutes.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7eecf",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink antialiased">
        <Grain />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
