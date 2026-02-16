import Header from '@/components/Header';
import FilmSection from '@/components/FilmSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Desktop Container - 1400px max width */}
      <div className="max-w-[1400px] mx-auto">
        {/* Main Container */}
        <main className="w-full px-6 md:px-[120px] py-16">
          <div className="w-full flex flex-col gap-7 lg:gap-8">
            {/* Header */}
            <Header />

            {/* Films Section */}
            <section className="w-full">
              <FilmSection />
            </section>

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
