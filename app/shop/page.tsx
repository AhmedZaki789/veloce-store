'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, PRODUCTS, fmt } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { ProductShape } from '@/components/Visuals';
import { useCart } from '@/lib/cart-context';

const ACCENT = '#c1121f';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [cat, setCat] = useState(initialCat);
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const { addToCart } = useCart();

  useEffect(() => {
    setCat(searchParams.get('cat') || 'all');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let arr = PRODUCTS.slice();
    if (cat !== 'all') arr = arr.filter((p) => p.cat === cat);
    arr = arr.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);
    if (sort === 'newest') arr.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
    return arr;
  }, [cat, sort, priceRange]);

  const activeCat = CATEGORIES.find((c) => c.id === cat);

  return (
    <main className="v-screen" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)' }}>
      <section
        style={{
          background: '#0a0a0a',
          color: '#fff',
          padding: '80px 56px 64px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `2px solid ${ACCENT}`,
        }}
      >
        <div className="v-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 18,
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.22em',
                opacity: 0.6,
              }}
            >
              <Link href="/">HOME</Link>
              <span>/</span>
              <span>SHOP</span>
              {activeCat && (
                <>
                  <span>/</span>
                  <span style={{ color: ACCENT }}>{activeCat.name.toUpperCase()}</span>
                </>
              )}
            </div>
            <h1 className="v-display" style={{ fontSize: 'clamp(70px, 10vw, 160px)', margin: 0, lineHeight: 0.85 }}>
              {activeCat ? (
                activeCat.name.toUpperCase()
              ) : (
                <>
                  The
                  <br />
                  Catalogue
                </>
              )}
            </h1>
            {activeCat && (
              <p style={{ fontFamily: 'var(--v-editorial)', fontStyle: 'italic', fontSize: 20, opacity: 0.7, marginTop: 16 }}>
                {activeCat.blurb}
              </p>
            )}
          </div>
          <div
            style={{
              textAlign: 'right',
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.2em',
              opacity: 0.6,
            }}
          >
            <div style={{ fontSize: 48, color: ACCENT, fontFamily: 'var(--v-display)', lineHeight: 1 }}>
              {String(filtered.length).padStart(3, '0')}
            </div>
            <div>RESULTS</div>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0 }}>
        <aside
          style={{
            background: '#fff',
            borderRight: '1px solid var(--v-paper-3)',
            padding: '40px 28px',
            minHeight: '80vh',
          }}
        >
          <div className="v-eyebrow" style={{ marginBottom: 18, color: 'var(--v-red)' }}>
            ◢ FILTERS
          </div>

          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                marginBottom: 14,
                opacity: 0.7,
              }}
            >
              Category
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FilterRow
                label="All categories"
                count={PRODUCTS.length}
                active={cat === 'all'}
                onClick={() => setCat('all')}
              />
              {CATEGORIES.map((c) => (
                <FilterRow
                  key={c.id}
                  label={c.name}
                  count={PRODUCTS.filter((p) => p.cat === c.id).length}
                  active={cat === c.id}
                  onClick={() => setCat(c.id)}
                />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                marginBottom: 14,
                opacity: 0.7,
              }}
            >
              Price · €{priceRange[0]} — €{priceRange[1]}
            </div>
            <input
              type="range"
              min={0}
              max={8000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, +e.target.value])}
              style={{ width: '100%', accentColor: ACCENT }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--v-mono)',
                fontSize: 10,
                opacity: 0.5,
                marginTop: 4,
              }}
            >
              <span>€0</span>
              <span>€8,000</span>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                marginBottom: 14,
                opacity: 0.7,
              }}
            >
              Material
            </div>
            {['Carbon Fibre', 'Forged Carbon', 'Alcantara', 'Titanium', 'Aluminium', 'Leather'].map((m) => (
              <label
                key={m}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', fontSize: 13, cursor: 'default' }}
              >
                <span style={{ width: 14, height: 14, border: '1.5px solid var(--v-ink)', display: 'grid', placeItems: 'center' }} />
                {m}
              </label>
            ))}
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                marginBottom: 14,
                opacity: 0.7,
              }}
            >
              Use
            </div>
            {['Road', 'Track', 'Concours', 'Daily'].map((u) => (
              <label
                key={u}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', fontSize: 13, cursor: 'default' }}
              >
                <span style={{ width: 14, height: 14, border: '1.5px solid var(--v-ink)', display: 'grid', placeItems: 'center' }} />
                {u}
              </label>
            ))}
          </div>
        </aside>

        <div style={{ padding: '32px 40px 80px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--v-paper-3)',
              paddingBottom: 18,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Showing{' '}
              <span style={{ color: 'var(--v-ink)', fontWeight: 600 }}>{filtered.length}</span> of {PRODUCTS.length}
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--v-paper-3)' }}>
                <button
                  onClick={() => setView('grid')}
                  style={{
                    padding: '8px 12px',
                    background: view === 'grid' ? 'var(--v-ink)' : 'transparent',
                    color: view === 'grid' ? '#fff' : 'var(--v-ink)',
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.2em',
                  }}
                >
                  GRID
                </button>
                <button
                  onClick={() => setView('list')}
                  style={{
                    padding: '8px 12px',
                    background: view === 'list' ? 'var(--v-ink)' : 'transparent',
                    color: view === 'list' ? '#fff' : 'var(--v-ink)',
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.2em',
                  }}
                >
                  LIST
                </button>
              </div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--v-mono)',
                  fontSize: 11,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                }}
              >
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    padding: '8px 28px 8px 12px',
                    border: '1px solid var(--v-paper-3)',
                    background: '#fff',
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.16em',
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                </select>
              </label>
            </div>
          </div>

          {view === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} style="minimal" />
              ))}
              {filtered.length === 0 && (
                <div
                  style={{
                    gridColumn: '1/-1',
                    padding: 80,
                    textAlign: 'center',
                    opacity: 0.5,
                    fontFamily: 'var(--v-editorial)',
                    fontStyle: 'italic',
                    fontSize: 24,
                  }}
                >
                  Nothing in the pit lane matches that. Try widening the filter.
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                border: '1px solid var(--v-paper-3)',
                background: '#fff',
              }}
            >
              {filtered.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr auto auto',
                    gap: 24,
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--v-paper-3)',
                  }}
                >
                  <Link href={`/product/${p.id}`} style={{ width: 120, height: 120, background: '#0a0a0a' }}>
                    <ProductShape shape={p.shape} accent={p.accent} size={120} />
                  </Link>
                  <Link href={`/product/${p.id}`} style={{ color: 'inherit' }}>
                    <div
                      style={{
                        fontFamily: 'var(--v-mono)',
                        fontSize: 10,
                        letterSpacing: '.22em',
                        color: 'var(--v-fg-2)',
                        marginBottom: 6,
                      }}
                    >
                      {p.sku} · {p.line.toUpperCase()}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--v-display)',
                        fontWeight: 400,
                        fontSize: 22,
                        margin: 0,
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.name}
                    </h3>
                    <div style={{ fontFamily: 'var(--v-sans)', fontSize: 13, color: 'var(--v-fg-2)', marginTop: 6 }}>
                      {p.material} · {p.fit}
                    </div>
                  </Link>
                  <div style={{ textAlign: 'right' }}>
                    {p.oldPrice && (
                      <div
                        style={{
                          fontFamily: 'var(--v-mono)',
                          fontSize: 11,
                          textDecoration: 'line-through',
                          opacity: 0.4,
                        }}
                      >
                        {fmt(p.oldPrice)}
                      </div>
                    )}
                    <div style={{ fontFamily: 'var(--v-mono)', fontSize: 18, fontWeight: 600 }}>{fmt(p.price)}</div>
                  </div>
                  <button
                    onClick={() => addToCart(p, 1)}
                    style={{
                      padding: '12px 18px',
                      background: ACCENT,
                      color: '#fff',
                      fontFamily: 'var(--v-mono)',
                      fontSize: 10,
                      letterSpacing: '.22em',
                      fontWeight: 600,
                    }}
                  >
                    + ADD
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function FilterRow({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 12px',
        textAlign: 'left',
        background: active ? 'var(--v-ink)' : 'transparent',
        color: active ? '#fff' : 'var(--v-ink)',
        fontFamily: 'var(--v-sans)',
        fontSize: 14,
        fontWeight: 500,
        borderLeft: active ? `3px solid ${ACCENT}` : '3px solid transparent',
      }}
    >
      <span>{label}</span>
      <span style={{ fontFamily: 'var(--v-mono)', fontSize: 10, opacity: 0.5 }}>{String(count).padStart(2, '0')}</span>
    </button>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', background: 'var(--v-paper)' }} />}>
      <ShopContent />
    </Suspense>
  );
}
