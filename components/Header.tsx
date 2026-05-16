'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Icon } from './Icon';

export function Header() {
  const pathname = usePathname() || '/';
  const { cartCount, setMiniOpen } = useCart();

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
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '18px 32px',
          gap: 24,
        }}
      >
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
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
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, letterSpacing: '.02em' }}
        >
          <span style={{ fontFamily: 'var(--v-display)', fontSize: 30, lineHeight: 1, letterSpacing: '.08em' }}>VELOCE</span>
          <span style={{ fontFamily: 'var(--v-mono)', fontSize: 8, letterSpacing: '.4em', opacity: 0.6 }}>
            EST · 2019 · MILANO
          </span>
        </Link>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, alignItems: 'center' }}>
          <button style={{ padding: 8 }} aria-label="Search">
            <Icon name="search" size={18} />
          </button>
          <Link href="/account" style={{ padding: 8 }} aria-label="Account">
            <Icon name="user" size={18} />
          </Link>
          <button
            onClick={() => setMiniOpen(true)}
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
    </header>
  );
}
