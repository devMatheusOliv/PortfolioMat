// Componente React para o Vercel Analytics
window.AnalyticsProvider = ({ children }) => {
  React.useEffect(() => {
    // Verificar se o script já foi carregado
    if (
      !document.querySelector(
        'script[src="https://analytics.vercel.com/script.js"]'
      )
    ) {
      // Carregar o script do Vercel Analytics
      const script = document.createElement("script");
      script.defer = true;
      script.dataset.website = window.location.hostname;
      script.src = "https://analytics.vercel.com/script.js";

      // Adicionar o script ao documento
      document.head.appendChild(script);

      console.log("Vercel Analytics initialized from React component");
    }
  }, []);

  return children;
};
