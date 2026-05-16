'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/data';
import { fmt } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { Badge } from './Icon';
import { ProductShape } from './Visuals';

const ACCENT = '#c1121f';

export function ProductCard({ p, style = 'minimal' }: { p: Product; style?: 'minimal' | 'editorial' | 'racing' }) {
  const { addToCart } = useCart();
  const [hover, setHover] = useState(false);

  if (style === 'editorial') {
    return (
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: '#fff',
          border: '1px solid var(--v-paper-3)',
          cursor: 'default',
          position: 'relative',
          transition: 'transform .3s var(--v-ease-out)',
          transform: hover ? 'translateY(-4px)' : 'none',
        }}
      >
        <Link href={`/product/${p.id}`} style={{ display: 'block' }}>
          <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
            <ProductShape shape={p.shape} accent={p.accent} size={360} />
            {p.badge && (
              <div style={{ position: 'absolute', top: 14, left: 14 }}>
                <Badge>{p.badge}</Badge>
              </div>
            )}
          </div>
          <div style={{ padding: 24, borderTop: '1px solid var(--v-paper-3)' }}>
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 10,
                letterSpacing: '.22em',
                color: 'var(--v-fg-2)',
                marginBottom: 8,
              }}
            >
              {p.sku} · {p.line.toUpperCase()}
            </div>
            <h3
              style={{
                fontFamily: 'var(--v-editorial)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 22,
                margin: '0 0 12px',
                lineHeight: 1.2,
                color: 'var(--v-ink)',
              }}
            >
              {p.name}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--v-mono)', fontSize: 18, fontWeight: 600, color: 'var(--v-ink)' }}>
                {fmt(p.price)}
              </span>
              <span
                style={{
                  fontFamily: 'var(--v-mono)',
                  fontSize: 10,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                }}
              >
                View →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (style === 'racing') {
    return (
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ background: '#0a0a0a', color: '#fff', cursor: 'default', position: 'relative', transition: 'transform .3s' }}
      >
        <Link href={`/product/${p.id}`} style={{ display: 'block' }}>
          <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', borderBottom: `2px solid ${ACCENT}` }}>
            <ProductShape shape={p.shape} accent={ACCENT} size={360} />
            {p.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  padding: '6px 12px',
                  background: ACCENT,
                  color: '#fff',
                  fontFamily: 'var(--v-mono)',
                  fontSize: 10,
                  letterSpacing: '.22em',
                  fontWeight: 600,
                }}
              >
                {p.badge}
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                fontFamily: 'var(--v-mono)',
                fontSize: 10,
                letterSpacing: '.18em',
                opacity: 0.6,
              }}
            >
              N° {p.id.slice(1)}
            </div>
          </div>
        </Link>
        <div style={{ padding: '20px 18px' }}>
          <div
            style={{
              fontFamily: 'var(--v-mono)',
              fontSize: 10,
              letterSpacing: '.22em',
              color: ACCENT,
              marginBottom: 8,
            }}
          >
            {p.line.toUpperCase()}
          </div>
          <h3 className="v-display" style={{ fontSize: 22, margin: '0 0 12px' }}>
            {p.name}
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid var(--v-line)',
            }}
          >
            <span style={{ fontFamily: 'var(--v-mono)', fontSize: 16, fontWeight: 600 }}>{fmt(p.price)}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(p, 1);
              }}
              style={{
                padding: '8px 14px',
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
        </div>
      </article>
    );
  }

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: '#fff', cursor: 'default', position: 'relative', transition: 'all .3s' }}
    >
      <Link href={`/product/${p.id}`} style={{ display: 'block' }}>
        <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#0a0a0a' }}>
          <div
            style={{
              transition: 'transform .6s var(--v-ease-out)',
              transform: hover ? 'scale(1.04)' : 'scale(1)',
              height: '100%',
            }}
          >
            <ProductShape shape={p.shape} accent={p.accent} size={360} />
          </div>
          {p.badge && (
            <div style={{ position: 'absolute', top: 14, left: 14 }}>
              <Badge color="#fff" dark>
                {p.badge}
              </Badge>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              fontFamily: 'var(--v-mono)',
              fontSize: 10,
              letterSpacing: '.2em',
              color: 'rgba(255,255,255,.55)',
            }}
          >
            {p.sku}
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: 18,
              background: 'linear-gradient(to top, rgba(0,0,0,.85), transparent 60%)',
              opacity: hover ? 1 : 0,
              transition: 'opacity .3s',
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(p, 1);
              }}
              style={{
                flex: 1,
                padding: '14px',
                background: '#fff',
                color: 'var(--v-ink)',
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.22em',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              QUICK ADD · {fmt(p.price)}
            </button>
          </div>
        </div>
        <div
          style={{
            padding: '18px 4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            color: 'var(--v-ink)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 10,
                letterSpacing: '.2em',
                color: 'var(--v-fg-2)',
                marginBottom: 4,
              }}
            >
              {p.line.toUpperCase()}
            </div>
            <h3
              style={{
                fontFamily: 'var(--v-display)',
                fontWeight: 400,
                fontSize: 20,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '.01em',
              }}
            >
              {p.name}
            </h3>
          </div>
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
            <div
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 16,
                fontWeight: 600,
                color: p.oldPrice ? ACCENT : 'var(--v-ink)',
              }}
            >
              {fmt(p.price)}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
