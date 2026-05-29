import type {Metadata} from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Virtus Lux | Rituais Coletivos de Alta Potência',
  description: 'Assinatura premium de rituais coletivos liderados pelo magista Destro Mago.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const fetchPatchScript = `
    (function() {
      try {
        if (typeof window !== 'undefined' && window.fetch) {
          var originalFetch = window.fetch;
          var fetchVal = originalFetch;
          Object.defineProperty(window, 'fetch', {
            get: function() { return fetchVal; },
            set: function(v) { fetchVal = v; },
            configurable: true,
            enumerable: true
          });
        }
      } catch (e) {
        console.warn('Fetch check bypassed:', e);
      }
    })();
  `;

  return (
    <html lang="pt-BR" className={`${cormorantGaramond.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: fetchPatchScript }} suppressHydrationWarning />
      </head>
      <body className="bg-black text-gray-100 min-h-screen font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
