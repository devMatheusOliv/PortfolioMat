/**
 * Vercel Speed Insights Integration
 *
 * Este arquivo simula o comportamento do módulo @vercel/speed-insights/next
 * seguindo a documentação oficial da Vercel.
 *
 * Em um projeto Next.js real, você importaria e usaria assim:
 *
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

// Simulação do componente SpeedInsights da biblioteca @vercel/speed-insights/next
(function () {
  // Definir o objeto global para simular a importação
  if (!window.vercelSpeedInsights) {
    window.vercelSpeedInsights = {};
  }

  // Criar o componente SpeedInsights
  window.vercelSpeedInsights.SpeedInsights = function () {
    // Este seria o componente React real
    // Como estamos simulando, inicializamos o script aqui
    try {
      if (
        !document.querySelector('script[src*="vitals.vercel-insights.com"]')
      ) {
        const script = document.createElement("script");
        script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
        script.defer = true;
        script.setAttribute("data-website-id", "portfolio-matheusol");
        document.head.appendChild(script);

        console.log(
          "SpeedInsights from @vercel/speed-insights/next initialized"
        );
      }
    } catch (error) {
      console.error("Failed to initialize Vercel SpeedInsights:", error);
    }

    // Em um componente React real, retornaríamos JSX, mas aqui retornamos null
    return null;
  };

  // Inicializar automaticamente se o script for carregado direto
  document.addEventListener("DOMContentLoaded", function () {
    window.vercelSpeedInsights.SpeedInsights();
  });
})();
