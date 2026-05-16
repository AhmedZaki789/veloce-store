'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export function useLiveReading(center = 142.6, variance = 4.2, period = 1800) {
  const [val, setVal] = useState(center);
  useEffect(() => {
    let raf: number;
    const t0 = performance.now();
    const tick = () => {
      const t = (performance.now() - t0) / period;
      const v =
        center +
        Math.sin(t * 2.1) * variance * 0.6 +
        Math.sin(t * 5.3) * variance * 0.25 +
        Math.sin(t * 11.7) * variance * 0.15;
      setVal(Math.round(v * 10) / 10);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [center, variance, period]);
  return val;
}

export function ScanBeam({
  accent = '#c1121f',
  intensity = 1,
  paused = false,
}: {
  accent?: string;
  intensity?: number;
  paused?: boolean;
}) {
  if (intensity <= 0 || paused) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          bottom: '-10%',
          width: 240,
          left: '-240px',
          background: `linear-gradient(90deg, transparent 0%, ${accent}33 35%, ${accent}aa 50%, ${accent}33 65%, transparent 100%)`,
          filter: 'blur(1px)',
          animation: `v-scan-h ${8 / intensity}s cubic-bezier(.6,.05,.4,.95) infinite`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 2,
          left: '-2px',
          background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 14px ${accent}`,
          animation: `v-scan-h ${8 / intensity}s cubic-bezier(.6,.05,.4,.95) infinite`,
          animationDelay: '-.05s',
        }}
      />
    </div>
  );
}

export function HeroReticle({ accent = '#c1121f' }: { accent?: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reading = useLiveReading(142.6, 26, 900);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x >= 0 && y >= 0 && x <= r.width && y <= r.height) setPos({ x, y });
      else setPos(null);
    };
    const leave = () => setPos(null);
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!pos) return <span ref={ref} />;
  return (
    <>
      <span ref={ref} />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 8,
          transition: 'opacity .15s',
        }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ display: 'block' }}>
          <circle cx="28" cy="28" r="22" fill="none" stroke={accent} strokeWidth="1" opacity=".55" />
          <circle cx="28" cy="28" r="2.5" fill={accent} />
          <line x1="28" y1="0" x2="28" y2="20" stroke={accent} strokeWidth="1" />
          <line x1="28" y1="36" x2="28" y2="56" stroke={accent} strokeWidth="1" />
          <line x1="0" y1="28" x2="20" y2="28" stroke={accent} strokeWidth="1" />
          <line x1="36" y1="28" x2="56" y2="28" stroke={accent} strokeWidth="1" />
          {[0, 90, 180, 270].map((a) => {
            const r1 = 24;
            const r2 = 28;
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={28 + Math.cos(rad) * r1}
                y1={28 + Math.sin(rad) * r1}
                x2={28 + Math.cos(rad) * r2}
                y2={28 + Math.sin(rad) * r2}
                stroke={accent}
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 36,
            top: -4,
            padding: '4px 10px',
            background: '#000',
            border: `1px solid ${accent}`,
            fontFamily: 'var(--v-mono)',
            fontSize: 11,
            color: accent,
            letterSpacing: '.15em',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 14px ${accent}66`,
          }}
        >
          <span style={{ opacity: 0.55, marginRight: 6, fontSize: 9 }}>FE·µm</span>
          {reading.toFixed(1)}
        </div>
      </div>
    </>
  );
}

