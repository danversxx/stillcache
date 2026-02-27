import React from "react";
import type { Film } from "@/lib/sanity";

type Props = {
  film?: Film | null;
};

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
        "inline-flex h-[34px] items-center justify-center border border-black px-[12px] py-[6px]",
        "text-[12px] md:text-[14px] leading-[22px] tracking-[0.01em] text-black",
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
      className="inline-flex h-[34px] items-center justify-center transition-opacity hover:opacity-70"
    >
      <img
        src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/misc/letterboxd.svg"
        alt="Letterboxd"
        className="h-[22px] w-[60px] md:h-[26px] md:w-[70px] object-contain"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

function StillTile({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[342.67/192.75]">
      <img
        src={url}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[16px] min-w-0">
      <p className="text-[12px] md:text-[14px] font-bold leading-[22px] tracking-[0.01em] text-black whitespace-nowrap">
        {label}
      </p>
      <div className="text-[12px] md:text-[14px] font-normal leading-[22px] tracking-[0.01em] text-black text-right min-w-0">
        <span className="block truncate">{value}</span>
      </div>
    </div>
  );
}

export default function FilmSection({ film }: Props) {
  if (!film) {
    return (
      <section className="w-full bg-white text-black">
        <div className="py-12 md:py-16">
          <p className="text-[12px] md:text-[14px] leading-[22px] tracking-[0.01em] text-black/70">
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
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
        <div className="w-full">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 xl:gap-10">
            <div className="w-full max-w-[614px] flex flex-col items-start gap-[18px] md:gap-[32px]">
              <div className="flex w-full flex-col items-start gap-[10px] md:gap-[8px]">
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

                  <h3 className="text-[28px] md:text-[48px] font-normal leading-[32px] md:leading-[50px] text-[#999999]">
                    {film.directorName}
                  </h3>
                </div>

                <h2 className="text-[28px] md:text-[48px] font-bold leading-[32px] md:leading-[50px] text-black">
                  {film.filmTitle}
                </h2>
              </div>

              {/* ✅ Mobile: center-align logo + text, clamp copyright to 2 lines */}
              <div className="flex w-full items-center justify-between gap-[16px]">
                <div className="flex flex-1 min-w-0 flex-col gap-[6px] md:gap-[10px]">
                  {releaseDate ? (
                    <p className="text-[12px] md:text-[14px] leading-[20px] tracking-[0.01em] text-black">
                      {releaseDate}
                    </p>
                  ) : null}

                  {copyrightInfo ? (
                    <>
                      {/* Mobile (clamped to 2 lines) */}
                      <p
                        className="md:hidden whitespace-pre-line text-[12px] leading-[18px] tracking-[0.01em] text-[#999999]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical" as any,
                          overflow: "hidden",
                        }}
                      >
                        {copyrightInfo}
                      </p>

                      {/* md+ (no clamp) */}
                      <p className="hidden md:block whitespace-pre-line text-[14px] leading-[20px] tracking-[0.01em] text-[#999999]">
                        {copyrightInfo}
                      </p>
                    </>
                  ) : null}
                </div>

                {studioLogoUrl ? (
                  <img
                    src={studioLogoUrl}
                    alt={film.studio ? `${film.studio} logo` : "Studio logo"}
                    className="h-[38px] md:h-[57px] w-auto shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>

              <button
                type="button"
                className="flex h-[44px] md:h-[46px] w-full items-center justify-center gap-[8px] border border-black p-[12px] transition-opacity hover:opacity-70"
              >
                <span className="text-[12px] md:text-[14px] leading-[22px] tracking-[0.01em] text-black">
                  {film.filmTitle} Stills
                </span>
              </button>

              <div className="w-full flex flex-col gap-[10px] md:hidden">
                <InfoRow label="Directed By" value={film.directorName} />
                <InfoRow label="Overview" value={`${film.rating} \u202F\u00B7\u202F ${film.genreRuntime}`} />
                <InfoRow label="Studio" value={film.studio} />
                <InfoRow label="Country" value={film.country} />

                {(trailerHref || letterboxdHref) ? (
                  <div className="flex items-center justify-between gap-[16px]">
                    <p className="text-[12px] font-bold leading-[22px] tracking-[0.01em] text-black whitespace-nowrap">
                      External
                    </p>
                    <div className="flex items-center gap-[12px] justify-end flex-wrap">
                      {trailerHref ? <ExternalButton href={trailerHref}>Trailer</ExternalButton> : null}
                      {letterboxdHref ? <LetterboxdMark href={letterboxdHref} /> : null}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="hidden md:flex w-full flex-wrap items-start gap-x-[32px] gap-y-[16px]">
                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[22px] tracking-[0.01em] text-black">
                    Directed By
                  </p>
                  <p className="text-[14px] font-normal leading-[22px] tracking-[0.01em] text-black">
                    {film.directorName}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[22px] tracking-[0.01em] text-black">
                    Overview
                  </p>
                  <p className="text-[14px] font-normal leading-[22px] tracking-[0.01em] text-black">
                    {film.rating} &#8239;&#183;&#8239; {film.genreRuntime}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[22px] tracking-[0.01em] text-black">
                    Studio
                  </p>
                  <p className="text-[14px] font-normal leading-[22px] tracking-[0.01em] text-black">
                    {film.studio}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-[14px] font-bold leading-[22px] tracking-[0.01em] text-black">
                    Country
                  </p>
                  <p className="text-[14px] font-normal leading-[22px] tracking-[0.01em] text-black">
                    {film.country}
                  </p>
                </div>
              </div>

              {(trailerHref || letterboxdHref) ? (
                <div className="hidden md:flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[14px] font-bold leading-[22px] tracking-[0.01em] text-black">
                    External
                  </p>

                  <div className="flex h-[34px] flex-wrap items-center gap-[18px]">
                    {trailerHref ? (
                      <ExternalButton href={trailerHref}>Watch Trailer</ExternalButton>
                    ) : null}
                    {letterboxdHref ? <LetterboxdMark href={letterboxdHref} /> : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="w-full xl:w-auto xl:shrink-0">
              {posterImageUrl ? (
                <div className="w-full max-w-[420px] xl:max-w-none">
                  <img
                    src={posterImageUrl}
                    alt={`${film.filmTitle} poster`}
                    className="w-full aspect-[2/3] object-cover xl:h-[600px] xl:w-[400px]"
                    loading="lazy"
                    decoding="async"
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
