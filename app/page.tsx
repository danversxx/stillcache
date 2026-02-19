export const revalidate = 60;
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Header - separate from Hero */}
      <Header />
      
      {/* Main Container - responsive width, 14px gap on mobile, 64px on desktop */}
      <div className="w-full mx-auto flex flex-col gap-3.5 lg:gap-16" style={{ paddingBottom: 'min(4.44vw, 64px)' }}>
        
        {/* Hero Section - 880px height, responsive side padding */}
        <Hero />

        {/* Films Section - responsive padding */}
        <section className="w-full px-4 lg:px-24 xl:px-[120px]">
          <FilmSection />
        </section>

        {/* Footer - responsive padding */}
        <div className="w-full px-4 lg:px-24 xl:px-[120px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
