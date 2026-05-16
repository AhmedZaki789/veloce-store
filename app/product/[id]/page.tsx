'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, use } from 'react';
import { CATEGORIES, PRODUCTS, fmt } from '@/lib/data';
import { Badge, Icon } from '@/components/Icon';
import { ProductShape } from '@/components/Visuals';
import { ProductCard } from '@/components/ProductCard';
import { CountUp, RevealOnScroll } from '@/components/Effects';
import { useCart } from '@/lib/cart-context';

const ACCENT = '#c1121f';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'specs' | 'fitment' | 'warranty'>('specs');
  const [viewIdx, setViewIdx] = useState(0);

  const variants = useMemo(
    () => [
      { name: 'Standard', suffix: '', delta: 0, badge: null },
      { name: 'Race-Spec', suffix: ' · RACE', delta: 580, badge: 'TRACK' },
      { name: 'Heritage', suffix: ' · 07', delta: 220, badge: 'LIMITED' },
    ],
    [],
  );

  const finalPrice = p.price + (variants[variant]?.delta || 0);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <main className="v-screen" style={{ background: '#0a0a0a', color: '#fff' }}>
      <div
        className="v-breadcrumbs"
        style={{
          padding: '24px 56px',
          borderBottom: '1px solid var(--v-line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--v-mono)',
          fontSize: 11,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}
      >
        <div style={{ display: 'flex', gap: 14 }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <Link href={`/shop?cat=${p.cat}`}>{CATEGORIES.find((c) => c.id === p.cat)?.name}</Link>
          <span>/</span>
          <span style={{ color: ACCENT }}>{p.name}</span>
        </div>
        <span>{p.sku}</span>
      </div>

      <section className="v-product-main" style={{ display: 'grid', gridTemplateColumns: '1fr 480px', minHeight: 'calc(100vh - 96px - 49px)' }}>
        <div className="v-product-gallery" style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((c) => {
            const st: React.CSSProperties = { position: 'absolute', width: 32, height: 32, border: '1px solid rgba(255,255,255,.3)' };
            if (c.includes('top')) st.top = 20;
            else st.bottom = 20;
            if (c.includes('left')) st.left = 20;
            else st.right = 20;
            return <div key={c} style={st} />;
          })}

          <div
            style={{
              position: 'absolute',
              top: 32,
              left: 48,
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.22em',
              opacity: 0.6,
            }}
          >
            VIEW {String(viewIdx + 1).padStart(2, '0')} / 04
          </div>
          <div
            style={{
              position: 'absolute',
              top: 32,
              right: 48,
              textAlign: 'right',
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.18em',
              opacity: 0.7,
            }}
          >
            <div style={{ color: ACCENT }}>● LIVE STOCK</div>
            <div style={{ opacity: 0.5 }}>14 IN MILANO</div>
            <div style={{ opacity: 0.5 }}>SHIPS IN 48H</div>
          </div>

          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 'min(80%, 620px)', aspectRatio: '1' }}>
              <ProductShape shape={p.shape} accent={ACCENT} />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--v-display)',
              fontSize: 'min(40vw, 460px)',
              lineHeight: 0.85,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,.05)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {p.id.slice(1)}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 10,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setViewIdx(i)}
                style={{
                  width: 64,
                  height: 64,
                  background: '#0f0f0f',
                  border: viewIdx === i ? `2px solid ${ACCENT}` : '1px solid var(--v-line)',
                  opacity: viewIdx === i ? 1 : 0.55,
                  padding: 6,
                }}
              >
                <div style={{ transform: `rotate(${i * 40}deg)`, width: '100%', height: '100%' }}>
                  <ProductShape shape={p.shape} accent={ACCENT} />
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setViewIdx((viewIdx + 3) % 4)}
            style={{
              position: 'absolute',
              left: 32,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 48,
              height: 48,
              border: '1px solid rgba(255,255,255,.3)',
              display: 'grid',
              placeItems: 'center',
            }}
            aria-label="Previous view"
          >
            <span style={{ transform: 'rotate(180deg)', display: 'flex' }}>
              <Icon name="arrow" size={18} />
            </span>
          </button>
          <button
            onClick={() => setViewIdx((viewIdx + 1) % 4)}
            style={{
              position: 'absolute',
              right: 32,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 48,
              height: 48,
              border: '1px solid rgba(255,255,255,.3)',
              display: 'grid',
              placeItems: 'center',
            }}
            aria-label="Next view"
          >
            <Icon name="arrow" size={18} />
          </button>
        </div>

        <div
          className="v-product-purchase"
          style={{
            background: '#0a0a0a',
            borderLeft: '1px solid var(--v-line)',
            padding: '40px 40px 32px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {p.badge && <Badge>{p.badge}</Badge>}

          <div
            style={{
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.22em',
              color: ACCENT,
              marginTop: 18,
              marginBottom: 8,
            }}
          >
            {p.line.toUpperCase()}
          </div>
          <h1 className="v-display" style={{ fontSize: 46, lineHeight: 0.95, margin: 0 }}>
            {p.name}
            {variants[variant].suffix}
          </h1>

          <p
            style={{
              fontFamily: 'var(--v-editorial)',
              fontStyle: 'italic',
              fontSize: 17,
              opacity: 0.75,
              lineHeight: 1.45,
              marginTop: 18,
            }}
          >
            Pulled from the wind tunnel at 1,200 bar. Cured at 180°. Hand-finished in Milano. Bolt it on, then drive
            faster than you should.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 14,
              marginTop: 24,
              paddingBottom: 24,
              borderBottom: '1px solid var(--v-line)',
            }}
          >
            <span style={{ fontFamily: 'var(--v-mono)', fontSize: 36, fontWeight: 600 }}>{fmt(finalPrice)}</span>
            {p.oldPrice && (
              <span style={{ fontFamily: 'var(--v-mono)', fontSize: 16, textDecoration: 'line-through', opacity: 0.4 }}>
                {fmt(p.oldPrice)}
              </span>
            )}
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--v-mono)',
                fontSize: 10,
                letterSpacing: '.2em',
                opacity: 0.5,
              }}
            >
              VAT INC.
            </span>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span className="v-eyebrow" style={{ opacity: 0.7 }}>
                ◢ SPEC
              </span>
              <span style={{ fontFamily: 'var(--v-mono)', fontSize: 11, opacity: 0.6 }}>{variants[variant].name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setVariant(i)}
                  style={{
                    padding: '14px 8px',
                    textAlign: 'center',
                    position: 'relative',
                    background: variant === i ? ACCENT : 'transparent',
                    border: variant === i ? `1px solid ${ACCENT}` : '1px solid var(--v-line)',
                    color: '#fff',
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.16em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {v.name}
                  {v.delta !== 0 && <div style={{ fontSize: 9, opacity: 0.85, marginTop: 3 }}>+{fmt(v.delta)}</div>}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="v-eyebrow" style={{ opacity: 0.7, marginBottom: 12 }}>
              ◢ FITMENT CHECK
            </div>
            <select
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: '1px solid var(--v-line)',
                color: '#fff',
                fontFamily: 'var(--v-sans)',
                fontSize: 14,
              }}
            >
              <option>Select your vehicle…</option>
              <option>Ferrari 488 Pista (2019)</option>
              <option>McLaren 765LT (2021)</option>
              <option>Porsche 911 GT3 RS (992)</option>
              <option>Lamborghini Huracán STO</option>
            </select>
          </div>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--v-line)' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '0 14px', height: 54 }} aria-label="Decrease">
                <Icon name="minus" size={14} />
              </button>
              <span
                style={{
                  fontFamily: 'var(--v-mono)',
                  fontSize: 16,
                  fontWeight: 600,
                  padding: '0 14px',
                  minWidth: 30,
                  textAlign: 'center',
                }}
              >
                {qty}
              </span>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '0 14px', height: 54 }} aria-label="Increase">
                <Icon name="plus" size={14} />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart({ ...p, name: p.name + variants[variant].suffix, price: finalPrice }, qty);
                router.push('/cart');
              }}
              className="v-btn"
              style={{ justifyContent: 'center' }}
            >
              Add to Cart{' '}
              <span className="arr">
                <Icon name="arrow" size={16} />
              </span>
            </button>
          </div>

          <button
            style={{
              marginTop: 10,
              padding: '18px',
              border: '1px solid var(--v-line)',
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#fff',
              background: 'transparent',
            }}
          >
            Reserve in showroom →
          </button>

          <div style={{ marginTop: 32, borderTop: '1px solid var(--v-line)', paddingTop: 24 }}>
            <div style={{ display: 'flex', gap: 18, marginBottom: 18 }}>
              {(['specs', 'fitment', 'warranty'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    paddingBottom: 8,
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderBottom: tab === t ? `2px solid ${ACCENT}` : '2px solid transparent',
                    color: tab === t ? '#fff' : 'rgba(255,255,255,.5)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.75 }}>
              {tab === 'specs' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      ['Material', p.material],
                      ['Fitment', p.fit],
                      ['Weight', '2.4 kg'],
                      ['Origin', 'Milano, IT'],
                      ['Cure cycle', '180°C · 4hr autoclave'],
                      ['Tested at', 'Vairano · Monza'],
                    ].map((r) => (
                      <tr key={r[0]} style={{ borderBottom: '1px solid var(--v-line)' }}>
                        <td
                          style={{
                            padding: '10px 0',
                            opacity: 0.55,
                            fontFamily: 'var(--v-mono)',
                            fontSize: 11,
                            letterSpacing: '.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {r[0]}
                        </td>
                        <td style={{ padding: '10px 0', textAlign: 'right' }}>{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === 'fitment' && (
                <p style={{ margin: 0 }}>
                  Designed in CAD against scanned OEM bodies. Where bolt-on is impossible we ship the bracketry.
                  Professional install required for aero pieces.
                </p>
              )}
              {tab === 'warranty' && (
                <p style={{ margin: 0 }}>
                  5-year structural warranty on carbon. 12 months on coatings. Track use covered when fitted by a
                  VELOCE-certified shop — see map.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="v-pad-section-sm"
        style={{
          background: 'var(--v-red)',
          color: '#fff',
          padding: '32px 56px',
          borderTop: '1px solid #fff',
          borderBottom: '1px solid #fff',
        }}
      >
        <div className="v-home-stats-grid v-grid-5-tablet" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
          {[
            { n: 1200, s: '', l: 'BAR PRESSURE' },
            { n: 180, s: '°', l: 'CURE' },
            { n: 2.4, s: '', l: 'KG WEIGHT', dec: 1 },
            { n: 24, s: '%', l: '+ DOWNFORCE', pre: '+' },
            { n: 5, s: ' YR', l: 'WARRANTY' },
          ].map((s, i) => (
            <RevealOnScroll key={s.l} delay={i * 100}>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,.3)', paddingLeft: 18 }}>
                <div className="v-display" style={{ fontSize: 48, lineHeight: 1 }}>
                  {s.pre || ''}
                  <CountUp to={s.n} decimals={s.dec || 0} duration={1300 + i * 120} />
                  {s.s}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.22em',
                    opacity: 0.85,
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="v-pad-section" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)', padding: '80px 56px' }}>
        <div className="v-home-section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <h2 className="v-display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: 0 }}>
            Pairs Well With
          </h2>
          <Link
            href={`/shop?cat=${p.cat}`}
            style={{
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--v-ink)',
              paddingBottom: 4,
            }}
          >
            View all →
          </Link>
        </div>
        <div className="v-shop-grid v-grid-4-tablet" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {related.map((r) => (
            <ProductCard key={r.id} p={r} style="minimal" />
          ))}
        </div>
      </section>
    </main>
  );
}
