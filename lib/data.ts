export type Category = {
  id: string;
  code: string;
  name: string;
  blurb: string;
  count: number;
};

export type Product = {
  id: string;
  sku: string;
  cat: string;
  name: string;
  line: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
  material: string;
  fit: string;
  accent: string;
  shape: string;
};

export const CATEGORIES: Category[] = [
  { id: 'exterior', code: '01', name: 'Exterior', blurb: 'Aero, paint, body kits', count: 128 },
  { id: 'interior', code: '02', name: 'Interior', blurb: 'Wheels, seats, trim, mats', count: 214 },
  { id: 'detailing', code: '03', name: 'Detailing', blurb: 'Ceramic, wax, microfibre', count: 86 },
  { id: 'tech', code: '04', name: 'Tech', blurb: 'Dashcams, audio, telemetry', count: 47 },
  { id: 'lifestyle', code: '05', name: 'Lifestyle', blurb: 'Apparel, scale models, gear', count: 112 },
];

export const PRODUCTS: Product[] = [
  { id: 'p00', sku: 'VLC-PT-0001', cat: 'tech', name: 'VELOCE Precision Pen', line: 'Inspection', price: 690, oldPrice: null, badge: 'FLAGSHIP', material: 'Anodised Aluminium · OLED', fit: 'Fe + non-Fe metals', accent: '#c1121f', shape: 'pen' },

  { id: 'p01', sku: 'VLC-AE-0118', cat: 'exterior', name: 'Carbon Aero Splitter Mk II', line: 'Aerodynamics', price: 1840, oldPrice: 2100, badge: 'NEW', material: 'Pre-preg Carbon', fit: 'Universal · Track', accent: '#c1121f', shape: 'splitter' },
  { id: 'p02', sku: 'VLC-WG-0204', cat: 'exterior', name: 'GT Swan-Neck Rear Wing', line: 'Aerodynamics', price: 3290, oldPrice: null, badge: 'TRACK', material: 'Forged Carbon', fit: 'Universal', accent: '#e10600', shape: 'wing' },
  { id: 'p03', sku: 'VLC-PP-0301', cat: 'exterior', name: 'Ceramic Paint Shield 9H', line: 'Protection', price: 240, oldPrice: null, badge: null, material: 'SiO₂ 92%', fit: 'All paint', accent: '#c9952b', shape: 'bottle' },
  { id: 'p04', sku: 'VLC-BK-0444', cat: 'exterior', name: 'Trofeo Body Kit — Full', line: 'Body kits', price: 6890, oldPrice: 7400, badge: 'BESTSELLER', material: 'Hybrid Carbon', fit: 'Coupé bodies', accent: '#c1121f', shape: 'kit' },

  { id: 'p05', sku: 'VLC-SW-1112', cat: 'interior', name: 'Alcantara Race Steering Wheel', line: 'Cockpit', price: 1240, oldPrice: null, badge: 'NEW', material: 'Alcantara · Carbon', fit: '52mm hub', accent: '#c1121f', shape: 'wheel' },
  { id: 'p06', sku: 'VLC-ST-1208', cat: 'interior', name: 'Veloce Bucket Seat — Forged', line: 'Cockpit', price: 2890, oldPrice: null, badge: 'TRACK', material: 'Forged Carbon', fit: 'FIA 8855', accent: '#0a0a0a', shape: 'seat' },
  { id: 'p07', sku: 'VLC-MT-1330', cat: 'interior', name: 'Heritage Floor Mat Set', line: 'Trim', price: 280, oldPrice: 340, badge: null, material: 'Wool · Leather', fit: 'Custom cut', accent: '#c9952b', shape: 'mat' },
  { id: 'p08', sku: 'VLC-SH-1404', cat: 'interior', name: 'Titanium Short-Shift Knob', line: 'Cockpit', price: 420, oldPrice: null, badge: null, material: 'Grade 5 Ti', fit: 'M10 × 1.25', accent: '#8a8a8a', shape: 'knob' },

  { id: 'p09', sku: 'VLC-CR-2001', cat: 'detailing', name: 'Apex Ceramic Coat 5yr', line: 'Coatings', price: 340, oldPrice: null, badge: 'BESTSELLER', material: 'SiO₂ 88%', fit: '30ml kit', accent: '#c1121f', shape: 'bottle' },
  { id: 'p10', sku: 'VLC-WX-2014', cat: 'detailing', name: 'Carnauba Show Wax', line: 'Waxes', price: 95, oldPrice: null, badge: null, material: 'Carnauba T1', fit: '200g jar', accent: '#c9952b', shape: 'jar' },
  { id: 'p11', sku: 'VLC-MF-2122', cat: 'detailing', name: 'Twisted Loop Microfibre × 6', line: 'Tools', price: 48, oldPrice: null, badge: null, material: '480 GSM', fit: '40×40cm', accent: '#ffffff', shape: 'cloth' },
  { id: 'p12', sku: 'VLC-WS-2244', cat: 'detailing', name: 'pH-Neutral Snow Foam', line: 'Wash', price: 38, oldPrice: null, badge: null, material: 'Surfactant blend', fit: '1L', accent: '#ffffff', shape: 'bottle' },

  { id: 'p13', sku: 'VLC-DC-3010', cat: 'tech', name: 'Telemetry Dashcam 4K Dual', line: 'Vision', price: 690, oldPrice: 780, badge: 'NEW', material: 'Aluminium body', fit: 'CAN-bus', accent: '#c1121f', shape: 'cam' },
  { id: 'p14', sku: 'VLC-AU-3122', cat: 'tech', name: 'Reference 2.1 Audio Upgrade', line: 'Audio', price: 1490, oldPrice: null, badge: null, material: 'Beryllium tweeter', fit: 'OEM dash', accent: '#c1121f', shape: 'speaker' },
  { id: 'p15', sku: 'VLC-LG-3208', cat: 'tech', name: 'Lap Logger GPS — Pro', line: 'Telemetry', price: 540, oldPrice: null, badge: 'TRACK', material: '10Hz GNSS', fit: 'OBD-II', accent: '#c1121f', shape: 'gps' },
  { id: 'p16', sku: 'VLC-HD-3311', cat: 'tech', name: 'Sequential Heads-Up Display', line: 'Vision', price: 420, oldPrice: null, badge: null, material: 'Polycarbonate', fit: 'Universal', accent: '#e10600', shape: 'hud' },

  { id: 'p17', sku: 'VLC-AP-4015', cat: 'lifestyle', name: 'Team VELOCE Race Jacket', line: 'Apparel', price: 340, oldPrice: null, badge: 'NEW', material: 'Tech twill', fit: 'XS — XXL', accent: '#c1121f', shape: 'jacket' },
  { id: 'p18', sku: 'VLC-AP-4112', cat: 'lifestyle', name: 'Pit Crew Cap — Embroidered', line: 'Apparel', price: 58, oldPrice: null, badge: null, material: 'Wool blend', fit: 'One size', accent: '#0a0a0a', shape: 'cap' },
  { id: 'p19', sku: 'VLC-MD-4210', cat: 'lifestyle', name: '1:18 Heritage Race Model', line: 'Collectibles', price: 420, oldPrice: null, badge: 'LIMITED', material: 'Resin · Photo-etch', fit: 'Numbered /500', accent: '#c9952b', shape: 'model' },
  { id: 'p20', sku: 'VLC-KC-4318', cat: 'lifestyle', name: 'Forged Carbon Keyfob', line: 'Accessories', price: 78, oldPrice: null, badge: null, material: 'Forged Carbon', fit: 'Standard', accent: '#0a0a0a', shape: 'key' },
];

export const FEATURED = ['p00', 'p02', 'p05', 'p13', 'p09', 'p17'];

export const HERO_PRODUCT_ID = 'p00';

export const COLLECTIONS = [
  { id: 'apex', name: 'APEX', subtitle: 'Track-spec aero', cat: 'exterior', red: true },
  { id: 'forged', name: 'FORGED', subtitle: 'Carbon cockpit', cat: 'interior' },
  { id: 'mirror', name: 'MIRROR', subtitle: 'Concours-grade detailing', cat: 'detailing' },
  { id: 'apex-sig', name: 'TELEMETRY', subtitle: 'Race-bred electronics', cat: 'tech' },
];

export const TICKER = [
  'NEW · VELOCE PRECISION PEN — KNOW BEFORE YOU BUY',
  'PAINT INSPECTION · 0.1µm RESOLUTION',
  'TRACK SEASON 26 — ORDER NOW',
  'FREE SHIPPING OVER €250',
  '5YR CALIBRATION WARRANTY',
  'WORLDWIDE DELIVERY · 47 COUNTRIES',
];

export const fmt = (n: number) => '€' + n.toLocaleString('en-US');
