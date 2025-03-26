/**
 * Vercel Speed Insights Integration
 *
 * Este script inicializa o Vercel Speed Insights para monitorar métricas de
 * desempenho do site como Core Web Vitals (LCP, FID, CLS, TTFB).
 *
 * O Speed Insights é uma ferramenta da Vercel que ajuda a:
 * - Identificar problemas de desempenho em seu site
 * - Melhorar a experiência do usuário
 * - Monitorar métricas reais de usuários (RUM)
 * - Visualizar tendências de desempenho ao longo do tempo
 */

(function () {
  try {
    // Inicializar o Vercel Speed Insights
    // Para sites não hospedados na Vercel, usamos o CDN direto
    const script = document.createElement("script");
    script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
    script.defer = true;
    script.setAttribute("data-website-id", "portfolio-matheusol"); // Substitua pelo seu ID se tiver um
    document.head.appendChild(script);

    console.log("Vercel Speed Insights initialized");
  } catch (error) {
    console.error("Failed to initialize Vercel Speed Insights:", error);
  }
})();

// Exportar uma função para inicializar manualmente, se necessário
window.initSpeedInsights = function () {
  try {
    if (!document.querySelector('script[src*="vitals.vercel-insights.com"]')) {
      const script = document.createElement("script");
      script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
      script.defer = true;
      script.setAttribute("data-website-id", "portfolio-matheusol"); // Substitua pelo seu ID se tiver um
      document.head.appendChild(script);

      console.log("Vercel Speed Insights manually initialized");
    }
  } catch (error) {
    console.error(
      "Failed to manually initialize Vercel Speed Insights:",
      error
    );
  }
};
