import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIVLIVE — host offline events in 10 minutes",
  description:
    "LIVLIVE helps startup teams turn event ideas into real-world plans with AI-assisted venue, ops, and launch checks.",
  openGraph: {
    title: "LIVLIVE — host offline events in 10 minutes",
    description:
      "AI-assisted planning for startup events, venues, ops, and launch checks.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
