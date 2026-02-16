import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Still Cache",
  description: "A curated collection of film stills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
