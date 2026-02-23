export const revalidate = 60;
import Header from '@/components/Header';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Main Container - 64px gaps between sections */}
      <div className="w-full mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <Header />

        {/* Films Section */}
        <section className="w-full">
          <FilmSection />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
