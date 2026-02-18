export const revalidate = 60;
import Hero from '@/components/Hero';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Main Container - responsive width, proportionally scaled gap, scaled bottom padding */}
      <div className="w-full mx-auto flex flex-col gap-4 sm:gap-8 lg:gap-16 pb-4 sm:pb-8 lg:pb-16">
        
        {/* Hero Section - 880px height, responsive side padding */}
        <Hero />

        {/* Films Section - responsive side padding */}
        <section className="w-full">
          <FilmSection />
        </section>

        {/* Footer - responsive side padding, 32px top/bottom padding */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
