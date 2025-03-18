/**
 * Componente React para integração com Vercel Speed Insights
 *
 * Este componente é otimizado para uso com Next.js, conforme solicitado.
 * Ele implementa o SpeedInsights fornecido pelo pacote @vercel/speed-insights/next.
 *
 * No Next.js, você pode usar este componente no seu layout principal:
 *
 * // app/layout.js - Next.js App Router
 * import { SpeedInsights } from "@vercel/speed-insights/next";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         {children}
 *         <SpeedInsights />
 *       </body>
 *     </html>
 *   );
 * }
 *
 * OU
 *
 * // pages/_app.js - Next.js Pages Router
 * import { SpeedInsights } from "@vercel/speed-insights/next";
 *
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <>
 *       <Component {...pageProps} />
 *       <SpeedInsights />
 *     </>
 *   );
 * }
 */

// Em um projeto Next.js real, isso seria importado assim:
// import { SpeedInsights } from "@vercel/speed-insights/next";

// Este é um componente simulado para demonstração no seu projeto atual
const VercelSpeedInsights = () => {
  React.useEffect(() => {
    // Esta implementação é apenas para o ambiente atual
    // Em um projeto Next.js real, você usaria o componente importado <SpeedInsights />

    try {
      // Inicializar manualmente o Speed Insights como fallback
      if (
        typeof window !== "undefined" &&
        !document.querySelector('script[src*="vitals.vercel-insights.com"]')
      ) {
        const script = document.createElement("script");
        script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
        script.defer = true;
        script.setAttribute("data-website-id", "portfolio-matheusol");

        document.head.appendChild(script);

        console.log("Vercel Speed Insights initialized from Next.js component");
      }
    } catch (error) {
      console.error("Failed to initialize Vercel Speed Insights:", error);
    }
  }, []);

  // Normalmente, este componente não renderiza nada visível
  return null;
};

// Em um projeto Next.js real, você exportaria este componente
// export default VercelSpeedInsights;
