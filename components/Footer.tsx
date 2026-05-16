'use client';

import { Icon } from './Icon';

export function Footer() {
  return (
    <footer style={{ background: '#070707', color: '#fff', borderTop: '1px solid var(--v-line)', marginTop: 0 }}>
      <div style={{ padding: '80px 32px 40px', borderBottom: '1px solid var(--v-line)' }}>
        <div
          style={{
            fontFamily: 'var(--v-display)',
            fontSize: 'min(22vw, 320px)',
            lineHeight: 0.85,
            letterSpacing: '.005em',
            textTransform: 'uppercase',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,.5)',
          }}
        >
          VELOCE
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.4fr', gap: 48, padding: '56px 32px' }}>
        <div>
          <div className="v-eyebrow" style={{ color: 'var(--v-red)', marginBottom: 14 }}>
            The Newsletter
          </div>
          <div
            style={{
              fontFamily: 'var(--v-display)',
              fontSize: 36,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            Pit lane updates,
            <br />
            delivered weekly.
          </div>
          <form
            style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,.3)', maxWidth: 380 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              placeholder="your@email"
              style={{
                flex: 1,
                background: 'transparent',
                border: 0,
                padding: '14px 0',
                color: '#fff',
                fontFamily: 'var(--v-sans)',
                fontSize: 15,
                outline: 'none',
              }}
            />
            <button style={{ color: 'var(--v-red)', padding: '14px 8px' }} type="submit" aria-label="Subscribe">
              <Icon name="arrow" size={20} />
            </button>
          </form>
        </div>
        {[
          { h: 'Shop', items: ['New arrivals', 'Exterior', 'Interior', 'Detailing', 'Tech', 'Lifestyle'] },
          { h: 'Support', items: ['Fitment help', 'Returns', 'Warranty', 'Shipping', 'Contact'] },
          { h: 'Brand', items: ['Heritage', 'Team VELOCE', 'Press', 'Careers', 'Showrooms'] },
          { h: 'HQ', items: ["Via dell'Aerodromo 18", '20156 Milano · IT', '+39 02 9999 0000', 'crew@veloce.cc'] },
        ].map((c) => (
          <div key={c.h}>
            <div className="v-eyebrow" style={{ opacity: 0.55, marginBottom: 14 }}>
              {c.h}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, opacity: 0.8 }}>
              {c.items.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 32px',
          borderTop: '1px solid var(--v-line)',
          fontFamily: 'var(--v-mono)',
          fontSize: 10,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          opacity: 0.55,
        }}
      >
        <span>© 2026 VELOCE S.R.L. — ALL RIGHTS RESERVED</span>
        <span style={{ display: 'flex', gap: 24 }}>
          <span>VAT IT-08812234190</span>
          <span>PRIVACY</span>
          <span>COOKIES</span>
          <span>TERMS</span>
        </span>
      </div>
    </footer>
  );
}
