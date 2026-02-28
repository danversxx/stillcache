import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ──────────────────────────────────────────────────────────────
   GLOBAL METADATA (SEO + browser tab)
   Controls:
   - Page title
   - Search engine description
────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Still Cache",
  description: "A curated collection of film stills",
};

/* ──────────────────────────────────────────────────────────────
   VIEWPORT SETTINGS (mobile & edge-to-edge display)
   Controls:
   - Device width scaling
   - Initial zoom level
   - Safe-area usage on modern phones (notches)
────────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* ──────────────────────────────────────────────────────────────
   ROOT LAYOUT (global document frame)
   Applies to every page.

   Controls:
   - HTML language
   - Global body styling
   - Minimum viewport height
   - Background & text colors
────────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* STYLE: Document language for accessibility & SEO */}

      <body className="min-h-screen bg-white text-black">
        {/* STYLE: Minimum full viewport height */}
        {/* STYLE: Global background color */}
        {/* STYLE: Global text color */}

        {children}
      </body>
    </html>
  );
}
