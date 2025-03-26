/**
 * Implementação oficial do Vercel Speed Insights para Next.js
 *
 * Este arquivo serve como referência para quando migrar o projeto para Next.js.
 * Para usar este código:
 * 1. Instale o pacote: npm install @vercel/speed-insights
 * 2. Coloque este código no arquivo app/layout.js (Next.js App Router)
 *    ou pages/_app.js (Next.js Pages Router)
 *
 * Para mais informações, consulte a documentação oficial:
 * https://vercel.com/docs/speed-insights
 */

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

/**
 * Alternativa para uso com Pages Router (pages/_app.js):
 *
 * import { SpeedInsights } from '@vercel/speed-insights/next';
 *
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <>
 *       <Component {...pageProps} />
 *       <SpeedInsights />
 *     </>
 *   );
 * }
 *
 * export default MyApp;
 */
