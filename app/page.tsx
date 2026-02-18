export const revalidate = 60;
import Hero from '@/components/Hero';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Main Container - 1440px max, 64px gap, 64px bottom padding */}
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 pb-16">
        
        {/* Hero Section - 880px height, 120px side padding */}
        <Hero />

        {/* Films Section - 120px side padding */}
        <section className="w-full px-[120px]">
          <FilmSection />
        </section>

        {/* Footer - 120px side padding, 32px top/bottom padding */}
        <div className="w-full px-[120px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
