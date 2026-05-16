'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { useCart } from '@/lib/cart-context';
import { fmt } from '@/lib/data';
import { Icon } from '@/components/Icon';
import { ProductShape } from '@/components/Visuals';

const ACCENT = '#c1121f';

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  shipMethod: 'express' | 'standard' | 'pickup';
  payMethod: 'card' | 'paypal' | 'klarna' | 'crypto';
  cardName: string;
  cardNo: string;
  cardExp: string;
  cardCvc: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>({
    email: 'crew@veloce.cc',
    firstName: 'Alessandro',
    lastName: 'Bianchi',
    address: "Via dell'Aerodromo 18",
    address2: '',
    city: 'Milano',
    zip: '20156',
    country: 'Italy',
    phone: '+39 333 1924 887',
    shipMethod: 'express',
    payMethod: 'card',
    cardName: 'A. BIANCHI',
    cardNo: '4242  4242  4242  4242',
    cardExp: '04 / 28',
    cardCvc: '742',
  });
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const shippingCost = subtotal > 250 ? 0 : form.shipMethod === 'express' ? 28 : 12;
  const tax = Math.round(subtotal * 0.22);
  const total = subtotal + shippingCost + tax;

  const placeOrder = () => {
    const orderNo = 'V-' + Math.floor(Math.random() * 900000 + 100000);
    clearCart();
    router.push(`/confirmation?order=${orderNo}&total=${total}`);
  };

  if (cart.length === 0) {
    return (
      <main className="v-screen" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)', minHeight: '60vh' }}>
        <section style={{ padding: '120px 56px', textAlign: 'center' }}>
          <h1 className="v-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Nothing to check out.</h1>
          <Link href="/shop" className="v-btn v-btn--lg" style={{ marginTop: 24 }}>
            Open the Catalogue
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="v-screen" style={{ background: 'var(--v-paper)', color: 'var(--v-ink)', minHeight: '90vh' }}>
      <section className="v-checkout-banner" style={{ background: '#0a0a0a', color: '#fff', padding: '40px 56px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 10 }}>
              ◢ CHECKOUT · SECURE LANE
            </div>
            <h1 className="v-display" style={{ fontSize: 56, margin: 0, lineHeight: 1 }}>
              Lights Out
            </h1>
          </div>
          <div style={{ textAlign: 'right', fontFamily: 'var(--v-mono)', fontSize: 11, letterSpacing: '.18em' }}>
            <div style={{ fontSize: 32, color: ACCENT, fontFamily: 'var(--v-display)', lineHeight: 1 }}>{fmt(total)}</div>
            <div style={{ opacity: 0.6, marginTop: 4 }}>TOTAL · {cart.reduce((a, b) => a + b.qty, 0)} ITEMS</div>
          </div>
        </div>

        <div
          className="v-checkout-stepper"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            marginTop: 36,
            borderTop: '1px solid var(--v-line)',
            paddingTop: 24,
          }}
        >
          {[
            { n: 1, l: 'SHIPPING' },
            { n: 2, l: 'PAYMENT' },
            { n: 3, l: 'REVIEW' },
          ].map((s) => (
            <button
              key={s.n}
              onClick={() => s.n < step && setStep(s.n as 1 | 2 | 3)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '4px 0',
                textAlign: 'left',
                opacity: step === s.n ? 1 : 0.45,
                borderTop: step === s.n ? `2px solid ${ACCENT}` : '2px solid transparent',
                paddingTop: 18,
                marginTop: -26,
              }}
            >
              <span className="v-display" style={{ fontSize: 42, color: step > s.n ? ACCENT : '#fff', lineHeight: 1 }}>
                {step > s.n ? '✓' : '0' + s.n}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.22em', opacity: 0.6 }}>
                  STEP {s.n}/3
                </div>
                <div style={{ fontFamily: 'var(--v-display)', fontSize: 20, lineHeight: 1, marginTop: 4 }}>{s.l}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="v-checkout-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 0, alignItems: 'start' }}>
        <div className="v-checkout-form" style={{ padding: '48px 56px' }}>
          {step === 1 && (
            <>
              <div className="v-checkout-express" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
                <button
                  style={{
                    padding: '18px',
                    background: '#000',
                    color: '#fff',
                    fontFamily: 'var(--v-mono)',
                    fontSize: 13,
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <Icon name="apple" size={20} /> Pay
                </button>
                <button
                  style={{
                    padding: '18px',
                    background: '#FFC439',
                    color: '#003087',
                    fontFamily: 'Arial',
                    fontWeight: 800,
                    fontStyle: 'italic',
                    fontSize: 18,
                  }}
                >
                  PayPal
                </button>
                <button
                  style={{
                    padding: '18px',
                    background: '#5A31F4',
                    color: '#fff',
                    fontFamily: 'Arial',
                    fontWeight: 800,
                    fontStyle: 'italic',
                    fontSize: 16,
                    letterSpacing: '.05em',
                  }}
                >
                  shop Pay
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  margin: '0 0 32px',
                  opacity: 0.5,
                  fontFamily: 'var(--v-mono)',
                  fontSize: 10,
                  letterSpacing: '.22em',
                }}
              >
                <div style={{ flex: 1, height: 1, background: 'var(--v-paper-3)' }} /> OR PAY WITH CARD{' '}
                <div style={{ flex: 1, height: 1, background: 'var(--v-paper-3)' }} />
              </div>

              <h2 className="v-display" style={{ fontSize: 36, margin: '0 0 8px' }}>
                01 / SHIPPING
              </h2>
              <p style={{ opacity: 0.6, fontSize: 13, marginBottom: 24 }}>Where shall we send the parts?</p>

              <Field label="Contact email" value={form.email} onChange={(v) => set('email', v)} />
              <div className="v-checkout-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
                <Field label="First name" value={form.firstName} onChange={(v) => set('firstName', v)} />
                <Field label="Last name" value={form.lastName} onChange={(v) => set('lastName', v)} />
              </div>
              <Field
                label="Address line 1"
                value={form.address}
                onChange={(v) => set('address', v)}
                style={{ marginTop: 14 }}
              />
              <Field
                label="Apt / suite (optional)"
                value={form.address2}
                onChange={(v) => set('address2', v)}
                style={{ marginTop: 14 }}
              />
              <div className="v-checkout-row-3" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14, marginTop: 14 }}>
                <Field label="City" value={form.city} onChange={(v) => set('city', v)} />
                <Field label="ZIP" value={form.zip} onChange={(v) => set('zip', v)} />
                <Field label="Country" value={form.country} onChange={(v) => set('country', v)} />
              </div>
              <Field label="Phone" value={form.phone} onChange={(v) => set('phone', v)} style={{ marginTop: 14 }} />

              <h3 className="v-display" style={{ fontSize: 24, margin: '40px 0 16px' }}>
                Shipping method
              </h3>
              <ShipOpt
                active={form.shipMethod === 'express'}
                onClick={() => set('shipMethod', 'express')}
                title="Pit-Lane Express · 48h"
                sub="DHL · signed · tracking"
                price={subtotal > 250 ? 'FREE' : '€28'}
              />
              <ShipOpt
                active={form.shipMethod === 'standard'}
                onClick={() => set('shipMethod', 'standard')}
                title="Paddock · 3–5 days"
                sub="Standard courier"
                price="€12"
              />
              <ShipOpt
                active={form.shipMethod === 'pickup'}
                onClick={() => set('shipMethod', 'pickup')}
                title="Showroom Pickup · Milano"
                sub="Via dell'Aerodromo 18 · 09–19"
                price="FREE"
              />

              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
                <Link
                  href="/cart"
                  style={{
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: 'var(--v-ink)',
                  }}
                >
                  ← Back to Bag
                </Link>
                <button onClick={() => setStep(2)} className="v-btn">
                  Continue to Payment{' '}
                  <span className="arr">
                    <Icon name="arrow" size={16} />
                  </span>
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="v-display" style={{ fontSize: 36, margin: '0 0 8px' }}>
                02 / PAYMENT
              </h2>
              <p style={{ opacity: 0.6, fontSize: 13, marginBottom: 24 }}>
                All transactions encrypted with 256-bit SSL.
              </p>

              <div className="v-checkout-pay-tabs" style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {(
                  [
                    { id: 'card', l: 'CARD' },
                    { id: 'paypal', l: 'PAYPAL' },
                    { id: 'klarna', l: 'KLARNA · 4 pay' },
                    { id: 'crypto', l: 'CRYPTO' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => set('payMethod', m.id)}
                    style={{
                      flex: 1,
                      padding: '16px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      border: form.payMethod === m.id ? '2px solid var(--v-ink)' : '1px solid var(--v-paper-3)',
                      background: form.payMethod === m.id ? '#fff' : 'transparent',
                      fontFamily: 'var(--v-mono)',
                      fontSize: 11,
                      letterSpacing: '.18em',
                      fontWeight: 600,
                    }}
                  >
                    {m.l}
                  </button>
                ))}
              </div>

              {form.payMethod === 'card' && (
                <>
                  <Field label="Name on card" value={form.cardName} onChange={(v) => set('cardName', v)} mono />
                  <Field
                    label="Card number"
                    value={form.cardNo}
                    onChange={(v) => set('cardNo', v)}
                    mono
                    style={{ marginTop: 14 }}
                  />
                  <div className="v-checkout-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
                    <Field label="Expiry · MM / YY" value={form.cardExp} onChange={(v) => set('cardExp', v)} mono />
                    <Field label="CVC" value={form.cardCvc} onChange={(v) => set('cardCvc', v)} mono />
                  </div>

                  <CreditCardPreview form={form} />
                </>
              )}

              {form.payMethod === 'paypal' && (
                <div style={{ padding: 32, background: '#fff', border: '1px solid var(--v-paper-3)', textAlign: 'center' }}>
                  <Icon name="paypal" size={48} />
                  <p style={{ marginTop: 14, opacity: 0.7 }}>
                    You&apos;ll complete payment on PayPal&apos;s secure site.
                  </p>
                </div>
              )}
              {form.payMethod === 'klarna' && (
                <div style={{ padding: 32, background: '#fff', border: '1px solid var(--v-paper-3)' }}>
                  <div className="v-eyebrow">FOUR INSTALLMENTS, NO INTEREST</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 18 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{ padding: 14, background: 'var(--v-paper)', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.2em', opacity: 0.5 }}>
                          WEEK {i}
                        </div>
                        <div style={{ fontFamily: 'var(--v-display)', fontSize: 22, marginTop: 4 }}>
                          {fmt(Math.round(total / 4))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {form.payMethod === 'crypto' && (
                <div style={{ padding: 32, background: '#0a0a0a', color: '#fff' }}>
                  <div className="v-eyebrow" style={{ color: ACCENT }}>
                    ● BTC · ETH · USDC
                  </div>
                  <p style={{ margin: '12px 0 0', fontFamily: 'var(--v-editorial)', fontStyle: 'italic' }}>
                    Pay with the future. We accept the holy trinity.
                  </p>
                </div>
              )}

              <h3 className="v-display" style={{ fontSize: 24, margin: '40px 0 16px' }}>
                Billing
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    background: 'var(--v-ink)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  <Icon name="check" size={12} />
                </span>
                Use shipping address as billing
              </label>

              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  ← Shipping
                </button>
                <button onClick={() => setStep(3)} className="v-btn">
                  Review Order{' '}
                  <span className="arr">
                    <Icon name="arrow" size={16} />
                  </span>
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="v-display" style={{ fontSize: 36, margin: '0 0 8px' }}>
                03 / FINAL CHECK
              </h2>
              <p style={{ opacity: 0.6, fontSize: 13, marginBottom: 24 }}>
                One last look before we light it up.
              </p>

              <ReviewBlock title="Shipping" edit={() => setStep(1)}>
                <div>
                  {form.firstName} {form.lastName}
                </div>
                <div>
                  {form.address}
                  {form.address2 && `, ${form.address2}`}
                </div>
                <div>
                  {form.city} {form.zip} · {form.country}
                </div>
                <div style={{ opacity: 0.6, marginTop: 6 }}>
                  {form.phone} · {form.email}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    padding: '8px 12px',
                    background: 'var(--v-paper)',
                    display: 'inline-block',
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.18em',
                  }}
                >
                  {form.shipMethod === 'express' && 'PIT-LANE EXPRESS · 48H'}
                  {form.shipMethod === 'standard' && 'PADDOCK · 3–5 DAYS'}
                  {form.shipMethod === 'pickup' && 'SHOWROOM PICKUP'}
                </div>
              </ReviewBlock>

              <ReviewBlock title="Payment" edit={() => setStep(2)}>
                {form.payMethod === 'card' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Icon name="visa" size={36} />
                    <span style={{ fontFamily: 'var(--v-mono)' }}>•••• •••• •••• {form.cardNo.slice(-4)}</span>
                    <span style={{ opacity: 0.5, fontFamily: 'var(--v-mono)', fontSize: 12 }}>EXP {form.cardExp}</span>
                  </div>
                )}
                {form.payMethod === 'paypal' && <div>PayPal · {form.email}</div>}
                {form.payMethod === 'klarna' && <div>Klarna · 4 × {fmt(Math.round(total / 4))} biweekly</div>}
                {form.payMethod === 'crypto' && <div>Crypto · BTC / ETH / USDC</div>}
              </ReviewBlock>

              <ReviewBlock title={`Items · ${cart.length}`} edit={() => router.push('/cart')}>
                {cart.map((it) => (
                  <div
                    key={it.id + it.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '56px 1fr auto',
                      gap: 14,
                      alignItems: 'center',
                      padding: '10px 0',
                    }}
                  >
                    <div style={{ width: 56, height: 56, background: '#0a0a0a' }}>
                      <ProductShape shape={it.shape} accent={it.accent} size={56} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--v-display)', fontSize: 14, textTransform: 'uppercase' }}>
                        {it.name}
                      </div>
                      <div style={{ fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.18em', opacity: 0.55 }}>
                        QTY {it.qty} · {it.sku}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--v-mono)', fontWeight: 600 }}>{fmt(it.price * it.qty)}</div>
                  </div>
                ))}
              </ReviewBlock>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  marginTop: 24,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    background: 'var(--v-ink)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Icon name="check" size={12} />
                </span>
                I accept the <u>Terms</u>, <u>Returns Policy</u>, and confirm that fitment has been verified for my vehicle.
              </label>

              <div
                style={{
                  marginTop: 40,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={() => setStep(2)}
                  style={{
                    fontFamily: 'var(--v-mono)',
                    fontSize: 11,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  ← Payment
                </button>
                <button onClick={placeOrder} className="v-btn v-btn--lg" style={{ background: ACCENT }}>
                  <Icon name="lock" size={14} /> Place Order · {fmt(total)}
                </button>
              </div>
            </>
          )}
        </div>

        <aside
          className="v-checkout-aside"
          style={{
            background: '#fff',
            borderLeft: '1px solid var(--v-paper-3)',
            padding: '40px 36px',
            position: 'sticky',
            top: 96,
            minHeight: '80vh',
          }}
        >
          <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 18 }}>
            ◢ ORDER · {cart.length} ITEMS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {cart.map((it) => (
              <div
                key={it.id + it.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr auto',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 48, height: 48, background: '#0a0a0a', position: 'relative' }}>
                  <ProductShape shape={it.shape} accent={it.accent} size={48} />
                  <span
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      width: 20,
                      height: 20,
                      background: 'var(--v-ink)',
                      color: '#fff',
                      fontFamily: 'var(--v-mono)',
                      fontSize: 10,
                      fontWeight: 600,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 10,
                    }}
                  >
                    {it.qty}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--v-sans)', fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>
                  {it.name}
                </div>
                <div style={{ fontFamily: 'var(--v-mono)', fontSize: 13, fontWeight: 600 }}>
                  {fmt(it.price * it.qty)}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              paddingTop: 18,
              borderTop: '1px solid var(--v-paper-3)',
              fontSize: 13,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.65 }}>Subtotal</span>
              <span className="v-mono" style={{ fontWeight: 600 }}>
                {fmt(subtotal)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.65 }}>Shipping</span>
              <span
                className="v-mono"
                style={{ fontWeight: 600, color: shippingCost === 0 ? ACCENT : 'inherit' }}
              >
                {shippingCost === 0 ? 'FREE' : fmt(shippingCost)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.65 }}>VAT 22%</span>
              <span className="v-mono" style={{ fontWeight: 600 }}>
                {fmt(tax)}
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginTop: 18,
              paddingTop: 18,
              borderTop: '2px solid var(--v-ink)',
            }}
          >
            <span style={{ fontFamily: 'var(--v-display)', fontSize: 24 }}>TOTAL</span>
            <span style={{ fontFamily: 'var(--v-mono)', fontSize: 26, fontWeight: 700 }}>{fmt(total)}</span>
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 14,
              background: 'var(--v-paper)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 12,
            }}
          >
            <span style={{ color: ACCENT, display: 'inline-flex' }}>
              <Icon name="shield" size={20} />
            </span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--v-mono)',
                  fontSize: 10,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}
              >
                VELOCE GUARANTEE
              </div>
              <div style={{ fontSize: 12, marginTop: 2, opacity: 0.85 }}>30-day returns · 5yr structural</div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  mono,
  style,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
  style?: CSSProperties;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5, ...(style || {}) }}>
      <span
        style={{
          fontFamily: 'var(--v-mono)',
          fontSize: 10,
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          opacity: 0.65,
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--v-paper-3)', padding: '0 14px' }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: '14px 0',
            border: 0,
            fontFamily: mono ? 'var(--v-mono)' : 'var(--v-sans)',
            fontSize: 15,
            background: 'transparent',
            outline: 'none',
            letterSpacing: mono ? '.04em' : 'normal',
          }}
        />
      </div>
    </label>
  );
}

