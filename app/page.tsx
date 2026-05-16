'use client';

import Link from 'next/link';
import { CATEGORIES, FEATURED, HERO_PRODUCT_ID, PRODUCTS, TICKER } from '@/lib/data';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { CarSVG, HeroStage, PaintPen } from '@/components/Visuals';
import {
  CountUp,
  DataStream,
  Glitch,
  HeroReticle,
  RevealOnScroll,
  ScanBeam,
  TypeOn,
  useLiveReading,
} from '@/components/Effects';

const ACCENT = '#c1121f';

export default function Home() {
  const liveReading = useLiveReading(142.6, 24, 1400);

  return (
    <main className="v-screen">
      {/* HERO ============================================================ */}
      <section
        style={{
          position: 'relative',
          height: 'calc(100vh - 96px)',
          minHeight: 720,
          background: '#000',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <HeroStage intensity={1} accent={ACCENT}>
          <ScanBeam accent={ACCENT} intensity={1} />
          <HeroReticle accent={ACCENT} />

          <div
            className="v-hero-stage"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              padding: '40px 56px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="v-eyebrow" style={{ color: ACCENT }}>
                  ● VELOCE / 26 · FLAGSHIP
                </span>
                <span style={{ fontFamily: 'var(--v-mono)', fontSize: 11, opacity: 0.55, letterSpacing: '.18em' }}>
                  <TypeOn text="VLC-PT-0001 — PRECISION PEN" speed={30} />
                </span>
              </div>
              <div className="v-hero-data">
                <DataStream accent={ACCENT} />
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 'min(115%, 1500px)',
                  transform: 'translate(-50%, -35%)',
                  pointerEvents: 'none',
                  opacity: 0.18,
                  filter: 'blur(.5px)',
                }}
              >
                <CarSVG intensity={1} accent={ACCENT} />
              </div>

              <div style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 24,
                    marginBottom: 18,
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.3em',
                    opacity: 0.65,
                  }}
                >
                  <span>0µm</span>
                  <span style={{ color: ACCENT, animation: 'v-oled-breathe 2.4s infinite' }}>
                    ● {liveReading.toFixed(1)}µm
                  </span>
                  <span>300µm</span>
                </div>
                <h1
                  className="v-display"
                  style={{ fontSize: 'clamp(80px, 14vw, 220px)', margin: 0, color: '#fff', lineHeight: 0.85 }}
                >
                  <span style={{ display: 'block' }}>
                    <Glitch>READ THE</Glitch>
                  </span>
                  <span style={{ display: 'block', color: ACCENT }}>METAL.</span>
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--v-editorial)',
                    fontSize: 18,
                    fontStyle: 'italic',
                    opacity: 0.75,
                    maxWidth: 620,
                    margin: '24px auto 0',
                    lineHeight: 1.45,
                  }}
                >
                  The Precision Pen — a paint-thickness gauge with 0.1µm resolution. Knows every repaint, every filler,
                  every story the body shop didn&apos;t tell you.
                </p>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="v-hero-pen-wrap" style={{ width: 'min(96%, 1400px)', margin: '0 auto 28px', position: 'relative' }}>
                <PaintPen accent={ACCENT} glow />
                <div
                  style={{
                    position: 'absolute',
                    left: '2.5%',
                    top: '48%',
                    width: '7%',
                    height: 1,
                    background: `linear-gradient(to right, ${ACCENT}, transparent)`,
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: 24,
                }}
              >
                <div className="v-hero-cta" style={{ display: 'flex', gap: 12 }}>
                  <Link href={`/product/${HERO_PRODUCT_ID}`} className="v-btn v-btn--lg">
                    Shop the Pen · €690{' '}
                    <span className="arr">
                      <Icon name="arrow" size={16} />
                    </span>
                  </Link>
                  <Link href="/shop" className="v-btn v-btn--lg v-btn--ghost">
                    All Accessories
                  </Link>
                </div>
                <div className="v-hero-bottom-meta" style={{ textAlign: 'right', maxWidth: 280 }}>
                  <div
                    style={{
                      fontFamily: 'var(--v-mono)',
                      fontSize: 10,
                      letterSpacing: '.2em',
                      opacity: 0.55,
                      marginBottom: 6,
                    }}
                  >
                    FLAGSHIP · LIMITED
                  </div>
                  <div style={{ fontFamily: 'var(--v-display)', fontSize: 24, lineHeight: 1, marginBottom: 4 }}>
                    500 NUMBERED UNITS
                  </div>
                  <div style={{ fontFamily: 'var(--v-mono)', fontSize: 11, opacity: 0.7 }}>
                    FE + NON-FE · BLUETOOTH · 5YR CAL.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeroStage>

        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...p,
              width: 24,
              height: 24,
              border: '1px solid rgba(255,255,255,.4)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </section>

      {/* MARQUEE TICKER ================================================== */}
      <section
        style={{
          background: 'var(--v-red)',
          color: '#fff',
          borderTop: '1px solid #fff',
          borderBottom: '1px solid #fff',
          overflow: 'hidden',
          padding: '14px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'v-ticker 30s linear infinite',
            willChange: 'transform',
          }}
        >
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              style={{ padding: '0 36px', fontFamily: 'var(--v-mono)', fontSize: 13, letterSpacing: '.22em', fontWeight: 600 }}
            >
              {t} <span style={{ margin: '0 36px', opacity: 0.5 }}>✕</span>
            </span>
          ))}
        </div>
      </section>

      {/* PEN DEEP-DIVE ================================================== */}
      <section
        className="v-home-pendive"
        style={{ background: '#0a0a0a', color: '#fff', padding: '140px 56px 120px', position: 'relative', overflow: 'hidden' }}
      >
        <div className="v-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div
          className="v-home-pendive"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '8%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 140,
                height: 140,
                border: `1px solid ${ACCENT}`,
                borderRadius: 70,
                opacity: 0.35,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '4%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 200,
                height: 200,
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 100,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 260,
                height: 260,
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 130,
              }}
            />

            <PaintPen accent={ACCENT} glow />

            <div
              style={{
                position: 'absolute',
                top: 8,
                left: '18%',
                fontFamily: 'var(--v-mono)',
                fontSize: 9,
                letterSpacing: '.22em',
                color: ACCENT,
              }}
            >
              ◢ DUAL-MODE PROBE
              <br />
              <span style={{ color: 'rgba(255,255,255,.4)' }}>FE / NON-FE AUTO-DETECT</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: '42%',
                fontFamily: 'var(--v-mono)',
                fontSize: 9,
                letterSpacing: '.22em',
                color: ACCENT,
              }}
            >
              ◢ 1.3&quot; OLED
              <br />
              <span style={{ color: 'rgba(255,255,255,.4)' }}>0.1µm RESOLUTION</span>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '18%',
                right: '12%',
                fontFamily: 'var(--v-mono)',
                fontSize: 9,
                letterSpacing: '.22em',
                color: ACCENT,
                textAlign: 'right',
              }}
            >
              ◢ KNURLED GRIP
              <br />
              <span style={{ color: 'rgba(255,255,255,.4)' }}>BILLET ALUMINIUM</span>
            </div>
          </div>

          <div>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 14 }}>
              ◢ THE FLAGSHIP · VLC-PT-0001
            </div>
            <h2 className="v-display" style={{ fontSize: 'clamp(56px, 7vw, 110px)', margin: 0, lineHeight: 0.88 }}>
              Reads paint
              <br />
              <span
                style={{
                  fontFamily: 'var(--v-editorial)',
                  fontStyle: 'italic',
                  textTransform: 'none',
                  fontWeight: 400,
                }}
              >
                like a book.
              </span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--v-editorial)',
                fontStyle: 'italic',
                fontSize: 20,
                opacity: 0.8,
                lineHeight: 1.45,
                marginTop: 22,
                maxWidth: 520,
              }}
            >
              Press the probe to any panel. In 0.4 seconds, the OLED tells you the exact paint thickness in microns —
              and whether what you&apos;re looking at is original, repainted, filled, or hiding something worse.
            </p>

            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { n: '0.1', u: 'µm', l: 'RESOLUTION', d: 'Reads to one tenth of a micron — concours grade.' },
                { n: '0.4', u: 's', l: 'READ TIME', d: 'Touch the panel. Read the value. Move on.' },
                { n: '2', u: 'µm', l: 'ACCURACY', d: 'Calibrated against NIST-traceable standards.' },
                { n: '8', u: 'hr', l: 'BATTERY', d: 'Lithium pack — full audit in one go.' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    gap: 24,
                    alignItems: 'baseline',
                    padding: '18px 0',
                    borderTop: i === 0 ? '1px solid var(--v-line)' : 'none',
                    borderBottom: '1px solid var(--v-line)',
                  }}
                >
                  <div>
                    <span className="v-display" style={{ fontSize: 48, color: ACCENT, lineHeight: 1 }}>
                      {s.n}
                    </span>
                    <span style={{ fontFamily: 'var(--v-mono)', fontSize: 14, opacity: 0.55, marginLeft: 4 }}>{s.u}</span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--v-mono)',
                        fontSize: 10,
                        letterSpacing: '.22em',
                        opacity: 0.55,
                        marginBottom: 4,
                      }}
                    >
                      {s.l}
                    </div>
                    <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.4 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="v-home-pendive-cta" style={{ marginTop: 36, display: 'flex', gap: 12 }}>
              <Link href={`/product/${HERO_PRODUCT_ID}`} className="v-btn">
                Inspect the Pen · €690{' '}
                <span className="arr">
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
              <Link href="/shop" className="v-btn v-btn--ghost">
                The Full Toolkit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT FINDS — three-panel diagnostic ========================== */}
      <section className="v-pad-section" style={{ background: '#fff', color: 'var(--v-ink)', padding: '120px 56px', position: 'relative' }}>
        <RevealOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 14 }}>
              ◢ WHAT THE PEN FINDS
            </div>
            <h2 className="v-display" style={{ fontSize: 'clamp(56px, 7vw, 110px)', margin: 0, lineHeight: 0.9 }}>
              Three reads.
              <br />
              Three verdicts.
            </h2>
          </div>
        </RevealOnScroll>

        <div className="v-home-diagnostic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { n: 124, v: 'ORIGINAL', c: '#1a8a3a', d: 'Factory paint, never touched. Confirmed OEM thickness ± 8µm.', range: '80–160µm' },
            { n: 318, v: 'REPAINTED', c: '#c9952b', d: 'A respray over the original — common after a scratch repair.', range: '200–400µm' },
            { n: 720, v: 'FILLER FOUND', c: '#c1121f', d: 'Body filler beneath the paint. There was metal damage.', range: '> 500µm' },
          ].map((card, i) => (
            <RevealOnScroll key={i} delay={i * 150}>
              <div
                style={{
                  background: '#0a0a0a',
                  color: '#fff',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderTop: `3px solid ${card.c}`,
                }}
              >
                <div style={{ padding: '18px 16px', background: '#000', border: `1px solid ${card.c}`, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.22em', color: card.c }}>
                      READING {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.22em', opacity: 0.5 }}>
                      µm · FE
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--v-mono)',
                      fontSize: 48,
                      fontWeight: 700,
                      color: '#fff',
                      lineHeight: 1,
                      marginTop: 8,
                      letterSpacing: '.04em',
                    }}
                  >
                    <CountUp to={card.n} duration={1400 + i * 250} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--v-mono)',
                      fontSize: 9,
                      letterSpacing: '.22em',
                      color: 'rgba(255,255,255,.45)',
                      marginTop: 6,
                    }}
                  >
                    RANGE · {card.range}
                  </div>
                  <div style={{ marginTop: 10, height: 3, background: '#1a1a1a', position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${Math.min(100, (card.n / 1000) * 100)}%`,
                        background: card.c,
                        transition: 'width .6s var(--v-ease-out)',
                      }}
                    />
                  </div>
                </div>
                <div className="v-display" style={{ fontSize: 32, lineHeight: 1, color: card.c }}>
                  {card.v}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.7, marginTop: 12 }}>{card.d}</p>
                <div
                  style={{
                    marginTop: 24,
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.22em',
                    opacity: 0.5,
                  }}
                >
                  {i + 1} / 03
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* COLLECTIONS GRID ================================================ */}
      <section className="v-pad-section" style={{ background: '#0a0a0a', color: '#fff', padding: '120px 56px' }}>
        <div
          className="v-home-section-head"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 64,
          }}
        >
          <div>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 14 }}>
              ◢ FIVE LINES
            </div>
            <h2
              className="v-display"
              style={{ fontSize: 'clamp(56px, 7vw, 110px)', margin: 0, letterSpacing: '-.005em' }}
            >
              The Catalogue
            </h2>
          </div>
          <Link
            href="/shop"
            style={{
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              borderBottom: '1px solid #fff',
              paddingBottom: 6,
            }}
          >
            All categories <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="v-home-categories-grid v-grid-5-tablet" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--v-line)' }}>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/shop?cat=${c.id}`}
              style={{
                background: '#0a0a0a',
                color: '#fff',
                padding: '40px 24px 28px',
                textAlign: 'left',
                position: 'relative',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background .3s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--v-mono)', fontSize: 11, letterSpacing: '.2em', color: ACCENT }}>
                  {c.code} /
                </span>
                <span style={{ fontFamily: 'var(--v-mono)', fontSize: 11, opacity: 0.5 }}>{c.count} ITEMS</span>
              </div>
              <div>
                <div className="v-display" style={{ fontSize: 48, lineHeight: 0.9, marginBottom: 10 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 13, opacity: 0.6, fontFamily: 'var(--v-sans)' }}>{c.blurb}</div>
                <div
                  style={{
                    marginTop: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Explore <Icon name="arrow" size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ========================================================= */}
      <section className="v-pad-section" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)', padding: '120px 56px' }}>
        <div
          className="v-home-section-head"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
          }}
        >
          <div>
            <div className="v-eyebrow" style={{ color: 'var(--v-red)', marginBottom: 14 }}>
              ◢ DROPS · WEEK 19
            </div>
            <h2 className="v-display" style={{ fontSize: 'clamp(56px, 7vw, 110px)', margin: 0 }}>
              New Arrivals
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
            }}
          >
            <button>← Prev</button>
            <span>02 / 06</span>
            <button>Next →</button>
          </div>
        </div>

        <div className="v-home-featured-grid v-grid-3-tablet" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {FEATURED.map((id) => {
            const p = PRODUCTS.find((x) => x.id === id)!;
            return <ProductCard key={p.id} p={p} style="minimal" />;
          })}
        </div>
      </section>

      {/* MANIFESTO ====================================================== */}
      <section
        className="v-home-manifesto"
        style={{
          background: '#000',
          color: '#fff',
          padding: '160px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="v-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: -40,
            fontFamily: 'var(--v-display)',
            fontSize: 560,
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,.07)',
            pointerEvents: 'none',
          }}
        >
          07
        </div>

        <div
          className="v-home-manifesto"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          <div>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 18 }}>
              ◢ THE MANIFESTO
            </div>
            <h2 className="v-display" style={{ fontSize: 'clamp(56px, 7vw, 120px)', margin: 0, lineHeight: 0.9 }}>
              We don&apos;t make
              <br />
              <span style={{ color: ACCENT }}>parts.</span>
            </h2>
            <h2
              className="v-display"
              style={{ fontSize: 'clamp(56px, 7vw, 120px)', margin: '8px 0 0', lineHeight: 0.9, opacity: 0.7 }}
            >
              We make
              <br />
              <span style={{ fontFamily: 'var(--v-editorial)', fontStyle: 'italic', textTransform: 'none' }}>
                obsessions.
              </span>
            </h2>
          </div>
          <div style={{ paddingTop: 80, display: 'flex', flexDirection: 'column', gap: 40 }}>
            <p
              style={{
                fontFamily: 'var(--v-editorial)',
                fontStyle: 'italic',
                fontSize: 22,
                lineHeight: 1.45,
                margin: 0,
                opacity: 0.9,
              }}
            >
              Every wing tested in our 32m wind tunnel. Every carbon weave pulled at 600° and 1,200 bar. Every stitch
              placed by hand in our Milano atelier.
            </p>
            <div
              className="v-home-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 32,
                borderTop: '1px solid var(--v-line)',
                paddingTop: 32,
              }}
            >
              {[
                { n: 8, s: '+', l: 'Y E A R S', v: 'Founded 2019', d: 0 },
                { n: 47, s: '', l: 'C O U N T R I E S', v: 'Direct ship', d: 1 },
                { n: 12, s: 'K', l: 'D R I V E R S', v: 'Owners club', d: 2 },
              ].map((stat) => (
                <RevealOnScroll key={stat.l} delay={stat.d * 120}>
                  <div className="v-display" style={{ fontSize: 54, color: ACCENT, lineHeight: 1 }}>
                    <CountUp to={stat.n} duration={1400 + stat.d * 200} />
                    {stat.s}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--v-mono)',
                      fontSize: 10,
                      letterSpacing: '.3em',
                      opacity: 0.5,
                      marginTop: 6,
                    }}
                  >
                    {stat.l}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{stat.v}</div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL SPLIT ================================================ */}
      <section
        className="v-home-atelier"
        style={{
          background: 'var(--v-paper)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 560,
        }}
      >
        <div
          className="v-home-atelier-text"
          style={{
            padding: '80px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
            color: 'var(--v-ink)',
          }}
        >
          <div className="v-eyebrow" style={{ color: ACCENT }}>
            ◢ ATELIER VISIT
          </div>
          <h2 className="v-display" style={{ fontSize: 'clamp(48px, 6vw, 96px)', margin: 0, lineHeight: 0.95 }}>
            Inside the
            <br />
            Veloce
            <br />
            workshop
          </h2>
          <p
            style={{
              fontFamily: 'var(--v-editorial)',
              fontStyle: 'italic',
              fontSize: 18,
              opacity: 0.75,
              maxWidth: 480,
              margin: 0,
            }}
          >
            Twelve craftsmen. Six autoclaves. One obsession: a tighter tolerance than the factory will ever ship.
          </p>
          <button className="v-btn" style={{ alignSelf: 'flex-start', marginTop: 16 }}>
            Read the story{' '}
            <span className="arr">
              <Icon name="arrow" size={16} />
            </span>
          </button>
        </div>
        <div style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 30% 40%, rgba(193,18,31,.35) 0%, transparent 50%)',
            }}
          />
          <svg viewBox="0 0 600 560" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="ws" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1a1a1a" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
            </defs>
            <rect width="600" height="560" fill="url(#ws)" />
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={'h' + i} x1="0" y1={420 + i * 10} x2="600" y2={420 + i * 10} stroke="#222" strokeWidth=".5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={'v' + i} x1={i * 30} y1="420" x2={i * 30} y2="560" stroke="#222" strokeWidth=".5" />
            ))}
            <line x1="300" y1="0" x2="300" y2="100" stroke="#444" />
            <circle cx="300" cy="105" r="14" fill="#fff8d8" />
            <ellipse cx="300" cy="420" rx="220" ry="40" fill="rgba(255,248,216,.07)" />
            <g transform="translate(70, 300) scale(.38)">
              <path
                d="M 200 250 L 290 195 L 420 158 L 580 138 L 700 138 L 800 158 L 880 195 L 980 230 L 1020 250 Z"
                fill="#0a0a0a"
                stroke="#333"
              />
              <path d="M 380 198 L 460 152 L 690 145 L 800 178 L 840 198 Z" fill="#1a1a1a" />
              <path d="M 260 232 L 990 232" stroke="#c1121f" strokeWidth="3" />
              <circle cx="235" cy="290" r="48" fill="#000" stroke="#444" />
              <circle cx="945" cy="290" r="48" fill="#000" stroke="#444" />
            </g>
            <rect x="120" y="395" width="14" height="25" fill="#222" />
            <rect x="430" y="395" width="14" height="25" fill="#222" />
            <rect x="490" y="350" width="80" height="80" fill="#0f0f0f" stroke="#c1121f" strokeWidth="1.5" />
            <line x1="490" y1="375" x2="570" y2="375" stroke="#c1121f" />
            <line x1="490" y1="400" x2="570" y2="400" stroke="#c1121f" />
            <line x1="200" y1="0" x2="200" y2="80" stroke="#444" />
            <line x1="400" y1="0" x2="400" y2="80" stroke="#444" />
            <path d="M 180 80 L 420 70 L 420 90 L 180 100 Z" fill="#0a0a0a" stroke="#c1121f" />
          </svg>
        </div>
      </section>

      {/* SUPPORT / TRUST ROW ============================================== */}
      <section
        style={{
          background: '#070707',
          color: '#fff',
          padding: '48px 56px',
          borderTop: '1px solid var(--v-line)',
          borderBottom: '1px solid var(--v-line)',
        }}
      >
        <div className="v-home-trust v-grid-4-tablet" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { ic: 'truck', h: 'Worldwide shipping', s: 'Direct to 47 countries · DHL Express' },
            { ic: 'shield', h: 'Fitment guarantee', s: 'Designed for your spec · or full refund' },
            { ic: 'flame', h: 'Track-tested', s: 'Validated at Vairano & Monza circuits' },
            { ic: 'cog', h: 'Pit-crew support', s: 'Mechanics on chat · 24/7 in 4 languages' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '4px 0' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  border: '1px solid var(--v-red)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  color: 'var(--v-red)',
                }}
              >
                <Icon name={t.ic} size={20} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--v-display)', fontSize: 20, lineHeight: 1, marginBottom: 6 }}>{t.h}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>{t.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
