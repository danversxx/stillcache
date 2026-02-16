import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full">
      <div className="flex items-center h-[50px] w-fit gap-3">
        {/* Muybridge Horse GIF */}
        <div className="w-[90px] h-[60px] flex items-center justify-center overflow-hidden">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
            alt="Muybridge Horse Animation"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-[28px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
          Still Cache
        </h1>
      </div>
    </header>
  );
}
