import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ──────────────────────────────────────────────────────────────
   GLOBAL METADATA (SEO + browser tab + link previews)
   TRAP: no title.template — film pages append "· Still Cache"
   themselves, and a template would double the suffix
────────────────────────────────────────────────────────────── */
const SITE_DESCRIPTION = "A Curated Archive of Film Stills · Still Cache";

export const metadata: Metadata = {
  metadataBase: new URL("https://stillcache.vercel.app"),
  title: "Still Cache",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Still Cache",
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "Still Cache",
    url: "https://stillcache.vercel.app",
    images: [{ url: "/og.png", width: 1920, height: 1008, alt: "Still Cache" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Still Cache",
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

/* ──────────────────────────────────────────────────────────────
   VIEWPORT SETTINGS (mobile & edge-to-edge display)
────────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* ──────────────────────────────────────────────────────────────
   ROOT LAYOUT (global document frame)
────────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TRAP: must run before paint, and must mirror AppearanceControl —
            same storage key, same 07:00–19:00 auto window. Edit both together. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('stillcache_appearance_mode')||'auto';var h=new Date().getHours();var t=m==='light'||m==='dark'?m:(h>=7&&h<19?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-black">
        {children}
      </body>
    </html>
  );
}
