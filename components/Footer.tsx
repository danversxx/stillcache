export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-4 md:px-[120px] py-4 md:py-8">
      <div className="w-full flex items-center justify-center md:justify-start">
        <p className="text-[12px] font-normal leading-none text-black">
          © {currentYear} · Still Cache
        </p>
      </div>
    </footer>
  );
}
