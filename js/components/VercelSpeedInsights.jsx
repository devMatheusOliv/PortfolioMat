/**
 * Componente React para integração com Vercel Speed Insights
 *
 * Este componente implementa o SpeedInsights fornecido pelo pacote @vercel/speed-insights/next,
 * conforme a documentação oficial.
 */

// Em um projeto Next.js real, isso seria importado assim:
// import { SpeedInsights } from "@vercel/speed-insights/next";

// Este é um componente simulado para integração com o Vercel Speed Insights
const VercelSpeedInsights = () => {
  // Em um ambiente com React + imports, usaríamos:
  // return <SpeedInsights />;

  // Como estamos usando Babel direto no navegador, simulamos o comportamento
  React.useEffect(() => {
    try {
      // Inicializar manualmente o Speed Insights
      if (
        typeof window !== "undefined" &&
        !document.querySelector('script[src*="vitals.vercel-insights.com"]')
      ) {
        const script = document.createElement("script");
        script.src = "https://vitals.vercel-insights.com/v1/vitals.js";
        script.defer = true;
        script.setAttribute("data-website-id", "portfolio-matheusol");

        document.head.appendChild(script);

        console.log(
          "Vercel Speed Insights initialized (simulating @vercel/speed-insights/next)"
        );
      }
    } catch (error) {
      console.error("Failed to initialize Vercel Speed Insights:", error);
    }
  }, []);

  // Em um componente real, retornariamos: <SpeedInsights />
  return null;
};

// Em um projeto com módulos ES, exportaríamos assim:
// export default VercelSpeedInsights;

// Para uso no HTML, expomos globalmente
window.VercelSpeedInsights = VercelSpeedInsights;
