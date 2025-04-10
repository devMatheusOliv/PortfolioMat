/**
 * Vercel Analytics Integration
 *
 * Este script integra o Vercel Analytics ao site, permitindo rastrear visitas e interações
 * dos usuários de forma anônima e respeitando a privacidade.
 *
 * O Vercel Analytics é uma ferramenta leve que não impacta o desempenho do site
 * e fornece insights valiosos sobre o tráfego do site.
 *
 * Para mais informações, visite: https://vercel.com/analytics
 */

(function () {
  // Função para carregar o script do Vercel Analytics
  function loadVercelAnalytics() {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/insights/script.js";
    document.head.appendChild(script);
  }

  // Função para configurar o Vercel Speed Insights
  function setupSpeedInsights() {
    window.si =
      window.si ||
      function () {
        (window.siq = window.siq || []).push(arguments);
      };
  }

  // Carrega os scripts quando o documento estiver pronto
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    loadVercelAnalytics();
  } else {
    document.addEventListener("DOMContentLoaded", loadVercelAnalytics);
  }

  // Configura o Speed Insights
  setupSpeedInsights();
})();
