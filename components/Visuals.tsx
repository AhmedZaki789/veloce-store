'use client';

import { useMemo } from 'react';
import type { ReactNode } from 'react';

export function CarSVG({
  intensity = 1,
  color = '#0a0a0a',
  accent = '#c1121f',
  light = false,
}: {
  intensity?: number;
  color?: string;
  accent?: string;
  light?: boolean;
}) {
  const body = color;
  const high = light ? '#ffffff' : '#1c1c1c';
  const trim = accent;
  const glass = light ? '#d8d6cf' : '#0a0a0a';

  return (
    <svg viewBox="0 0 1200 380" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={body} />
          <stop offset=".5" stopColor={high} stopOpacity=".55" />
          <stop offset="1" stopColor={body} />
        </linearGradient>
        <linearGradient id="carShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="wheelG" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset=".55" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>

      <ellipse cx="600" cy="335" rx="500" ry="14" fill="#000" opacity=".55" />

      <g style={{ animation: intensity > 0 ? `v-bob ${4 / intensity}s ease-in-out infinite` : 'none', transformOrigin: '600px 250px' }}>
        <path
          d="M 90 290 L 160 250 L 240 250 L 330 230 L 470 215 L 700 200 L 920 215 L 1050 240 L 1110 260 L 1100 295 L 80 295 Z"
          fill="url(#carBody)"
          stroke={high}
          strokeWidth="1"
        />

        <path
          d="M 200 250 L 290 195 L 420 158 L 580 138 L 700 138 L 800 158 L 880 195 L 980 230 L 1020 250 L 200 250 Z"
          fill={body}
          stroke={high}
          strokeWidth="1.2"
        />

        <path
          d="M 380 198 L 460 152 L 690 145 L 800 178 L 840 198 Z"
          fill={glass}
          stroke={trim}
          strokeWidth="1.5"
          opacity=".95"
        />

        <path d="M 400 196 L 470 158 L 680 152 L 750 175 Z" fill="url(#carShine)" opacity=".55" />

        <path d="M 540 158 L 540 248" stroke={high} strokeWidth="1.2" opacity=".7" />
        <path d="M 620 144 L 640 248" stroke={high} strokeWidth="1.2" opacity=".7" />

        <path d="M 260 232 L 990 232" stroke={trim} strokeWidth="2.5" opacity=".95" />
        <path d="M 990 232 L 1020 250" stroke={trim} strokeWidth="2.5" opacity=".95" />

        <path d="M 760 200 L 870 200 L 900 232 L 760 232 Z" fill="#000" stroke={trim} strokeWidth="1.5" />
        <path d="M 780 210 L 880 210 M 780 220 L 880 220" stroke={trim} strokeWidth="1.2" opacity=".75" />

        <path d="M 1020 250 L 1110 260 L 1100 295 L 1020 295 Z" fill="#000" stroke={trim} strokeWidth="1.2" />
        <path
          d="M 1030 260 L 1030 295 M 1050 260 L 1050 295 M 1070 260 L 1070 295 M 1090 260 L 1090 295"
          stroke={trim}
          strokeWidth="1"
        />

        <path d="M 970 178 L 1060 162 L 1080 168 L 1080 178 L 985 200 Z" fill={body} stroke={trim} strokeWidth="1.5" />
        <line x1="985" y1="200" x2="985" y2="222" stroke={high} strokeWidth="2" />
        <line x1="1050" y1="180" x2="1050" y2="205" stroke={high} strokeWidth="2" />

        <path d="M 90 290 L 60 295 L 60 305 L 100 305 Z" fill={trim} />

        <path d="M 130 270 L 175 258 L 178 268 L 135 280 Z" fill="#fff8d8" />
        <path d="M 130 270 L 175 258" stroke="#fff" strokeWidth="2" />

        <rect x="1062" y="222" width="36" height="10" fill={trim} />

        <circle cx="1075" cy="288" r="6" fill="#222" stroke={high} />
        <circle cx="1093" cy="288" r="6" fill="#222" stroke={high} />

        <text x="600" y="218" fill={trim} fontFamily="Anton, sans-serif" fontSize="22" letterSpacing="2" textAnchor="middle">
          VELOCE
        </text>
        <text
          x="600"
          y="237"
          fill={high}
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          letterSpacing="3"
          textAnchor="middle"
          opacity=".7"
        >
          N° 07 — TEAM RACING
        </text>
      </g>

      <g
        style={{
          transformOrigin: '235px 290px',
          animation: intensity > 0 ? `v-wheel-spin ${1.4 / intensity}s linear infinite` : 'none',
        }}
      >
        <circle cx="235" cy="290" r="56" fill="url(#wheelG)" stroke={high} strokeWidth="2" />
        <circle cx="235" cy="290" r="40" fill="none" stroke={trim} strokeWidth="2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i * 36 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={235}
              y1={290}
              x2={235 + Math.cos(a) * 38}
              y2={290 + Math.sin(a) * 38}
              stroke={high}
              strokeWidth="3.5"
            />
          );
        })}
        <circle cx="235" cy="290" r="10" fill={trim} />
        <circle cx="235" cy="290" r="4" fill="#fff" />
      </g>
      <path d="M 215 240 L 232 232 L 240 250 L 224 258 Z" fill={trim} stroke={high} strokeWidth="1" />

      <g
        style={{
          transformOrigin: '945px 290px',
          animation: intensity > 0 ? `v-wheel-spin ${1.4 / intensity}s linear infinite` : 'none',
        }}
      >
        <circle cx="945" cy="290" r="56" fill="url(#wheelG)" stroke={high} strokeWidth="2" />
        <circle cx="945" cy="290" r="40" fill="none" stroke={trim} strokeWidth="2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i * 36 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={945}
              y1={290}
              x2={945 + Math.cos(a) * 38}
              y2={290 + Math.sin(a) * 38}
              stroke={high}
              strokeWidth="3.5"
            />
          );
        })}
        <circle cx="945" cy="290" r="10" fill={trim} />
        <circle cx="945" cy="290" r="4" fill="#fff" />
      </g>
      <path d="M 925 240 L 942 232 L 950 250 L 934 258 Z" fill={trim} stroke={high} strokeWidth="1" />
    </svg>
  );
}

