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
  try {
    // Inicializar o Vercel Analytics
    const script = document.createElement("script");
    script.src = "/_vercel/insights/script.js";
    script.defer = true;
    document.head.appendChild(script);

    console.log("Vercel Analytics initialized");
  } catch (error) {
    console.error("Failed to initialize Vercel Analytics:", error);
  }
})();
