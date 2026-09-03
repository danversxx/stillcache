import AppearanceControl from './AppearanceControl';
import BackLink from './BackLink';
import Frame from './Frame';

/* ──────────────────────────────────────────────────────────────
   SITE HEADER — fixed, two variants
   filmTitle absent  → plain title (home)
   filmTitle present → breadcrumb, title inline on md+, stacked below on mobile
   TRAP: height changes must be mirrored in PageShell CLEARANCE
────────────────────────────────────────────────────────────── */
export default function SiteHeader({ filmTitle }: { filmTitle?: string }) {
  const isFilm = Boolean(filmTitle);

  return (
    <div className="sticky top-0 z-30 bg-white">
      <Frame>
        <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">
          <div className={`flex flex-col ${isFilm ? 'gap-[4px] md:gap-0' : ''}`}>

            <div className="flex items-center justify-between gap-[16px]">
              <div className="min-w-0 flex items-center gap-x-[8px] md:gap-x-[10px] text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-[26px] md:leading-[34px]">
                {isFilm ? (
                  <>
                    <BackLink
                      fallbackHref="/"
                      className="shrink-0 opacity-[0.25] transition-opacity duration-150 hover:opacity-100"
                    >
                      Still Cache
                    </BackLink>
                    <span className="shrink-0" aria-hidden="true">/</span>
                    <span className="hidden md:inline min-w-0 break-words leading-[34px]">
                      {filmTitle}
                    </span>
                  </>
                ) : (
                  'Still Cache'
                )}
              </div>

              <div className="shrink-0 self-center">
                <AppearanceControl />
              </div>
            </div>

            {isFilm ? (
              <div className="md:hidden min-w-0 text-[20px] font-bold tracking-[-0.02em] leading-[26px]">
                <span className="block break-words max-w-[22ch]">{filmTitle}</span>
              </div>
            ) : null}

          </div>
        </header>
      </Frame>
    </div>
  );
}
