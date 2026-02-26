'use client';

import WelcomeClock from '@/components/WelcomeClock';

export default function Header() {
  return (
    <header className="pt-[24px] md:pt-[64px]">
      <div className="flex flex-col md:flex-row md:items-start gap-[12px] md:gap-0">
        <div className="flex items-center gap-[14px] h-[60px]">
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
            alt="Horse"
            className="w-[90px] h-[60px] object-contain"
          />
          <div className="text-[24px] md:text-[28px] font-bold tracking-[-0.02em] leading-none">
            Still Cache
          </div>
        </div>

        <div className="w-full md:w-fit md:ml-auto">
          <WelcomeClock />
        </div>
      </div>
    </header>
  );
}
