import React from "react";
import type { Film } from "@/lib/sanity";

type Props = {
  film?: Film | null;
};

/* ──────────────────────────────────────────────────────────────
   DATA HELPERS (Sanity field safety + formatting)
   - URL validation for external links
   - Date formatting
   - Director metadata string composition
────────────────────────────────────────────────────────────── */
function safeExternalUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function formatIsoDateToLong(iso?: string): string {
  if (!iso) return "";
  const trimmed = iso.trim();
  if (!trimmed) return "";

  const d = new Date(`${trimmed}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function buildDirectorMeta(birthYear?: number, nationality?: string): string {
  const y = typeof birthYear === "number" && Number.isFinite(birthYear) ? String(birthYear) : "";
  const n = typeof nationality === "string" ? nationality.trim() : "";
  if (y && n) return `${y} \u00B7 ${n}`;
  return y || n || "";
}

/* ──────────────────────────────────────────────────────────────
   UI SUBCOMPONENTS (used within FilmSection)
   - External button
   - Letterboxd mark
   - Still tile
   - Mobile info row
────────────────────────────────────────────────────────────── */
function ExternalButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[
        "inline-flex h-[34px] md:h-[30px] items-center justify-center border border-black px-[12px] py-[6px]",
        // STYLE: Button layout (inline-flex + centering) + dimensions (h-*) + responsive height (md:...) + border + padding
        // Regular text: +2px line-height
        "text-[12px] md:text-[14px] leading-[24px] md:leading-[20px] tracking-[0.01em] text-black",
        // STYLE: Typography (size/leading/tracking) + responsive typography + text color
        "transition-opacity hover:opacity-70",
        // STYLE: Interaction (hover opacity + transition)
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function LetterboxdMark({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Letterboxd"
      title="Letterboxd"
      className="inline-flex md:h-[30px] items-center justify-center transition-opacity hover:opacity-70"
      /* STYLE: Layout (inline-flex + centering) + optional desktop height (md:h-*) + hover/transition */
    >
      <img
        src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/misc/letterboxd.svg"
        alt="Letterboxd"
        className="h-[22px] w-[60px] md:h-[26.3px] md:w-[70.01px] object-contain"
        /* STYLE: Mark sizing (h/w) + responsive sizing (md:...) + image fit (object-contain) */
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

function StillTile({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[342.67/192.75]">
      {/* STYLE: Tile sizing (full width) + aspect ratio (controls tile shape) + positioning context (relative) */}
      <img
        src={url}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain"
        /* STYLE: Image fill (absolute + inset-0 + h/w full) + fit (object-contain) */
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[16px] min-w-0">
      {/* STYLE: Two-column row layout (flex) + alignment + spacing (gap) + truncation support (min-w-0) */}
      <p className="text-[12px] md:text-[14px] font-bold leading-[22px] md:leading-[18px] tracking-[0.01em] text-black whitespace-nowrap">
        {/* STYLE: Label typography (size/weight/leading/tracking) + responsive typography + keep on one line */}
        {label}
      </p>
      {/* Regular: +2px line-height */}
      <div className="text-[12px] md:text-[14px] font-normal leading-[24px] md:leading-[20px] tracking-[0.01em] text-black text-right min-w-0">
        {/* STYLE: Value typography (size/weight/leading/tracking) + responsive leading + right alignment + truncation support */}
        <span className="block truncate">{value}</span>
        {/* STYLE: Truncation (truncate) */}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FILM SECTION (Main component)
   Visual order on page:
   1) Director + Film metadata (left column)
   2) Poster (right column on xl)
   3) Stills grid (below)
────────────────────────────────────────────────────────────── */
export default function FilmSection({ film }: Props) {
  if (!film) {
    return (
      <section className="w-full bg-white text-black">
        {/* STYLE: Section surface (background + text color) */}
        <div className="py-12 md:py-16">
          {/* STYLE: Loading state spacing (vertical padding) + responsive padding */}
          <p className="text-[12px] md:text-[14px] leading-[24px] md:leading-[20px] tracking-[0.01em] text-black/70">
            {/* STYLE: Loading typography + muted opacity (text-black/70) */}
            Loading film…
          </p>
        </div>
      </section>
    );
  }

  const trailerHref = safeExternalUrl(typeof film.trailerUrl === "string" ? film.trailerUrl : null);
  const letterboxdHref = safeExternalUrl(
    typeof film.letterboxdUrl === "string" ? film.letterboxdUrl : null
  );

  const directorMeta = buildDirectorMeta(film.directorBirthYear, film.directorNationality);

  const releaseDate = formatIsoDateToLong(film.releaseDate);
  const copyrightInfo =
    typeof film.copyrightInformation === "string" ? film.copyrightInformation.trim() : "";

  const directorAvatarUrl =
    typeof film.directorAvatarUrl === "string" ? film.directorAvatarUrl.trim() : "";
  const studioLogoUrl = typeof film.studioLogoUrl === "string" ? film.studioLogoUrl.trim() : "";

  const posterImageUrl = typeof film.posterImageUrl === "string" ? film.posterImageUrl.trim() : "";

  const stills = Array.isArray(film.homepageStills) ? film.homepageStills.slice(0, 6) : [];

  return (
    <section className="w-full bg-white text-black">
      {/* STYLE: Section surface (background + text color) */}

      <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
        {/* STYLE: Overall vertical layout + spacing between major blocks + responsive gap */}

        <div className="w-full">
          {/* STYLE: Main content width (full) */}

          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 xl:gap-10">
            {/* STYLE: Layout (stacked → two columns at xl) + alignment + inter-column gap */}

            {/* ──────────────────────────────────────────────────
                LEFT COLUMN: Data
            ────────────────────────────────────────────────── */}
            <div className="w-full max-w-[614px] flex flex-col items-start gap-[18px] md:gap-[32px]">
              {/* STYLE: Column width constraints (max-w) + vertical flow + spacing + responsive gap */}

              {/* Director/Film */}
              <div className="flex w-full flex-col items-start gap-[12px] md:gap-[16px]">
                {/* STYLE: Block spacing + responsive gap */}

                {/* Director row */}
                <div className="flex w-full items-center gap-[10px]">
                  {/* STYLE: Row layout + avatar/text alignment + spacing */}

                  {directorAvatarUrl ? (
                    <img
                      src={directorAvatarUrl}
                      alt={film.directorName ? `${film.directorName} portrait` : "Director portrait"}
                      className="h-[40px] w-[40px] md:h-[52px] md:w-[52px] rounded-[100px] object-cover"
                      /* STYLE: Avatar sizing + responsive sizing + full rounding + crop (object-cover) */
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="h-[40px] w-[40px] md:h-[52px] md:w-[52px] rounded-[100px] bg-black/10"
                      /* STYLE: Placeholder avatar sizing + responsive sizing + rounding + neutral fill */
                      aria-hidden="true"
                    />
                  )}

                  {/* Name/Info */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px] md:gap-[4px]">
                    {/* STYLE: Text stack spacing + truncation support (min-w-0) + responsive gap */}

                    {/* H3: +2px line-height */}
                    <h3 className="text-[24px] md:text-[28px] font-bold leading-[30px] md:leading-[32px] text-black truncate">
                      {/* STYLE: Director name typography + responsive scale + truncation */}
                      {film.directorName}
                    </h3>

                    {directorMeta ? (
                      <p className="text-[12px] md:text-[14px] leading-[18px] tracking-[0.01em] text-black">
                        {/* STYLE: Director meta typography (size/leading/tracking) */}
                        {directorMeta}
                      </p>
                    ) : null}
                  </div>
                </div>

                <h2 className="text-[28px] md:text-[48px] font-bold leading-[32px] md:leading-[50px] text-black">
                  {/* STYLE: Film title typography (size/weight/leading) + responsive scale */}
                  {film.filmTitle}
                </h2>
              </div>

              {/* Release / Copyright / Logo */}
              <div className="flex w-full items-center justify-between gap-[16px] md:gap-[34px]">
                {/* STYLE: Row layout + spacing between text block and studio mark + responsive gap */}

                <div className="flex flex-1 min-w-0 flex-col gap-[8px] md:gap-[10px]">
                  {/* STYLE: Text column flow + spacing + responsive spacing */}

                  {releaseDate ? (
                    <div className="flex flex-col gap-0">
                      {/* STYLE: Group label + value as a single unit (removes spacing between them) */}
                      <p className="text-[12px] md:text-[14px] font-bold leading-[20px] tracking-[0.01em] text-black">
                        {/* STYLE: Release Date label typography (matches date styling; bold weight for hierarchy) */}
                        Release Date
                      </p>
                      <p className="text-[12px] md:text-[14px] leading-[20px] tracking-[0.01em] text-black">
                        {/* STYLE: Release date typography */}
                        {releaseDate}
                      </p>
                    </div>
                  ) : null}

                  {copyrightInfo ? (
                    <p className="whitespace-pre-line text-[12px] md:text-[14px] leading-[20px] tracking-[0.01em] text-[#999999] max-w-[34ch] md:max-w-[270px]">
                      {/* STYLE: Copy typography + muted color + width constraint + preserve line breaks */}
                      {copyrightInfo}
                    </p>
                  ) : null}
                </div>

                {studioLogoUrl ? (
                  <img
                    src={studioLogoUrl}
                    alt={film.studio ? `${film.studio} logo` : "Studio logo"}
                    className="h-[38px] md:h-[57px] w-auto shrink-0"
                    /* STYLE: Studio mark sizing (height) + responsive height + prevent shrink */
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>

              {/* Gallery */}
              <button
                type="button"
                className="flex h-[44px] md:h-[42px] w-full items-center justify-center gap-[8px] border border-black p-[12px] transition-opacity hover:opacity-70"
              >
                {/* STYLE: CTA layout (flex + centering) + height + responsive height + full width + border + padding + hover transition */}
                <span className="text-[12px] md:text-[14px] leading-[24px] md:leading-[20px] tracking-[0.01em] text-black">
                  {/* STYLE: CTA label typography */}
                  {film.filmTitle} Stills
                </span>
              </button>

              {/* Mobile info rows */}
              <div className="w-full flex flex-col gap-[10px] md:hidden">
                {/* STYLE: Mobile-only section (md:hidden) + vertical spacing */}
                <InfoRow label="Directed By" value={film.directorName} />
                <InfoRow label="Overview" value={`${film.rating} \u202F\u00B7\u202F ${film.genreRuntime}`} />
                <InfoRow label="Studio" value={film.studio} />
                <InfoRow label="Country" value={film.country} />

                {trailerHref || letterboxdHref ? (
                  <div className="flex items-center justify-between gap-[16px]">
                    {/* STYLE: Row layout for external links + alignment + spacing */}
                    <p className="text-[12px] font-bold leading-[22px] tracking-[0.01em] text-black whitespace-nowrap">
                      {/* STYLE: Label typography + keep on one line */}
                      External
                    </p>
                    <div className="flex items-center gap-[12px] justify-end flex-wrap">
                      {/* STYLE: Link group alignment + spacing + wrapping behaviour */}
                      {trailerHref ? <ExternalButton href={trailerHref}>Watch Trailer</ExternalButton> : null}
                      {letterboxdHref ? <LetterboxdMark href={letterboxdHref} /> : null}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Desktop information */}
              <div className="hidden md:flex w-full flex-wrap items-start gap-x-[32px] gap-y-[16px]">
                {/* STYLE: Desktop-only (hidden → md:flex) + wrap layout + column/row gaps */}

                <div className="flex flex-col items-start">
                  {/* STYLE: Stacked label/value */}
                  <p className="text-[14px] font-bold leading-[18px] tracking-[0.01em] text-black">
                    {/* STYLE: Label typography */}
                    Directed By
                  </p>
                  <p className="text-[14px] font-normal leading-[20px] tracking-[0.01em] text-black">
                    {/* STYLE: Value typography */}
                    {film.directorName}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[18px] tracking-[0.01em] text-black">
                    Overview
                  </p>
                  <p className="text-[14px] font-normal leading-[20px] tracking-[0.01em] text-black">
                    {film.rating} &#8239;&#183;&#8239; {film.genreRuntime}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[18px] tracking-[0.01em] text-black">
                    Studio
                  </p>
                  <p className="text-[14px] font-normal leading-[20px] tracking-[0.01em] text-black">
                    {film.studio}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[18px] tracking-[0.01em] text-black">
                    Country
                  </p>
                  <p className="text-[14px] font-normal leading-[20px] tracking-[0.01em] text-black">
                    {film.country}
                  </p>
                </div>
              </div>

              {/* Desktop external */}
              {trailerHref || letterboxdHref ? (
                <div className="hidden md:flex w-full flex-col items-start gap-[8px]">
                  {/* STYLE: Desktop-only (hidden → md:flex) + vertical spacing */}
                  <p className="text-[14px] font-bold leading-[18px] tracking-[0.01em] text-black">
                    {/* STYLE: Label typography */}
                    External
                  </p>

                  <div className="flex h-[30px] flex-wrap items-center gap-[18px]">
                    {/* STYLE: Fixed row height + wrapping + spacing */}
                    {trailerHref ? <ExternalButton href={trailerHref}>Watch Trailer</ExternalButton> : null}
                    {letterboxdHref ? <LetterboxdMark href={letterboxdHref} /> : null}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ──────────────────────────────────────────────────
                RIGHT COLUMN: Poster
            ────────────────────────────────────────────────── */}
            <div className="w-full xl:w-auto xl:shrink-0">
              {/* STYLE: Poster column sizing (full width → auto at xl) + prevent shrink at xl */}
              {posterImageUrl ? (
                <div className="w-full max-w-[420px] xl:max-w-none">
                  {/* STYLE: Poster max width constraint + remove constraint at xl */}
                  <img
                    src={posterImageUrl}
                    alt={`${film.filmTitle} poster`}
                    className="w-full aspect-[2/3] object-cover xl:h-[600px] xl:w-[400px]"
                    /* STYLE: Poster sizing (full width) + aspect ratio + crop (object-cover) + fixed xl dimensions */
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  className="w-full max-w-[420px] aspect-[2/3] bg-black/10 xl:h-[600px] xl:w-[400px]"
                  /* STYLE: Poster placeholder sizing + aspect ratio + neutral fill + fixed xl dimensions */
                  aria-label="Poster unavailable"
                  role="img"
                />
              )}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            STILLS GRID (below)
        ───────────────────────────────────────────────────────── */}
        {/* Stills */}
        {stills.length > 0 ? (
          <div className="w-full">
            {/* STYLE: Stills section width (full) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]">
              {/* STYLE: Grid columns per breakpoint + spacing (gap) */}
              {stills.map((s, i) => (
                <StillTile
                  key={s._key || `still_${i}`}
                  url={s.url}
                  alt={s.alt || `${film.filmTitle} still`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
