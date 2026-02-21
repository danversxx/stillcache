import WelcomeMessage from './WelcomeMessage';

export default function Header() {
  return (
    <header className="w-full flex flex-row items-center justify-between px-4 lg:px-24 xl:px-[120px] sticky top-0 z-50" style={{ 
      height: '52px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      {/* Logo */}
      <div className="flex items-center gap-[10px]">
        <div className="w-[45px] h-[30px]">
          <img 
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
            alt="Muybridge Horse"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-[18px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
          Still Cache
        </h1>
      </div>

      {/* Welcome */}
      <div className="flex-shrink min-w-0">
        <WelcomeMessage />
      </div>
    </header>
  );
}
