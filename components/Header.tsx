'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { Icon } from './Icon';

export function Header() {
  const pathname = usePathname() || '/';
  const { cartCount, setMiniOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isDark =
    pathname === '/' ||
    pathname.startsWith('/product') ||
    pathname.startsWith('/confirmation') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/checkout');

  const linkSt = {
    fontFamily: 'var(--v-mono)',
    fontSize: 11,
    letterSpacing: '.2em',
    textTransform: 'uppercase' as const,
    fontWeight: 500,
    opacity: 0.78,
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: isDark ? 'rgba(10,10,10,.78)' : 'rgba(245,244,241,.88)',
        color: isDark ? '#fff' : 'var(--v-ink)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)'}`,
      }}
    >
      <div
        className="v-header-util"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 32px',
          fontFamily: 'var(--v-mono)',
          fontSize: 10,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)'}`,
          opacity: 0.72,
        }}
      >
        <span>
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              background: 'var(--v-red)',
              marginRight: 8,
              verticalAlign: 'middle',
              animation: 'v-pulse 2s infinite',
            }}
          />
          HQ MILANO · MILANO SHOWROOM OPEN
        </span>
        <span style={{ display: 'flex', gap: 24 }}>
          <span>EN / EUR</span>
          <span>SHIPS TO 47 COUNTRIES</span>
          <Link href="/account">SIGN IN</Link>
        </span>
      </div>

      <div
        className="v-header-main"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '18px 32px',
          gap: 24,
        }}
      >
        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="v-show-mobile-flex"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 6,
            color: 'inherit',
          }}
        >
          <Icon name="menu" size={22} />
        </button>

        <nav className="v-header-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="/shop" style={{ ...linkSt, opacity: pathname === '/shop' ? 1 : 0.78 }}>
            Shop
          </Link>
          <Link href="/shop?cat=exterior" style={linkSt}>
            Exterior
          </Link>
          <Link href="/shop?cat=interior" style={linkSt}>
            Interior
          </Link>
          <Link href="/shop?cat=tech" style={linkSt}>
            Tech
          </Link>
          <Link href="/shop?cat=detailing" style={linkSt}>
            Detailing
          </Link>
        </nav>

        <Link
          href="/"
          className="v-header-logo"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, letterSpacing: '.02em' }}
        >
          <span style={{ fontFamily: 'var(--v-display)', fontSize: 30, lineHeight: 1, letterSpacing: '.08em' }}>VELOCE</span>
          <span style={{ fontFamily: 'var(--v-mono)', fontSize: 8, letterSpacing: '.4em', opacity: 0.6 }}>
            EST · 2019 · MILANO
          </span>
        </Link>

        <div className="v-header-icons" style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, alignItems: 'center' }}>
          <button style={{ padding: 8 }} aria-label="Search">
            <Icon name="search" size={18} />
          </button>
          <Link href="/account" style={{ padding: 8 }} aria-label="Account">
            <Icon name="user" size={18} />
          </Link>
          <button
            onClick={() => setMiniOpen(true)}
            className="v-header-cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,.25)' : 'rgba(0,0,0,.18)'}`,
              fontFamily: 'var(--v-mono)',
              fontSize: 11,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
            }}
          >
            <Icon name="bag" size={16} /> Cart{' '}
            <span style={{ padding: '1px 7px', background: 'var(--v-red)', color: '#fff', minWidth: 22, textAlign: 'center' }}>
              {String(cartCount).padStart(2, '0')}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(0,0,0,.55)',
            animation: 'v-fade .2s var(--v-ease-out)',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 'min(86%, 360px)',
              background: '#0a0a0a',
              color: '#fff',
              padding: '24px 24px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              animation: 'v-fade .25s var(--v-ease-out)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--v-display)', fontSize: 24, letterSpacing: '.08em' }}>VELOCE</span>
              <button onClick={() => setMenuOpen(false)} style={{ padding: 8, color: '#fff' }} aria-label="Close menu">
                <Icon name="close" size={20} />
              </button>
            </div>
            <div
              className="v-eyebrow"
              style={{ color: 'var(--v-red)', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--v-line)' }}
            >
              ◢ NAVIGATE
            </div>
            {[
              { l: 'Shop · all', h: '/shop' },
              { l: 'Exterior', h: '/shop?cat=exterior' },
              { l: 'Interior', h: '/shop?cat=interior' },
              { l: 'Tech', h: '/shop?cat=tech' },
              { l: 'Detailing', h: '/shop?cat=detailing' },
              { l: 'Lifestyle', h: '/shop?cat=lifestyle' },
            ].map((l) => (
              <Link
                key={l.h + l.l}
                href={l.h}
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid var(--v-line)',
                  fontFamily: 'var(--v-display)',
                  fontSize: 22,
                  textTransform: 'uppercase',
                  letterSpacing: '.05em',
                }}
              >
                {l.l}
              </Link>
            ))}
            <div
              className="v-eyebrow"
              style={{ color: 'var(--v-red)', margin: '24px 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--v-line)' }}
            >
              ◢ ACCOUNT
            </div>
            <Link
              href="/account"
              style={{
                padding: '12px 0',
                fontFamily: 'var(--v-mono)',
                fontSize: 12,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
              }}
            >
              Sign in
            </Link>
            <Link
              href="/cart"
              style={{
                padding: '12px 0',
                fontFamily: 'var(--v-mono)',
                fontSize: 12,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
              }}
            >
              Bag ({cartCount})
            </Link>

            <div style={{ marginTop: 'auto', paddingTop: 24, opacity: 0.55, fontFamily: 'var(--v-mono)', fontSize: 10, letterSpacing: '.2em' }}>
              HQ MILANO · SHIPS TO 47 COUNTRIES
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
