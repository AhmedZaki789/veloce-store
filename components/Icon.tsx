import type { CSSProperties, ReactNode, SVGProps } from 'react';

type IconProps = {
  name: string;
  size?: number;
  sw?: number;
  style?: CSSProperties;
} & Omit<SVGProps<SVGSVGElement>, 'name' | 'size' | 'style'>;

export function Icon({ name, size = 18, sw = 1.6, ...p }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...p,
  };
  switch (name) {
    case 'arrow':
      return (
        <svg {...common}>
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </svg>
      );
    case 'arrow-d':
      return (
        <svg {...common}>
          <line x1="12" y1="4" x2="12" y2="20" />
          <polyline points="6 14 12 20 18 14" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.5" y2="16.5" />
        </svg>
      );
    case 'bag':
      return (
        <svg {...common}>
          <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.2-4.4 4.4-6.5 8-6.5s6.8 2.1 8 6.5" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      );
    case 'minus':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <polyline points="4 12 10 18 20 6" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2l3 6.6 7.2.6-5.5 4.8 1.7 7-6.4-3.8L5.6 21l1.7-7L1.8 9.2l7.2-.6L12 2z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...common}>
          <rect x="2" y="7" width="11" height="9" />
          <path d="M13 10h5l3 3v3h-8" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...common}>
          <path d="M12 2c1 4 6 5 6 11a6 6 0 0 1-12 0c0-3 2-4 2-7 1.5 1 3 .5 4-4z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <polygon points="13 2 4 14 11 14 10 22 19 10 12 10 13 2" />
        </svg>
      );
    case 'cog':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
        </svg>
      );
    case 'chevron-d':
      return (
        <svg {...common}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );
    case 'card':
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="13" />
          <line x1="2" y1="11" x2="22" y2="11" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case 'apple':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M16 13.5c0-2 1.5-3 1.6-3-1-1.4-2.4-1.5-2.9-1.5-1.3-.1-2.4.7-3.1.7-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1-.1 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1-.1-2.2-.9-2.2-3.3zM14 6.7c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1 1.6-.9 2.6 1-.1 2-.6 2.6-1.2z" />
        </svg>
      );
    case 'paypal':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M7 4h7c3 0 4.5 1.7 4 4.6-.4 2.6-2.5 4.4-5.4 4.4H10l-.6 4-.2 1.5H6L7 4zm3 7h2c1.6 0 2.7-.8 3-2.4.2-1.2-.4-2-1.7-2H10.6L10 11z" />
        </svg>
      );
    case 'mc':
      return (
        <svg {...common} fill="none" stroke="none">
          <circle cx="9" cy="12" r="6" fill="#eb001b" />
          <circle cx="15" cy="12" r="6" fill="#f79e1b" opacity=".9" />
        </svg>
      );
    case 'visa':
      return (
        <svg {...common} viewBox="0 0 32 16" fill="currentColor" stroke="none">
          <text x="2" y="13" fontFamily="Archivo Black, sans-serif" fontSize="12">VISA</text>
        </svg>
      );
    default:
      return null;
  }
}

export const Badge = ({
  children,
  color = 'var(--v-red)',
  dark = false,
}: {
  children: ReactNode;
  color?: string;
  dark?: boolean;
}) => (
  <span
    style={{
      display: 'inline-block',
      padding: '4px 8px',
      background: color,
      color: dark ? 'var(--v-ink)' : '#fff',
      fontFamily: 'var(--v-mono)',
      fontSize: 10,
      letterSpacing: '.18em',
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);
