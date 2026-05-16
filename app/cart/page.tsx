'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { fmt } from '@/lib/data';
import { Icon } from '@/components/Icon';
import { ProductShape } from '@/components/Visuals';

const ACCENT = '#c1121f';

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const shipping = subtotal > 250 ? 0 : 28;
  const tax = Math.round(subtotal * 0.22);
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <main className="v-screen" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)', minHeight: '80vh' }}>
        <section style={{ padding: '120px 56px', textAlign: 'center' }}>
          <div className="v-eyebrow" style={{ color: 'var(--v-red)', marginBottom: 18 }}>
            ◢ THE PIT IS EMPTY
          </div>
          <h1 className="v-display" style={{ fontSize: 'clamp(60px, 9vw, 140px)', margin: 0, lineHeight: 0.9 }}>
            Nothing
            <br />
            in the box.
          </h1>
          <p
            style={{
              fontFamily: 'var(--v-editorial)',
              fontStyle: 'italic',
              fontSize: 20,
              opacity: 0.65,
              marginTop: 24,
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Start with something fast. The catalogue is two clicks away.
          </p>
          <Link href="/shop" className="v-btn v-btn--lg" style={{ marginTop: 36 }}>
            Open the Catalogue{' '}
            <span className="arr">
              <Icon name="arrow" size={16} />
            </span>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="v-screen" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)' }}>
      <section
        style={{
          background: '#0a0a0a',
          color: '#fff',
          padding: '56px 56px 48px',
          borderBottom: `2px solid ${ACCENT}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 14 }}>
              ◢ IN THE PIT
            </div>
            <h1 className="v-display" style={{ fontSize: 'clamp(60px, 8vw, 120px)', margin: 0, lineHeight: 0.9 }}>
              Your Bag
            </h1>
          </div>
          <div
            style={{
              textAlign: 'right',
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.18em',
              opacity: 0.7,
            }}
          >
            <div style={{ fontSize: 36, fontFamily: 'var(--v-display)', color: ACCENT, lineHeight: 1 }}>
              {cart.reduce((a, b) => a + b.qty, 0).toString().padStart(2, '0')}
            </div>
            <div>ITEMS · {fmt(total)} TOTAL</div>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 0, alignItems: 'start' }}>
        <div style={{ padding: '40px 40px 60px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 140px 120px 80px 40px',
              alignItems: 'center',
              gap: 24,
              paddingBottom: 14,
              borderBottom: '1px solid var(--v-paper-3)',
              fontFamily: 'var(--v-mono)',
              fontSize: 10,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              opacity: 0.55,
            }}
          >
            <span />
            <span>Item</span>
            <span>Spec</span>
            <span style={{ textAlign: 'center' }}>Qty</span>
            <span style={{ textAlign: 'right' }}>Total</span>
            <span />
          </div>

          {cart.map((item) => (
            <div
              key={item.id + item.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 140px 120px 80px 40px',
                alignItems: 'center',
                gap: 24,
                padding: '24px 0',
                borderBottom: '1px solid var(--v-paper-3)',
              }}
            >
              <Link href={`/product/${item.id}`} style={{ width: 120, height: 120, background: '#0a0a0a' }}>
                <ProductShape shape={item.shape} accent={item.accent} size={120} />
              </Link>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--v-mono)',
                    fontSize: 10,
                    letterSpacing: '.22em',
                    color: 'var(--v-fg-2)',
                    marginBottom: 6,
                  }}
                >
                  {item.sku}
                </div>
                <Link href={`/product/${item.id}`}>
                  <h3
                    style={{
                      fontFamily: 'var(--v-display)',
                      fontWeight: 400,
                      fontSize: 22,
                      margin: 0,
                      textTransform: 'uppercase',
                      color: 'var(--v-ink)',
                    }}
                  >
                    {item.name}
                  </h3>
                </Link>
                <div style={{ fontSize: 13, color: 'var(--v-fg-2)', marginTop: 6 }}>
                  {item.line} · {item.material}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--v-mono)', fontSize: 11, letterSpacing: '.12em' }}>
                <div style={{ opacity: 0.55 }}>FIT</div>
                <div style={{ marginTop: 4, fontSize: 13, fontFamily: 'var(--v-sans)' }}>{item.fit}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--v-paper-3)',
                  background: '#fff',
                }}
              >
                <button onClick={() => updateQty(item, Math.max(1, item.qty - 1))} style={{ padding: '10px 12px' }}>
                  <Icon name="minus" size={12} />
                </button>
                <span style={{ fontFamily: 'var(--v-mono)', fontWeight: 600, padding: '0 10px', minWidth: 24, textAlign: 'center' }}>
                  {item.qty}
                </span>
                <button onClick={() => updateQty(item, item.qty + 1)} style={{ padding: '10px 12px' }}>
                  <Icon name="plus" size={12} />
                </button>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--v-mono)', fontSize: 18, fontWeight: 600 }}>
                {fmt(item.price * item.qty)}
              </div>
              <button onClick={() => removeItem(item)} style={{ padding: 8, opacity: 0.45 }} aria-label="Remove item">
                <Icon name="close" size={16} />
              </button>
            </div>
          ))}

          <div style={{ marginTop: 32, padding: 24, border: '1px dashed var(--v-line-2)', background: '#fff' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--v-ink)' }}>
                <span style={{ color: ACCENT, display: 'inline-flex' }}>
                  <Icon name="truck" size={14} />
                </span>
                {shipping === 0 ? 'Free shipping unlocked' : `${fmt(250 - subtotal)} away from free shipping`}
              </span>
              <span style={{ opacity: 0.5 }}>
                €{subtotal} / €250
              </span>
            </div>
            <div style={{ height: 4, background: 'var(--v-paper-3)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: ACCENT,
                  width: `${Math.min(100, (subtotal / 250) * 100)}%`,
                  transition: 'width .4s',
                }}
              />
            </div>
          </div>

          <Link
            href="/shop"
            style={{
              marginTop: 32,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--v-ink)',
            }}
          >
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
              <Icon name="arrow" size={14} />
            </span>
            Continue Shopping
          </Link>
        </div>

        <aside
          style={{
            background: '#fff',
            borderLeft: '1px solid var(--v-paper-3)',
            padding: '40px',
            position: 'sticky',
            top: 96,
            minHeight: '70vh',
          }}
        >
          <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 18 }}>
            ◢ ORDER SUMMARY
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              fontFamily: 'var(--v-sans)',
              fontSize: 15,
              paddingBottom: 24,
              borderBottom: '1px solid var(--v-paper-3)',
            }}
          >
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row
              label="Shipping (DHL Express)"
              value={shipping === 0 ? 'FREE' : fmt(shipping)}
              accent={shipping === 0 ? ACCENT : undefined}
            />
            <Row label="VAT (22%)" value={fmt(tax)} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '24px 0',
              borderBottom: '1px solid var(--v-paper-3)',
            }}
          >
            <span style={{ fontFamily: 'var(--v-display)', fontSize: 28 }}>TOTAL</span>
            <span style={{ fontFamily: 'var(--v-mono)', fontSize: 32, fontWeight: 600 }}>{fmt(total)}</span>
          </div>

          <div style={{ marginTop: 18, display: 'flex', border: '1px solid var(--v-paper-3)', background: '#fff' }}>
            <input
              placeholder="Promo code"
              style={{
                flex: 1,
                border: 0,
                padding: '14px 16px',
                fontFamily: 'var(--v-mono)',
                fontSize: 12,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                outline: 'none',
                background: 'transparent',
              }}
            />
            <button
              style={{
                padding: '0 18px',
                background: 'var(--v-ink)',
                color: '#fff',
                fontFamily: 'var(--v-mono)',
                fontSize: 11,
                letterSpacing: '.2em',
                fontWeight: 600,
              }}
            >
              APPLY
            </button>
          </div>

          <Link
            href="/checkout"
            className="v-btn v-btn--lg"
            style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}
          >
            Secure Checkout{' '}
            <span className="arr">
              <Icon name="arrow" size={16} />
            </span>
          </Link>

          <div
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              fontFamily: 'var(--v-mono)',
              fontSize: 10,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              opacity: 0.55,
            }}
          >
            <Icon name="lock" size={14} /> SSL Encrypted · 256-bit
          </div>

          <div style={{ marginTop: 18, display: 'flex', gap: 8, justifyContent: 'center', opacity: 0.5 }}>
            {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY'].map((m) => (
              <span
                key={m}
                style={{
                  padding: '5px 8px',
                  border: '1px solid var(--v-paper-3)',
                  fontFamily: 'var(--v-mono)',
                  fontSize: 9,
                  letterSpacing: '.15em',
                  fontWeight: 600,
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontFamily: 'var(--v-mono)', fontWeight: 600, color: accent || 'inherit' }}>{value}</span>
    </div>
  );
}