export function RevealOnScroll({
  children,
  delay = 0,
  distance = 24,
  style,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${distance}px)`,
        transition: `opacity .8s var(--v-ease-out) ${delay}ms, transform .8s var(--v-ease-out) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CountUp({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t0 = performance.now();
            const tick = () => {
              const t = Math.min(1, (performance.now() - t0) / duration);
              const k = 1 - Math.pow(1 - t, 3);
              setVal(from + (to - from) * k);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, from, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function TypeOn({
  text,
  speed = 35,
  start = true,
  className,
  style,
}: {
  text: string;
  speed?: number;
  start?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed + Math.random() * 15);
    };
    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [text, speed, start]);
  return (
    <span className={className} style={style}>
      {text.slice(0, n)}
      {n < text.length && <span style={{ opacity: Math.floor(Date.now() / 400) % 2 ? 1 : 0 }}>▍</span>}
    </span>
  );
}

export function BootSequence({ accent = '#c1121f' }: { accent?: string }) {
  const [done, setDone] = useState<boolean>(true);
  const [lines, setLines] = useState<string[]>([]);
  const script = useMemo(
    () => [
      { t: '  > VLC-PT-0001 / boot.firmware', d: 300 },
      { t: '  > probe.calibrate ............ OK', d: 600 },
      { t: '  > sensor.fe + non-fe ......... OK', d: 600 },
      { t: '  > oled.init  1280×320 ........ OK', d: 550 },
      { t: '  > bluetooth.handshake ........ OK', d: 500 },
      { t: '  > linking workshop · milano .. OK', d: 500 },
      { t: '  > READY.', d: 400 },
    ],
    [],
  );

  useEffect(() => {
    const booted = typeof window !== 'undefined' && sessionStorage.getItem('veloce_booted') === '1';
    if (booted) {
      setDone(true);
      return;
    }
    setDone(false);
    let cancelled = false;
    let i = 0;
    const next = () => {
      if (cancelled) return;
      if (i >= script.length) {
        setTimeout(() => {
          if (!cancelled) {
            setDone(true);
            sessionStorage.setItem('veloce_booted', '1');
          }
        }, 400);
        return;
      }
      setLines((prev) => [...prev, script[i].t]);
      const d = script[i].d;
      i++;
      setTimeout(next, d);
    };
    setTimeout(next, 150);
    return () => {
      cancelled = true;
    };
  }, [script]);

  if (done) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'v-fade .3s',
      }}
    >
      <div
        style={{
          maxWidth: 640,
          width: '92%',
          fontFamily: 'var(--v-mono)',
          fontSize: 13,
          color: '#d8d8d8',
          letterSpacing: '.05em',
          lineHeight: 1.9,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 18,
            marginBottom: 18,
            borderBottom: `1px solid ${accent}`,
            paddingBottom: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--v-display)', fontSize: 32, color: '#fff', letterSpacing: '.08em' }}>VELOCE</span>
          <span style={{ color: accent, fontSize: 10, letterSpacing: '.3em' }}>● BOOT 0007</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5 }}>
            {new Date().toISOString().slice(0, 19).replace('T', ' ')}
          </span>
        </div>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              color: l.includes('READY') ? accent : l.includes('OK') ? '#7adf7a' : '#aaa',
              opacity: 0,
              animation: 'v-fadeup .25s var(--v-ease-out) both',
              fontWeight: l.includes('READY') ? 700 : 400,
            }}
          >
            {l}
          </div>
        ))}
        <div style={{ marginTop: 24, height: 3, background: '#1a1a1a', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              background: accent,
              width: `${Math.min(100, (lines.length / 7) * 100)}%`,
              transition: 'width .4s',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Glitch({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 1,
          top: 0,
          color: 'var(--v-red)',
          mixBlendMode: 'screen',
          opacity: 0,
          animation: 'v-glitch-a 2.6s infinite',
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: -1,
          top: 0,
          color: '#3df',
          mixBlendMode: 'screen',
          opacity: 0,
          animation: 'v-glitch-b 2.6s infinite',
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function DataStream({ accent = '#c1121f' }: { accent?: string }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setT((v) => v + 1), 80);
    return () => clearInterval(i);
  }, []);
  const rows = [
    { k: 'PROBE', v: 'FE-AUTO' },
    { k: 'SAMPLE', v: (Math.sin(t / 9) * 40 + 142.6).toFixed(1) + ' µm' },
    { k: 'RANGE', v: '0–2000 µm' },
    { k: 'CAL', v: 'NIST-TR' },
    { k: 'BATTERY', v: (98 - (t % 240) / 60).toFixed(0) + ' %' },
    { k: 'BT-LINK', v: 'PAIRED' },
    { k: 'SAMPLES', v: String(2400 + ((t * 3) % 800)) },
    { k: 'STORE', v: 'MILANO HQ' },
    { k: 'TEMP', v: (21 + Math.sin(t / 13) * 0.4).toFixed(1) + ' °C' },
  ];
  return (
    <div
      style={{
        fontFamily: 'var(--v-mono)',
        fontSize: 10,
        letterSpacing: '.18em',
        color: 'rgba(255,255,255,.78)',
        textAlign: 'right',
        lineHeight: 1.95,
      }}
    >
      <div style={{ color: accent, marginBottom: 4, fontSize: 9, letterSpacing: '.3em' }}>◢ LIVE TELEMETRY</div>
      {rows.map((r) => (
        <div key={r.k} style={{ display: 'flex', justifyContent: 'flex-end', gap: 14 }}>
          <span style={{ opacity: 0.4 }}>{r.k}</span>
          <span style={{ minWidth: 90, display: 'inline-block', textAlign: 'right' }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}
