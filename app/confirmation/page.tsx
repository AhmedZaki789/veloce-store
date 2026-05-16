'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fmt } from '@/lib/data';
import { Icon } from '@/components/Icon';

const ACCENT = '#c1121f';

function ConfirmationContent() {
  const params = useSearchParams();
  const orderNo = params.get('order') || 'V-274183';
  const total = Number(params.get('total')) || 1840;

  return (
    <main
      className="v-screen"
      style={{ background: '#0a0a0a', color: '#fff', minHeight: '90vh', position: 'relative', overflow: 'hidden' }}
    >
      <div className="v-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(193,18,31,.25) 0%, transparent 50%)',
        }}
      />

      <section className="v-confirm-section" style={{ position: 'relative', padding: '80px 56px', textAlign: 'center', maxWidth: 920, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  background: (Math.floor(i / 2) % 2 === 0) === (i % 2 === 0) ? '#fff' : '#0a0a0a',
                  border: '1px solid #fff',
                }}
              />
            ))}
          </div>
        </div>

        <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 18, animation: 'v-flicker 3s infinite' }}>
          ● CHECKERED FLAG
        </div>
        <h1 className="v-display" style={{ fontSize: 'clamp(80px, 12vw, 200px)', margin: 0, lineHeight: 0.85 }}>
          Order
          <br />
          <span style={{ color: ACCENT }}>Confirmed.</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--v-editorial)',
            fontStyle: 'italic',
            fontSize: 22,
            opacity: 0.75,
            marginTop: 30,
            maxWidth: 560,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Pit crew is on it. You&apos;ll hear from us when the box leaves the workshop.
        </p>

        <div
          className="v-confirm-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--v-line)',
            marginTop: 56,
            border: '1px solid var(--v-line)',
          }}
        >
          {[
            { l: 'ORDER NO.', v: orderNo },
            { l: 'TOTAL CHARGED', v: fmt(total) },
            { l: 'EXPECTED', v: 'MAY 17 — 19' },
            { l: 'TRACKING', v: 'WAITING…' },
          ].map((b, i) => (
            <div key={i} style={{ padding: '24px 18px', background: '#0a0a0a', textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.22em', opacity: 0.55 }}>{b.l}</div>
              <div
                style={{ fontFamily: 'var(--v-display)', fontSize: 24, marginTop: 6, color: i === 0 ? ACCENT : '#fff' }}
              >
                {b.v}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: '32px 32px 40px',
            border: '1px solid var(--v-line)',
            background: '#0e0e0e',
            textAlign: 'left',
          }}
        >
          <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 18 }}>
            ◢ LIVE TRACK
          </div>
          <div style={{ position: 'relative', height: 4, background: 'var(--v-line)', margin: '24px 0' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '25%',
                background: ACCENT,
              }}
            />
            {[0, 25, 55, 85, 100].map((pct, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  top: -7,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: i === 1 ? ACCENT : i === 0 ? '#fff' : '#0a0a0a',
                  border: `2px solid ${i <= 1 ? ACCENT : 'var(--v-line)'}`,
                  transform: 'translateX(-50%)',
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 8,
              fontFamily: 'var(--v-mono)',
              fontSize: 10,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
            }}
          >
            <Step active>PLACED</Step>
            <Step active>WORKSHOP</Step>
            <Step>QC</Step>
            <Step>SHIPPED</Step>
            <Step>DELIVERED</Step>
          </div>
        </div>

        <div className="v-confirm-cta" style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 48 }}>
          <Link href="/" className="v-btn v-btn--lg">
            Back to Home{' '}
            <span className="arr">
              <Icon name="arrow" size={16} />
            </span>
          </Link>
          <Link href="/shop" className="v-btn v-btn--lg v-btn--ghost">
            Keep Shopping
          </Link>
        </div>

        <div
          style={{
            marginTop: 48,
            fontFamily: 'var(--v-mono)',
            fontSize: 10,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            opacity: 0.45,
          }}
        >
          A receipt is on its way to your inbox. Need a hand?{' '}
          <u style={{ color: ACCENT }}>Talk to the pit crew →</u>
        </div>
      </section>
    </main>
  );
}

function Step({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return <div style={{ textAlign: 'center', opacity: active ? 1 : 0.45, color: active ? 'var(--v-red)' : '#fff' }}>{children}</div>;
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', background: '#0a0a0a' }} />}>
      <ConfirmationContent />
    </Suspense>
  );
}
