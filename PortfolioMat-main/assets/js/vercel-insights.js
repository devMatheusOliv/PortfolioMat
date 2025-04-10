/**
 * Vercel Speed Insights - Implementação robusta
 *
 * Este script inicializa o Vercel Speed Insights independentemente do ambiente
 * (desenvolvimento local ou produção na Vercel).
 *
 * Baseado na documentação oficial: https://vercel.com/docs/speed-insights
 */

(function () {
  // Definir a função global do Speed Insights
  window.si =
    window.si ||
    function () {
      (window.siq = window.siq || []).push(arguments);
    };

  // Verificar se o script já foi carregado
  if (document.querySelector('script[src*="speed-insights-sdk.vercel.app"]')) {
    console.log("Vercel Speed Insights já está carregado");
    return;
  }

  try {
    // Carregar o script do Speed Insights do CDN público
    // Este CDN funciona em qualquer ambiente, incluindo sites não hospedados na Vercel
    console.log("Inicializando Vercel Speed Insights...");
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://speed-insights-sdk.vercel.app/v1/script.js";

    // Configurações opcionais
    script.setAttribute("data-website-id", "portfolio-matheusol");

    // Adicionar o script ao documento
    document.head.appendChild(script);

    console.log("Vercel Speed Insights inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o Vercel Speed Insights:", error);
  }
})();
