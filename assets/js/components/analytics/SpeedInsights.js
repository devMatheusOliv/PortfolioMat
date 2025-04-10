// Componente para integração com Vercel Speed Insights

class SpeedInsights extends React.Component {
  componentDidMount() {
    // Configurar o objeto do Speed Insights
    window.si =
      window.si ||
      function () {
        (window.siq = window.siq || []).push(arguments);
      };

    // Verificar se o script já está carregado
    if (!document.getElementById("vercel-speed-insights-script")) {
      // Criar e configurar o script
      const script = document.createElement("script");
      script.id = "vercel-speed-insights-script";
      script.defer = true;
      script.src = "/_vercel/speed-insights/script.js";

      // Adicionar o script ao documento
      document.head.appendChild(script);

      console.log("Vercel Speed Insights inicializado");
    }

    // Inicializar com configurações padrão
    if (window.si) {
      window.si("config", {
        autoTrack: true,
      });
    }
  }

  render() {
    // Este componente não renderiza nada visualmente
    return null;
  }
}

// Exporte o componente para uso em outros arquivos
if (typeof module !== "undefined") {
  module.exports = SpeedInsights;
}
