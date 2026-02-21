import WelcomeMessage from './WelcomeMessage';

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 flex flex-row items-center justify-between px-4 lg:px-24 xl:px-[120px] py-6 lg:py-0" style={{ 
      height: 'auto',
      minHeight: '52px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
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
