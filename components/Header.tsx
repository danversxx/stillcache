import Image from 'next/image';
import WelcomeMessage from './WelcomeMessage';

export default function Header() {
  return (
    <header className="w-full flex flex-col gap-6">
      {/* Still Cache */}
      <div className="w-full flex items-center gap-4 lg:gap-6">
        {/* Muybridge Horse GIF */}
        <div className="w-[90px] h-[60px] flex items-center justify-center overflow-hidden">
          <img 
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
            alt="Muybridge Horse Animation"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-[28px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
          Still Cache
        </h1>
      </div>

      {/* Welcome */}
      <WelcomeMessage />
    </header>
  );
}