export function HeroStage({
  intensity = 1,
  accent = '#c1121f',
  children,
}: {
  intensity?: number;
  color?: string;
  accent?: string;
  children: ReactNode;
}) {
  const lines = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        top: 10 + Math.random() * 80,
        delay: -Math.random() * 4,
        duration: 1.8 + Math.random() * 1.6,
        h: 1 + Math.floor(Math.random() * 2),
        w: 60 + Math.random() * 180,
        op: 0.25 + Math.random() * 0.6,
      })),
    [],
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(193,18,31,.18) 0%, transparent 55%), linear-gradient(180deg, #050505 0%, #0c0c0c 60%, #050505 100%)',
        }}
      />

      <div
        className="v-grid-bg"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '40%',
          maskImage: 'linear-gradient(to top, #000 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 100%)',
          perspective: 600,
          transform: 'rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      {intensity > 0 &&
        lines.map((l, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: l.top + '%',
              left: 0,
              width: l.w + 'px',
              height: l.h + 'px',
              background: i % 4 === 0 ? 'var(--v-red)' : 'rgba(255,255,255,.85)',
              opacity: l.op,
              filter: 'blur(.3px)',
              animation: `v-speedline ${l.duration / intensity}s linear infinite`,
              animationDelay: l.delay + 's',
              willChange: 'transform,opacity',
            }}
          />
        ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0.07,
          background: 'repeating-linear-gradient(0deg, transparent 0 2px, #fff 2px 3px)',
        }}
      />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>

      {accent && null}
    </div>
  );
}

