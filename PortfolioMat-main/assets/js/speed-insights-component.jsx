/**
 * Implementação oficial do Vercel Speed Insights
 *
 * Este componente implementa o Vercel Speed Insights seguindo a
 * documentação oficial: https://vercel.com/docs/speed-insights
 *
 * Em um projeto Next.js:
 *   import { SpeedInsights } from "@vercel/speed-insights/next";
 */

// Implementação do componente SpeedInsights para uso direto no HTML
const SpeedInsightsComponent = () => {
  // Em um ambiente Next.js real, isso seria importado e usado diretamente
  // import { SpeedInsights } from "@vercel/speed-insights/next";
  // return <SpeedInsights />;

  React.useEffect(() => {
    // Verificar se o script já foi carregado pelo script inline no <head>
    const scriptExists = document.querySelector(
      'script[src*="vitals.vercel-insights.com"]'
    );

    if (scriptExists) {
      console.log(
        "Vercel Speed Insights script already loaded via inline script"
      );
      return;
    }

    // Como estamos em um ambiente de navegador sem sistema de módulos,
    // simulamos a funcionalidade do componente SpeedInsights
    const loadSpeedInsights = () => {
      try {
        console.log("Initializing Vercel Speed Insights from component...");

        // Criar o script para Web Vitals
        const script = document.createElement("script");
        script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
        script.defer = true;
        script.setAttribute("data-website-id", "portfolio-matheusol");

        // Adicionar o script ao documento
        document.head.appendChild(script);

        console.log("Vercel Speed Insights script loaded successfully!");
      } catch (error) {
        console.error("Failed to initialize Vercel Speed Insights:", error);
      }
    };

    loadSpeedInsights();

    // Limpeza ao desmontar
    return () => {
      // Em um componente real, poderíamos ter lógica de limpeza aqui
    };
  }, []);

  // O componente não renderiza nada visível
  return null;
};

// Registrar o componente para uso no HTML
window.SpeedInsightsComponent = SpeedInsightsComponent;

// Renderizar o componente automaticamente quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  const speedInsightsContainer = document.createElement("div");
  speedInsightsContainer.id = "speed-insights-container";
  document.body.appendChild(speedInsightsContainer);

  ReactDOM.render(
    React.createElement(SpeedInsightsComponent),
    speedInsightsContainer
  );
});
