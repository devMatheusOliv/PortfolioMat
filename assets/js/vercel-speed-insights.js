// vercel-speed-insights.js
// Script para integração com Vercel Speed Insights

(function () {
  // Configura o objeto do Speed Insights
  window.si =
    window.si ||
    function () {
      (window.siq = window.siq || []).push(arguments);
    };

  // Função para carregar o script do Speed Insights
  function loadSpeedInsights() {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/speed-insights/script.js";
    document.head.appendChild(script);
  }

  // Carrega o script quando o documento estiver pronto
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    loadSpeedInsights();
  } else {
    document.addEventListener("DOMContentLoaded", loadSpeedInsights);
  }

  // Configura o evento de rastreamento de navegação
  window.addEventListener("load", function () {
    try {
      window.si("trackPageView");
    } catch (e) {
      console.error("Erro ao rastrear visualização de página:", e);
    }
  });

  // Inicializa automaticamente o Speed Insights
  window.si("config", {
    autoTrack: true,
  });
})();
