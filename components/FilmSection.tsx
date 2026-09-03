import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Film } from "@/lib/sanity";

type Props = {
  film?: Film | null;
  imageSet?: "homepage" | "gallery";
  hideGalleryButton?: boolean;
  filmHref?: string;
  galleryHref?: string;
  priority?: boolean;
};

/* Narrow no-break spaces around the middot so it never wraps mid-separator. */
const META_SEPARATOR = " \u202F\u00B7\u202F ";

/* ──────────────────────────────────────────────────────────────
   DATA HELPERS
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

  /* TRAP: forced to UTC — without it, dates shift a day in western timezones. */
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
   UI SUBCOMPONENTS
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
        "film-trailer-cta inline-flex items-center justify-center px-[14px] font-bold",
        "text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.01em]",
        "transition-opacity hover:opacity-70",
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
    >
      <img
        src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/misc/letterboxd.svg"
        alt="Letterboxd"
        className="h-[22px] w-[60px] md:h-[26.3px] md:w-[70.01px] object-contain"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

function StillTile({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[342.67/192.75]">
      {/* TRAP: `fill` needs this relative parent. object-contain letterboxes
          non-16:9 exports rather than cropping the frame. */}
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}

/* Mobile presentation: label left, value right, single line. */
function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[16px] min-w-0">
      <p className="text-[12px] md:text-[14px] font-bold leading-[18px] md:leading-[20px] tracking-[0.01em] text-black whitespace-nowrap">
        {label}
      </p>
      {/* TRAP: min-w-0 on both this and the parent — without it truncate never fires. */}
      <div className="text-[12px] md:text-[14px] font-normal leading-[18px] md:leading-[20px] tracking-[0.01em] text-black text-right min-w-0">
        <span className="block truncate">{value}</span>
      </div>
    </div>
  );
}

/* Desktop presentation: label stacked above value, wraps as a flex item. */
function MetaBlock({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-[14px] font-bold leading-[20px] tracking-[0.01em] text-black">
        {label}
      </p>
      <p className="text-[14px] font-normal leading-[20px] tracking-[0.01em] text-black">
        {value}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FILM SECTION
   1) Director + film metadata (left column)
   2) Poster (right column at xl)
   3) Stills grid (below)
