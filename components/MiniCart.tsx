'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { fmt } from '@/lib/data';
import { Icon } from './Icon';
import { ProductShape } from './Visuals';

const ACCENT = '#c1121f';

export function MiniCart() {
  const { miniOpen, setMiniOpen, cart, subtotal } = useCart();
  if (!miniOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, animation: 'v-fade .25s' }}>
      <div onClick={() => setMiniOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)' }} />
      <div
        className="v-minicart-drawer"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 420,
          maxWidth: '100%',
          background: 'var(--v-paper)',
          color: 'var(--v-ink)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,.4)',
        }}
      >
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--v-paper-3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 4 }}>
              ◢ IN THE PIT
            </div>
            <div style={{ fontFamily: 'var(--v-display)', fontSize: 24 }}>YOUR BAG · {cart.length}</div>
          </div>
          <button onClick={() => setMiniOpen(false)} style={{ padding: 8 }} aria-label="Close cart">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px' }}>
          {cart.length === 0 && (
            <div
              style={{
                padding: '40px 0',
                textAlign: 'center',
                fontFamily: 'var(--v-editorial)',
                fontStyle: 'italic',
                opacity: 0.6,
              }}
            >
              Bag is empty. Pit&apos;s quiet.
            </div>
          )}
          {cart.map((it) => (
            <div
              key={it.id + it.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                gap: 14,
                padding: '14px 0',
                borderBottom: '1px solid var(--v-paper-3)',
              }}
            >
              <div style={{ width: 72, height: 72, background: '#0a0a0a' }}>
                <ProductShape shape={it.shape} accent={it.accent} size={72} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--v-mono)', fontSize: 9, letterSpacing: '.22em', opacity: 0.55 }}>{it.sku}</div>
                <div
                  style={{
                    fontFamily: 'var(--v-display)',
                    fontSize: 16,
                    lineHeight: 1.1,
                    margin: '4px 0 6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {it.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--v-mono)', fontSize: 11, opacity: 0.6 }}>QTY {it.qty}</span>
                  <span style={{ fontFamily: 'var(--v-mono)', fontSize: 14, fontWeight: 600 }}>{fmt(it.price * it.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: 28, borderTop: '1px solid var(--v-paper-3)', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span
              style={{
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                opacity: 0.55,
              }}
            >
              Subtotal
            </span>
            <span style={{ fontFamily: 'var(--v-mono)', fontSize: 18, fontWeight: 600 }}>{fmt(subtotal)}</span>
          </div>
          <Link
            href="/cart"
            onClick={() => setMiniOpen(false)}
            className="v-btn"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            View Bag{' '}
            <span className="arr">
              <Icon name="arrow" size={16} />
            </span>
          </Link>
          <Link
            href="/checkout"
            onClick={() => setMiniOpen(false)}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px',
              marginTop: 8,
              border: '1px solid var(--v-ink)',
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              background: 'transparent',
              textAlign: 'center',
              color: 'var(--v-ink)',
            }}
          >
            Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FlashToast() {
  const { flash, setMiniOpen, setFlash } = useCart();
  if (!flash) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 80,
        background: 'var(--v-ink)',
        color: '#fff',
        padding: '14px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        border: `1px solid ${ACCENT}`,
        boxShadow: '0 8px 30px rgba(0,0,0,.4)',
        fontFamily: 'var(--v-mono)',
        fontSize: 11,
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        animation: 'v-fadeup .35s var(--v-ease-out)',
      }}
    >
      <span style={{ width: 8, height: 8, background: ACCENT, animation: 'v-pulse 1.4s infinite' }} />
      {flash}
      <button
        onClick={() => {
          setMiniOpen(true);
          setFlash(null);
        }}
        style={{ marginLeft: 8, color: ACCENT }}
      >
        OPEN BAG →
      </button>
    </div>
  );
}