function ShipOpt({
  active,
  onClick,
  title,
  sub,
  price,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  price: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
        padding: '18px 20px',
        marginBottom: 10,
        background: '#fff',
        border: active ? `2px solid ${ACCENT}` : '1px solid var(--v-paper-3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            border: `1.5px solid ${active ? ACCENT : 'var(--v-paper-3)'}`,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {active && <span style={{ width: 8, height: 8, borderRadius: 4, background: ACCENT }} />}
        </span>
        <div>
          <div style={{ fontFamily: 'var(--v-display)', fontSize: 18, lineHeight: 1, textTransform: 'uppercase' }}>
            {title}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{sub}</div>
        </div>
      </div>
      <span style={{ fontFamily: 'var(--v-mono)', fontSize: 14, fontWeight: 600, color: price === 'FREE' ? ACCENT : 'inherit' }}>
        {price}
      </span>
    </button>
  );
}

function ReviewBlock({ title, edit, children }: { title: string; edit: () => void; children: ReactNode }) {
  return (
    <div style={{ padding: '20px 24px', background: '#fff', border: '1px solid var(--v-paper-3)', marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <div className="v-eyebrow">{title}</div>
        <button
          onClick={edit}
          style={{
            fontFamily: 'var(--v-mono)',
            fontSize: 10,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--v-red)',
          }}
        >
          Edit
        </button>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function CreditCardPreview({ form }: { form: FormState }) {
  return (
    <div
      style={{
        marginTop: 28,
        position: 'relative',
        aspectRatio: '1.586',
        maxWidth: 380,
        padding: 28,
        color: '#fff',
        background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, ${ACCENT} 200%)`,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: 0, right: 0, top: '42%', height: 6, background: ACCENT }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '48%', height: 1, background: 'rgba(255,255,255,.4)' }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--v-display)', fontSize: 22, letterSpacing: '.08em' }}>VELOCE</div>
          <div style={{ fontFamily: 'var(--v-mono)', fontSize: 8, letterSpacing: '.3em', opacity: 0.6 }}>
            RACING CARD · CLASS A
          </div>
        </div>
        <Icon name="visa" size={40} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 64,
          fontFamily: 'var(--v-mono)',
          fontSize: 18,
          letterSpacing: '.18em',
        }}
      >
        {form.cardNo || '0000 0000 0000 0000'}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontFamily: 'var(--v-mono)',
          fontSize: 10,
          letterSpacing: '.16em',
        }}
      >
        <div>
          <div style={{ opacity: 0.5 }}>CARDHOLDER</div>
          <div style={{ fontSize: 13, marginTop: 2 }}>{form.cardName || 'YOUR NAME'}</div>
        </div>
        <div>
          <div style={{ opacity: 0.5 }}>EXP</div>
          <div style={{ fontSize: 13, marginTop: 2 }}>{form.cardExp || 'MM / YY'}</div>
        </div>
      </div>
    </div>
  );
}
