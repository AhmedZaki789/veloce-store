'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type CSSProperties } from 'react';
import { Icon } from '@/components/Icon';
import { CarSVG } from '@/components/Visuals';

const ACCENT = '#c1121f';

export default function AccountPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <main className="v-screen" style={{ background: '#0a0a0a', color: '#fff', minHeight: '90vh' }}>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 520px', minHeight: '80vh' }}>
        <div
          style={{
            position: 'relative',
            background: '#000',
            overflow: 'hidden',
            padding: '80px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className="v-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
          <div style={{ position: 'absolute', right: -20, bottom: -40, opacity: 0.3 }}>
            <CarSVG intensity={1} accent={ACCENT} />
          </div>

          <div style={{ position: 'relative' }}>
            <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 14 }}>
              ◢ TEAM VELOCE · LOGIN
            </div>
            <h1 className="v-display" style={{ fontSize: 'clamp(60px, 8vw, 120px)', margin: 0, lineHeight: 0.85 }}>
              The Pit
              <br />
              is open.
            </h1>
          </div>

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 60 }}>
            {[
              { h: 'Fitment locker', s: 'Save vehicles · auto-filter the catalogue' },
              { h: 'Priority access', s: 'Drops 24h before public release' },
              { h: 'Pit crew chat', s: 'Direct line to mechanics + designers' },
            ].map((b) => (
              <div key={b.h}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderTop: `2px solid ${ACCENT}`,
                    borderLeft: `2px solid ${ACCENT}`,
                    marginBottom: 14,
                  }}
                />
                <div style={{ fontFamily: 'var(--v-display)', fontSize: 20, lineHeight: 1, marginBottom: 6 }}>{b.h}</div>
                <div style={{ fontSize: 13, opacity: 0.65 }}>{b.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: '#0a0a0a',
            borderLeft: '1px solid var(--v-line)',
            padding: '80px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid var(--v-line)' }}>
            {(['signin', 'signup'] as const).map((id) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  fontFamily: 'var(--v-display)',
                  fontSize: 24,
                  textTransform: 'uppercase',
                  color: mode === id ? '#fff' : 'rgba(255,255,255,.4)',
                  borderBottom: mode === id ? `3px solid ${ACCENT}` : '3px solid transparent',
                  marginBottom: -1,
                }}
              >
                {id === 'signin' ? 'Sign In' : 'Join'}
              </button>
            ))}
          </div>

          {mode === 'signin' && (
            <>
              <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 8 }}>
                ● WELCOME BACK
              </div>
              <h2 className="v-display" style={{ fontSize: 32, margin: '0 0 28px' }}>
                Driver, identify.
              </h2>

              <DarkField label="Email" value={email} onChange={setEmail} placeholder="crew@veloce.cc" />
              <DarkField label="Password" value={pw} onChange={setPw} type="password" placeholder="••••••••" style={{ marginTop: 16 }} />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 12,
                  fontFamily: 'var(--v-mono)',
                  fontSize: 11,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.7 }}>
                  <span style={{ width: 14, height: 14, border: '1.5px solid rgba(255,255,255,.4)' }} />
                  Remember
                </label>
                <button style={{ color: ACCENT }}>Forgot →</button>
              </div>

              <button
                onClick={() => router.push('/')}
                className="v-btn v-btn--lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: 28 }}
              >
                Enter the Pit{' '}
                <span className="arr">
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            </>
          )}

          {mode === 'signup' && (
            <>
              <div className="v-eyebrow" style={{ color: ACCENT, marginBottom: 8 }}>
                ● START YOUR ENGINE
              </div>
              <h2 className="v-display" style={{ fontSize: 32, margin: '0 0 28px' }}>
                Join Team Veloce.
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <DarkField label="First" placeholder="Alessandro" value="" onChange={() => {}} />
                <DarkField label="Last" placeholder="Bianchi" value="" onChange={() => {}} />
              </div>
              <DarkField
                label="Email"
                placeholder="crew@veloce.cc"
                value=""
                onChange={() => {}}
                style={{ marginTop: 14 }}
              />
              <DarkField
                label="Password"
                placeholder="At least 8 chars"
                type="password"
                value=""
                onChange={() => {}}
                style={{ marginTop: 14 }}
              />

              <div
                style={{
                  marginTop: 14,
                  fontFamily: 'var(--v-mono)',
                  fontSize: 10,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  opacity: 0.5,
                }}
              >
                By joining you accept the <u>Terms</u> and <u>Pit Policy</u>.
              </div>

              <button
                onClick={() => router.push('/')}
                className="v-btn v-btn--lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: 28 }}
              >
                Light it Up{' '}
                <span className="arr">
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            </>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '30px 0 20px',
              fontFamily: 'var(--v-mono)',
              fontSize: 10,
              letterSpacing: '.22em',
              opacity: 0.4,
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--v-line)' }} /> OR{' '}
            <div style={{ flex: 1, height: 1, background: 'var(--v-line)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            <SocialBtn>G</SocialBtn>
            <SocialBtn>
              <Icon name="apple" size={16} />
            </SocialBtn>
            <SocialBtn>f</SocialBtn>
          </div>
        </div>
      </section>
    </main>
  );
}

function DarkField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  style,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  style?: CSSProperties;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...(style || {}) }}>
      <span
        style={{
          fontFamily: 'var(--v-mono)',
          fontSize: 10,
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          opacity: 0.55,
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'transparent',
          border: 0,
          borderBottom: '1.5px solid rgba(255,255,255,.2)',
          padding: '10px 0',
          color: '#fff',
          fontFamily: 'var(--v-sans)',
          fontSize: 16,
          outline: 'none',
        }}
      />
    </label>
  );
}

function SocialBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        padding: '16px',
        border: '1px solid rgba(255,255,255,.15)',
        color: '#fff',
        fontFamily: 'var(--v-display)',
        fontSize: 20,
        background: 'transparent',
      }}
    >
      {children}
    </button>
  );
}