export function ProductShape({ shape, accent = '#c1121f', size }: { shape: string; accent?: string; size?: number }) {
  const high = 'rgba(255,255,255,.85)';
  const baseProps = {
    width: size ?? '100%',
    height: size ?? '100%',
    viewBox: '0 0 200 200',
    preserveAspectRatio: 'xMidYMid meet' as const,
    style: { display: 'block', maxWidth: '100%', maxHeight: '100%' } as const,
  };

  const Frame = ({ children }: { children: ReactNode }) => (
    <svg {...baseProps}>
      <defs>
        <linearGradient id={`g-${shape}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" fill={`url(#g-${shape})`} />
      <g stroke={accent} strokeWidth="1.2">
        <path d="M8 8 H22 M8 8 V22" />
        <path d="M192 8 H178 M192 8 V22" />
        <path d="M8 192 H22 M8 192 V178" />
        <path d="M192 192 H178 M192 192 V178" />
      </g>
      {children}
    </svg>
  );

  const wheel = (
    <g>
      <circle cx="100" cy="100" r="62" fill="#0a0a0a" stroke={high} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="48" fill="none" stroke={accent} strokeWidth="1.5" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = ((i * 72 - 90) * Math.PI) / 180;
        return (
          <path
            key={i}
            d={`M100 100 L ${100 + Math.cos(a) * 46} ${100 + Math.sin(a) * 46}`}
            stroke={high}
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="100" cy="100" r="12" fill={accent} />
      <text x="100" y="105" fill="#fff" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">
        V
      </text>
    </g>
  );

  const wing = (
    <g>
      <path d="M 30 80 L 170 70 L 170 84 L 30 96 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 50 96 L 50 130 L 60 130 L 60 96 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 140 96 L 140 130 L 150 130 L 150 96 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 30 80 L 170 70" stroke={accent} strokeWidth="2" />
      <text x="100" y="160" fill={accent} fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="3">
        SWAN-NECK
      </text>
    </g>
  );

  const splitter = (
    <g>
      <path d="M 20 110 L 180 100 L 180 130 L 20 140 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 30 105 L 50 100 L 50 140 L 30 140 Z M 150 102 L 170 100 L 170 130 L 150 140 Z" fill={accent} opacity=".5" />
      <text x="100" y="170" fill={accent} fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="3">
        CARBON
      </text>
    </g>
  );

  const kit = (
    <g>
      <path d="M 25 95 L 50 70 L 150 70 L 175 95 L 175 130 L 25 130 Z" fill="#111" stroke={high} />
      <path d="M 60 80 L 140 80" stroke={accent} strokeWidth="2" />
      <circle cx="60" cy="130" r="14" fill="#0a0a0a" stroke={high} />
      <circle cx="140" cy="130" r="14" fill="#0a0a0a" stroke={high} />
    </g>
  );

  const bottle = (
    <g>
      <rect x="80" y="40" width="40" height="20" fill="#0a0a0a" stroke={high} />
      <rect x="70" y="60" width="60" height="110" fill="#0a0a0a" stroke={high} />
      <rect x="78" y="90" width="44" height="50" fill={accent} />
      <text x="100" y="118" fill="#fff" fontSize="9" fontFamily="Anton" textAnchor="middle" letterSpacing="2">
        VELOCE
      </text>
      <text x="100" y="130" fill="#fff" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">
        CERAMIC 9H
      </text>
    </g>
  );

  const jar = (
    <g>
      <rect x="70" y="65" width="60" height="20" fill="#1a1a1a" stroke={high} />
      <path d="M 65 85 L 135 85 L 130 165 L 70 165 Z" fill="#0a0a0a" stroke={high} />
      <ellipse cx="100" cy="120" rx="22" ry="22" fill={accent} opacity=".8" />
      <text x="100" y="125" fill="#fff" fontSize="8" fontFamily="Anton" textAnchor="middle">
        WAX
      </text>
    </g>
  );

  const cloth = (
    <g>
      <path d="M 40 50 L 160 50 L 160 150 L 40 150 Z" fill="#181818" stroke={high} />
      <path
        d="M 40 50 L 160 150 M 160 50 L 40 150 M 100 50 L 100 150 M 40 100 L 160 100"
        stroke="#444"
      />
      <rect x="60" y="60" width="80" height="18" fill={accent} />
      <text x="100" y="73" fill="#fff" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2">
        MICROFIBRE
      </text>
    </g>
  );

  const seat = (
    <g>
      <path d="M 60 30 L 140 30 L 140 130 L 60 130 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 60 130 L 60 170 L 140 170 L 140 130" fill="#0a0a0a" stroke={high} />
      <path d="M 70 40 L 70 120 M 130 40 L 130 120" stroke={accent} strokeWidth="1.5" />
      <path d="M 80 50 L 120 50 M 80 70 L 120 70 M 80 90 L 120 90" stroke="#333" />
      <text x="100" y="160" fill={accent} fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2">
        FIA 8855
      </text>
    </g>
  );

  const mat = (
    <g>
      <path d="M 35 40 L 165 40 L 155 160 L 45 160 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 45 60 L 155 60 M 45 100 L 155 100 M 45 140 L 155 140" stroke="#222" />
      <rect x="80" y="80" width="40" height="40" fill={accent} opacity=".25" stroke={accent} />
      <text x="100" y="105" fill={accent} fontSize="10" fontFamily="Anton" textAnchor="middle">
        V
      </text>
    </g>
  );

  const knob = (
    <g>
      <circle cx="100" cy="90" r="30" fill="#1a1a1a" stroke={high} />
      <circle cx="100" cy="90" r="22" fill="#0a0a0a" />
      <rect x="96" y="95" width="8" height="60" fill="#666" />
      <rect x="80" y="155" width="40" height="6" fill="#444" />
      <text x="100" y="94" fill={accent} fontSize="9" fontFamily="Anton" textAnchor="middle">
        Ti
      </text>
    </g>
  );

  const cam = (
    <g>
      <rect x="40" y="60" width="120" height="80" rx="4" fill="#0a0a0a" stroke={high} />
      <circle cx="80" cy="100" r="22" fill="#000" stroke={accent} strokeWidth="2" />
      <circle cx="80" cy="100" r="10" fill={accent} />
      <circle cx="80" cy="100" r="4" fill="#fff" />
      <rect x="120" y="80" width="20" height="6" fill={accent} />
      <text x="130" y="120" fill="#fff" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">
        4K · CAN
      </text>
    </g>
  );

  const speaker = (
    <g>
      <rect x="50" y="30" width="100" height="140" fill="#0a0a0a" stroke={high} />
      <circle cx="100" cy="80" r="22" fill="#1a1a1a" stroke={accent} />
      <circle cx="100" cy="80" r="10" fill={accent} />
      <circle cx="100" cy="130" r="14" fill="#1a1a1a" stroke={high} />
      <text x="100" y="160" fill={accent} fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2">
        2.1 REF
      </text>
    </g>
  );

  const gps = (
    <g>
      <rect x="55" y="60" width="90" height="80" rx="4" fill="#0a0a0a" stroke={high} />
      <rect x="65" y="70" width="70" height="50" fill={accent} opacity=".25" />
      <path d="M 70 90 L 100 75 L 130 100 L 100 115 Z" fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx="100" cy="92" r="3" fill={accent} />
      <text x="100" y="135" fill="#fff" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">
        10Hz GNSS
      </text>
    </g>
  );

  const hud = (
    <g>
      <path d="M 30 90 L 170 60 L 170 130 L 30 110 Z" fill="#0a0a0a" stroke={high} opacity=".9" />
      <text x="100" y="100" fill={accent} fontSize="22" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="600">
        142
      </text>
      <text x="100" y="115" fill="#fff" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2">
        KM/H · 6500 RPM
      </text>
    </g>
  );

  const jacket = (
    <g>
      <path
        d="M 70 40 L 100 50 L 130 40 L 160 60 L 145 100 L 145 170 L 55 170 L 55 100 L 40 60 Z"
        fill="#0a0a0a"
        stroke={high}
      />
      <path d="M 100 50 L 100 170" stroke={accent} strokeWidth="2" />
      <path d="M 80 80 L 80 130 M 120 80 L 120 130" stroke={accent} strokeWidth="1.5" />
      <text x="100" y="65" fill={accent} fontSize="8" fontFamily="Anton" textAnchor="middle">
        VELOCE
      </text>
    </g>
  );

  const cap = (
    <g>
      <path d="M 50 110 Q 100 60 150 110 L 150 130 L 50 130 Z" fill="#0a0a0a" stroke={high} />
      <path d="M 50 130 L 30 145 L 170 145 L 150 130" fill="#0a0a0a" stroke={high} />
      <text x="100" y="115" fill={accent} fontSize="14" fontFamily="Anton" textAnchor="middle">
        V
      </text>
    </g>
  );

  const model = (
    <g>
      <rect x="20" y="120" width="160" height="10" fill="#1a1a1a" stroke={high} />
      <rect x="20" y="130" width="160" height="20" fill="#0a0a0a" stroke={high} />
      <path d="M 35 110 L 50 90 L 150 90 L 165 110 Z" fill={accent} stroke={high} />
      <path d="M 65 90 L 80 78 L 130 78 L 145 90" fill="#0a0a0a" stroke={high} />
      <circle cx="60" cy="115" r="7" fill="#0a0a0a" stroke={high} />
      <circle cx="140" cy="115" r="7" fill="#0a0a0a" stroke={high} />
      <text x="100" y="145" fill={accent} fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2">
        1:18 · /500
      </text>
    </g>
  );

  const key = (
    <g>
      <rect x="65" y="50" width="70" height="100" rx="6" fill="#0a0a0a" stroke={high} />
      <text x="100" y="100" fill={accent} fontSize="32" fontFamily="Anton" textAnchor="middle">
        V
      </text>
      <rect x="92" y="150" width="16" height="14" fill="#222" stroke={high} />
    </g>
  );

  const pen = (
    <g>
      <rect x="18" y="92" width="14" height="16" fill="#888" stroke={high} />
      <rect x="14" y="96" width="6" height="8" fill={accent} />
      <rect x="32" y="88" width="10" height="24" fill="#1a1a1a" stroke={high} />
      <rect x="42" y="86" width="4" height="28" fill={accent} />
      <rect x="46" y="80" width="100" height="40" fill="#1a1a1a" stroke={high} />
      <rect x="52" y="86" width="48" height="20" fill="#000" stroke={accent} strokeWidth=".5" />
      <text x="76" y="100" fill={accent} fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" textAnchor="middle">
        142.6
      </text>
      <text x="98" y="93" fill={accent} fontSize="4" fontFamily="JetBrains Mono" textAnchor="end">
        µm
      </text>
      <rect x="104" y="88" width="14" height="6" fill={accent} />
      <rect x="104" y="96" width="14" height="6" fill="#0a0a0a" stroke="#444" strokeWidth=".5" />
      <rect x="120" y="88" width="20" height="14" fill="#0a0a0a" stroke="#444" strokeWidth=".5" />
      <text x="130" y="98" fill="#fff" fontSize="5" fontFamily="JetBrains Mono" textAnchor="middle">
        REC
      </text>
      <rect x="146" y="84" width="32" height="32" fill="#262626" stroke={high} />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={150 + i * 5} y1="84" x2={150 + i * 5} y2="116" stroke="#444" strokeWidth=".5" />
      ))}
      <rect x="178" y="86" width="4" height="28" fill={accent} />
      <rect x="182" y="88" width="6" height="24" fill="#1a1a1a" stroke={high} />
      <text x="100" y="150" fill={accent} fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="3">
        PT-01
      </text>
      <text
        x="100"
        y="162"
        fill="#fff"
        fontSize="6"
        fontFamily="JetBrains Mono"
        textAnchor="middle"
        letterSpacing="2"
        opacity=".5"
      >
        PRECISION PEN
      </text>
    </g>
  );

  const shapeMap: Record<string, JSX.Element> = {
    wheel,
    wing,
    splitter,
    kit,
    bottle,
    jar,
    cloth,
    seat,
    mat,
    knob,
    cam,
    speaker,
    gps,
    hud,
    jacket,
    cap,
    model,
    key,
    pen,
  };
  return <Frame>{shapeMap[shape] || bottle}</Frame>;
}

