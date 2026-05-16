import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MiniCart, FlashToast } from '@/components/MiniCart';

export const metadata: Metadata = {
  title: 'VELOCE — Performance & Style',
  description:
    'Engineered in Milano. Track-tested. Concours-finished. Premium car accessories — aero, cockpit, detailing, telemetry, lifestyle.',
  metadataBase: new URL('https://veloce.cc'),
  openGraph: {
    title: 'VELOCE — Performance & Style',
    description: 'Premium car accessories engineered in Milano.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,700;6..96,800&family=Syncopate:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </div>
          <MiniCart />
          <FlashToast />
        </CartProvider>
      </body>
    </html>
  );
}