────────────────────────────────────────────────────────────── */
export default function FilmSection({
  film,
  imageSet = "homepage",
  hideGalleryButton = false,
  filmHref,
  galleryHref,
  priority = false,
}: Props) {
  if (!film) {
    return (
      <section className="w-full bg-white text-black">
        <div className="py-12 md:py-16">
          <p className="text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.01em] text-black/70">
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

  /* Single source of truth — mobile and desktop both render this list.
     Add a field here once; both layouts pick it up. */
  const metaFields = [
    { label: "Directed By", value: film.directorName },
    { label: "Overview", value: `${film.rating}${META_SEPARATOR}${film.genreRuntime}` },
    { label: "Studio", value: film.studio },
    { label: "Country", value: film.country },
  ];

  const hasExternal = Boolean(trailerHref || letterboxdHref);

  const stillsSource = imageSet === "gallery" ? film.galleryImages : film.homepageStills;
  const stills = Array.isArray(stillsSource)
    ? imageSet === "homepage"
      ? stillsSource.slice(0, 6)
      : stillsSource
    : [];

  return (
    <section className="film-section w-full bg-white text-black">
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
        <div className="w-full">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 xl:gap-10">

            {/* ── LEFT COLUMN: data ───────────────────────────── */}
            <div className="w-full xl:max-w-[614px] flex flex-col items-start gap-[18px] md:gap-[32px]">

              {/* Director + title */}
              <div className="flex w-full flex-col items-start gap-[12px] md:gap-[16px]">

                <div className="flex w-full items-center gap-[10px]">
                  {directorAvatarUrl ? (
                    <img
                      src={directorAvatarUrl}
                      alt={film.directorName ? `${film.directorName} portrait` : "Director portrait"}
                      className="h-[40px] w-[40px] md:h-[52px] md:w-[52px] rounded-[100px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="h-[40px] w-[40px] md:h-[52px] md:w-[52px] rounded-[100px] bg-black/10"
                      aria-hidden="true"
                    />
                  )}

                  {/* TRAP: min-w-0 lets the h3 truncate instead of overflowing the row. */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px] md:gap-[4px]">
                    <h3 className="text-[20px] md:text-[28px] font-bold leading-[26px] md:leading-[34px] text-black truncate">
                      {film.directorName}
                    </h3>

                    {directorMeta ? (
                      <p className="text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.01em] text-black">
                        {directorMeta}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="w-full">
                  {filmHref ? (
                    <Link href={filmHref} className="block transition-opacity hover:opacity-70">
                      <h2 className="text-[32px] md:text-[48px] font-bold leading-[38px] md:leading-[54px] text-black">
                        {film.filmTitle}
                      </h2>
                    </Link>
                  ) : (
                    <h2 className="text-[32px] md:text-[48px] font-bold leading-[38px] md:leading-[54px] text-black">
                      {film.filmTitle}
                    </h2>
                  )}
                </div>
              </div>

              {/* Release date + copyright + studio mark */}
              <div className="flex w-full mt-[-8px] justify-between items-end gap-[16px] md:gap-[34px]">
                {/* TRAP: flex-1 here plus shrink-0 on the logo is what makes the
                    copyright wrap only when it reaches the mark, not sooner. */}
                <div className="flex flex-1 min-w-0 flex-col gap-[8px] md:gap-[10px]">
                  {releaseDate ? (
                    <div className="flex flex-col gap-0">
                      <p className="text-[12px] md:text-[14px] font-bold leading-[18px] md:leading-[20px] tracking-[0.01em] text-black">
                        Release Date
                      </p>
                      <p className="text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.01em] text-black">
                        {releaseDate}
                      </p>
                    </div>
                  ) : null}

                  {copyrightInfo ? (
                    /* whitespace-pre-line preserves line breaks authored in Sanity. */
                    <p className="whitespace-pre-line text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.01em] text-[#999999]">
                      {copyrightInfo}
                    </p>
                  ) : null}
                </div>

                {studioLogoUrl ? (
                  <img
                    src={studioLogoUrl}
                    alt={film.studio ? `${film.studio} logo` : "Studio logo"}
                    className="studio-logo-mark h-[38px] md:h-[57px] w-auto shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>

              {/* Stills CTA — link when a destination exists, inert button otherwise */}
              {!hideGalleryButton ? (
                galleryHref ? (
                  <Link
                    href={galleryHref}
                    className="film-stills-cta flex w-full items-center justify-center gap-[4px]"
                  >
                    <span className="min-w-0 truncate film-stills-cta-title">{film.filmTitle}</span>
                    <span className="shrink-0 film-stills-cta-label">Stills</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="film-stills-cta flex w-full items-center justify-center gap-[4px]"
                  >
                    <span className="min-w-0 truncate film-stills-cta-title">{film.filmTitle}</span>
                    <span className="shrink-0 film-stills-cta-label">Stills</span>
                  </button>
                )
              ) : null}

              {/* Metadata — mobile rows */}
              <div className="w-full flex flex-col gap-[10px] md:hidden">
                {metaFields.map((field) => (
                  <MetaRow key={field.label} label={field.label} value={field.value} />
                ))}

                {hasExternal ? (
                  <div className="flex items-center justify-between gap-[16px]">
                    <p className="text-[12px] font-bold leading-[18px] tracking-[0.01em] text-black whitespace-nowrap">
                      External
                    </p>
                    <div className="flex items-center gap-[12px] justify-end flex-wrap">
                      {trailerHref ? <ExternalButton href={trailerHref}>Watch Trailer</ExternalButton> : null}
                      {letterboxdHref ? <LetterboxdMark href={letterboxdHref} /> : null}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Metadata — desktop blocks */}
              <div className="hidden md:flex w-full flex-wrap items-start gap-x-[32px] gap-y-[16px]">
                {metaFields.map((field) => (
                  <MetaBlock key={field.label} label={field.label} value={field.value} />
                ))}
              </div>

              {/* External — desktop */}
              {hasExternal ? (
                <div className="hidden md:flex w-full flex-col items-start gap-[8px]">
                  <p className="text-[14px] font-bold leading-[20px] tracking-[0.01em] text-black">
                    External
                  </p>
                  <div className="flex h-[30px] flex-wrap items-center gap-[18px]">
                    {trailerHref ? <ExternalButton href={trailerHref}>Watch Trailer</ExternalButton> : null}
                    {letterboxdHref ? <LetterboxdMark href={letterboxdHref} /> : null}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ── RIGHT COLUMN: poster ────────────────────────── */}
            <div className="w-full flex justify-center xl:w-auto xl:block xl:shrink-0">
              {posterImageUrl ? (
                <div className="w-full max-w-full md:max-w-[clamp(460px,58vw,680px)]">
                  {/* TRAP: width/height declare the source ratio only — CSS controls rendered size. */}
                  <Image
                    src={posterImageUrl}
                    alt={`${film.filmTitle} poster`}
                    width={2000}
                    height={3000}
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 58vw, 100vw"
                    priority={priority}
                    className="w-full aspect-[2/3] object-cover xl:h-[600px] xl:w-[400px]"
                  />
                </div>
              ) : (
                <div
                  className="w-full max-w-[420px] aspect-[2/3] bg-black/10 xl:h-[600px] xl:w-[400px]"
                  aria-label="Poster unavailable"
                  role="img"
                />
              )}
            </div>
          </div>
        </div>

        {/* ── STILLS GRID ───────────────────────────────────────── */}
        {stills.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]">
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
