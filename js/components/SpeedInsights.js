/**
 * Vercel Speed Insights Integration
 *
 * Este componente integra o Vercel Speed Insights ao site, permitindo
 * monitorar métricas de desempenho e experiência do usuário em tempo real.
 *
 * O Vercel Speed Insights coleta métricas Core Web Vitals como:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - TTFB (Time to First Byte)
 *
 * Para usar em um projeto React completo:
 * import { SpeedInsights } from "@vercel/speed-insights/react";
 *
 * E então adicionar: <SpeedInsights />
 */

// Componente para inicializar o Vercel Speed Insights
window.SpeedInsightsComponent = ({ children }) => {
  React.useEffect(() => {
    try {
      // Verificar se o script já foi carregado
      if (
        !document.querySelector('script[src*="vitals.vercel-insights.com"]')
      ) {
        // Carregar o script do Vercel Speed Insights
        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
        // ID do website (opcional, substitua pelo seu ID se tiver um)
        script.setAttribute("data-website-id", "portfolio-matheusol");

        // Adicionar o script ao documento
        document.head.appendChild(script);

        console.log("Vercel Speed Insights initialized from React component");
      }
    } catch (error) {
      console.error("Failed to initialize Vercel Speed Insights:", error);
    }
  }, []);

  return children;
};

// Função para inicializar o Speed Insights manualmente (para não-React)
window.initSpeedInsights = function () {
  try {
    // Verificar se o script já foi carregado
    if (!document.querySelector('script[src*="vitals.vercel-insights.com"]')) {
      // Carregar o script do Vercel Speed Insights
      const script = document.createElement("script");
      script.defer = true;
      script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
      // ID do website (opcional, substitua pelo seu ID se tiver um)
      script.setAttribute("data-website-id", "portfolio-matheusol");

      // Adicionar o script ao documento
      document.head.appendChild(script);

      console.log("Vercel Speed Insights manually initialized");
    }
  } catch (error) {
    console.error("Failed to initialize Vercel Speed Insights:", error);
  }
};