export function PaintPen({ accent = '#c1121f', glow = true }: { accent?: string; glow?: boolean }) {
  const W = 1200;
  const H = 320;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="penBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset=".15" stopColor="#4a4a4a" />
          <stop offset=".5" stopColor="#1a1a1a" />
          <stop offset=".85" stopColor="#4a4a4a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="penGrip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset=".5" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
        <linearGradient id="penTip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#444" />
          <stop offset=".5" stopColor="#888" />
          <stop offset="1" stopColor="#222" />
        </linearGradient>
        <linearGradient id="oledBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset=".5" stopColor="#0a0d0a" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="capRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset=".5" stopColor="#fff" stopOpacity=".4" />
          <stop offset="1" stopColor={accent} />
        </linearGradient>
      </defs>

      <ellipse cx="600" cy="280" rx="500" ry="6" fill="#000" opacity=".4" />

      <g>
        <path d="M 60 158 L 100 152 L 100 168 L 60 162 Z" fill="url(#penTip)" stroke="#999" strokeWidth=".5" />
        <circle cx="62" cy="160" r="4" fill="#aaa" stroke="#fff" strokeWidth=".4" />
        <circle cx="62" cy="160" r="2" fill={accent} />

        <path d="M 100 148 L 130 145 L 130 175 L 100 172 Z" fill="#1a1a1a" stroke="#666" strokeWidth=".5" />
        <line x1="115" y1="145" x2="115" y2="175" stroke="#444" />

        <rect x="130" y="142" width="14" height="36" fill="url(#capRing)" stroke="#000" strokeWidth=".5" />

        <path d="M 144 130 L 880 130 L 880 190 L 144 190 Z" fill="url(#penBody)" stroke="#666" strokeWidth=".5" />

        <rect x="190" y="142" width="280" height="36" fill="url(#oledBg)" stroke={accent} strokeWidth="1" />
        <rect x="190" y="142" width="280" height="36" fill="none" stroke="#000" strokeWidth=".5" />
        <g>
          <text x="195" y="156" fill={accent} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">
            FE · BARE STEEL
          </text>
          <text
            x="430"
            y="156"
            fill={accent}
            fontFamily="JetBrains Mono, monospace"
            fontSize="8"
            letterSpacing="2"
            textAnchor="end"
          >
            µm
          </text>
          <text x="195" y="174" fill="#fff" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="20" letterSpacing="3">
            142.6
          </text>
          <text x="467" y="174" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="end">
            ●REC
          </text>
        </g>
        <line x1="190" y1="160" x2="470" y2="160" stroke={accent} strokeWidth=".3" opacity=".25" />

        <text x="495" y="148" fill="#888" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="2">
          VELOCE
        </text>
        <text x="495" y="158" fill="#fff" fontFamily="Anton, sans-serif" fontSize="14" letterSpacing="2">
          PRECISION PEN
        </text>
        <text x="495" y="172" fill="#666" fontFamily="JetBrains Mono, monospace" fontSize="5" letterSpacing="2">
          MOD. PT-01 · MILANO
        </text>

        <g transform="translate(640, 138)">
          <rect x="0" y="0" width="34" height="14" rx="2" fill="#0a0a0a" stroke="#666" strokeWidth=".5" />
          <text x="17" y="10" fill="#fff" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="1">
            µm
          </text>
          <rect x="0" y="18" width="34" height="14" rx="2" fill="#0a0a0a" stroke="#666" strokeWidth=".5" />
          <text x="17" y="28" fill="#fff" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="1">
            MIL
          </text>
          <rect x="40" y="0" width="34" height="32" rx="2" fill={accent} stroke="#000" strokeWidth=".5" />
          <text
            x="57"
            y="20"
            fill="#fff"
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
            textAnchor="middle"
            fontWeight="600"
          >
            REC
          </text>
          <circle cx="105" cy="6" r="5" fill="#0a0a0a" stroke="#666" strokeWidth=".5" />
          <text x="105" y="9" fill="#fff" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            ▲
          </text>
          <circle cx="105" cy="26" r="5" fill="#0a0a0a" stroke="#666" strokeWidth=".5" />
          <text x="105" y="29" fill="#fff" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            ▼
          </text>
        </g>

        <g transform="translate(770, 138)">
          <rect x="0" y="0" width="20" height="9" fill="none" stroke="#666" strokeWidth=".5" />
          <rect x="1" y="1" width="14" height="7" fill={accent} />
          <rect x="20" y="3" width="2" height="5" fill="#666" />
          <text x="0" y="20" fill="#888" fontSize="6" fontFamily="JetBrains Mono, monospace">
            BT · LOG · CAL
          </text>
        </g>

        <rect x="880" y="135" width="180" height="50" fill="url(#penGrip)" stroke="#444" strokeWidth=".5" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1={886 + i * 7.5} y1="138" x2={886 + i * 7.5} y2="182" stroke="#666" strokeWidth=".4" />
        ))}
        <line x1="880" y1="135" x2="880" y2="185" stroke={accent} strokeWidth="1.2" />
        <line x1="1060" y1="135" x2="1060" y2="185" stroke={accent} strokeWidth="1.2" />

        <rect x="1060" y="142" width="10" height="36" fill="url(#capRing)" stroke="#000" strokeWidth=".5" />

        <path d="M 1070 138 L 1110 142 L 1130 152 L 1130 168 L 1110 178 L 1070 182 Z" fill="url(#penBody)" stroke="#666" strokeWidth=".5" />
        <circle cx="1118" cy="160" r="4" fill="#0a0a0a" stroke="#666" strokeWidth=".5" />
        <circle cx="1118" cy="160" r="2" fill={accent} />

        <path d="M 144 132 L 1060 132" stroke="#fff" strokeWidth=".6" opacity=".25" />
        <path d="M 144 188 L 1060 188" stroke="#000" strokeWidth=".6" opacity=".5" />

        <text x="500" y="208" fill="#666" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
          N° 0007 / 500 · ENGINEERED IN MILANO · CALIBRATED IN VAIRANO
        </text>
      </g>

      {glow && <circle cx="62" cy="160" r="14" fill={accent} opacity=".25" />}
    </svg>
  );
}
