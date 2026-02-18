import WelcomeMessage from './WelcomeMessage';

export default function Header() {
  return (
    <header className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0 px-4 lg:px-24 xl:px-[120px] pt-6 lg:pt-4 pb-6 lg:pb-4 bg-black" style={{ 
      paddingTop: 'max(1.5rem, env(safe-area-inset-top))'
    }}>
      {/* Logo - horse gif + "Still Cache" text */}
      <div className="flex items-center gap-2 lg:gap-[14px]">
        <div className="w-[54px] h-[36px] lg:w-[90px] lg:h-[60px]">
          <img 
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
            alt="Muybridge Horse"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-[36px] lg:text-[60px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
          Still Cache
        </h1>
      </div>

      {/* Welcome - date/time + location/greeting side by side */}
      <div className="flex-shrink min-w-0">
        <WelcomeMessage />
      </div>
    </header>
  );
}
