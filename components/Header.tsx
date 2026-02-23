import WelcomeMessage from './WelcomeMessage';

export default function Header() {
  return (
    <header className="w-full flex flex-col md:flex-col items-center justify-between px-4 md:px-[120px] pt-6 md:pt-16 gap-3 md:gap-0" style={{
      height: 'auto',
      minHeight: '124px'
    }}>
      {/* Logo */}
      <div className="flex items-center gap-[14px]">
        <div className="w-[60px] h-[40px] md:w-[90px] md:h-[60px]">
          <img 
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
            alt="Muybridge Horse"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-[20px] md:text-[28px] font-bold leading-none text-black" style={{ letterSpacing: '-0.02em' }}>
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
