export const revalidate = 60;
import Hero from '@/components/Hero';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Main Container - responsive width, proportionally scaled gap, scaled bottom padding */}
      <div className="w-full mx-auto flex flex-col" style={{ gap: 'min(4.44vw, 64px)', paddingBottom: 'min(4.44vw, 64px)' }}> {/* 64px at 1440px */}
        
        {/* Hero Section - 880px height, responsive side padding */}
        <Hero />

        {/* Films Section - fluid padding */}
        <section className="w-full" style={{ paddingLeft: 'min(8.33vw, 120px)', paddingRight: 'min(8.33vw, 120px)' }}> {/* 120px at 1440px */}
          <FilmSection />
        </section>

        {/* Footer - fluid padding */}
        <div className="w-full" style={{ paddingLeft: 'min(8.33vw, 120px)', paddingRight: 'min(8.33vw, 120px)' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
