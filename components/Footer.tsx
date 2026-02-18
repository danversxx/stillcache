export default function Footer() {
  return (
    <footer className="w-full" style={{ paddingTop: 'min(2.22vw, 32px)', paddingBottom: 'min(2.22vw, 32px)' }}> {/* 32px at 1440px */}
      <div className="w-full flex items-center">
        <p className="text-[10px] sm:text-[12px] font-medium leading-none tracking-tight-2">
          © 2026 · Still Cache
        </p>
      </div>
    </footer>
  );
}
