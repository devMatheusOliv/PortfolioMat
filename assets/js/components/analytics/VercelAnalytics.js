// Componente para integração com Vercel Analytics

class VercelAnalytics extends React.Component {
  componentDidMount() {
    // Verificar se o script já está carregado
    if (!document.getElementById("vercel-analytics-script")) {
      // Criar e configurar o script
      const script = document.createElement("script");
      script.id = "vercel-analytics-script";
      script.defer = true;
      script.src = "/_vercel/insights/script.js";

      // Adicionar o script ao documento
      document.head.appendChild(script);

      console.log("Vercel Analytics inicializado");
    }
  }

  render() {
    // Este componente não renderiza nada visualmente
    return null;
  }
}

// Exporte o componente para uso em outros arquivos
if (typeof module !== "undefined") {
  module.exports = VercelAnalytics;
}
