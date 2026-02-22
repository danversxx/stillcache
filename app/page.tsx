export const revalidate = 60;
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Header - fixed */}
      <Header />
      
      {/* Main Container - add top padding for fixed header, 24px gaps */}
      <div className="w-full mx-auto flex flex-col gap-6 md:gap-16 pt-[90px] md:pt-[52px]" style={{ paddingBottom: 'min(4.44vw, 64px)' }}>
        
        {/* Hero Section - 880px height, responsive side padding */}
        <Hero />

        {/* Films Section - responsive padding */}
        <section className="w-full px-4 md:px-8 xl:px-[120px]">
          <FilmSection />
        </section>

        {/* Footer - responsive padding */}
        <div className="w-full px-4 md:px-8 xl:px-[120px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
