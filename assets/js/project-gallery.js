// Project Gallery Component
document.addEventListener("DOMContentLoaded", function () {
  // Dados dos projetos (mantidos para referência)
  const projectsData = [
    {
      id: "socialmedia",
      title: "Social Media App",
      description:
        "Aplicação moderna de mídia social com Next.js, React e Tailwind CSS, permitindo conexões, compartilhamento de conteúdo e interações entre usuários.",
      href: "https://github.com/devMatheusOliv/social-media-app",
      image: "images/projects/social-app.png",
    },
    {
      id: "livraria",
      title: "LiteraTour - Livraria Online",
      description:
        "Landing page moderna e responsiva para uma livraria online, com design limpo, modo claro/escuro, menu mobile interativo.",
      href: "https://github.com/devMatheusOliv/landing-page",
      image: "images/projects/livraria.png",
    },
    {
      id: "weather",
      title: "Weather Dashboard",
      description:
        "Aplicação web para consulta de previsão do tempo em diferentes cidades, utilizando APIs de clima.",
      href: "https://github.com/devMatheusOliv/weather-dashboard",
      image: "images/projects/weather-dashboard.png",
    },
    {
      id: "journal",
      title: "Journal Web",
      description:
        "Aplicativo de diário digital com interface elegante, permitindo registrar pensamentos, adicionar tags e visualizar estatísticas de uso.",
      href: "https://github.com/devMatheusOliv/journal-web",
      image: "images/projects/journal-web.png",
    },
    {
      id: "calculadora",
      title: "Calculadora Científica",
      description:
        "Calculadora científica com funções avançadas, histórico de cálculos e interface intuitiva.",
      href: "https://github.com/devMatheusOliv/Calculator",
      image: "images/projects/calculadora-cientifica.png",
    },
    {
      id: "movies",
      title: "Catálogo de Filmes",
      description:
        "Aplicação web para explorar filmes e séries, com informações detalhadas, avaliações e recomendações personalizadas.",
      href: "https://github.com/devMatheusOliv/movie-catalog",
      image: "images/projects/movie-catalog.png",
    },
  ];

  // Adicionar efeitos de animação aos cards de projeto
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    // Adicionar efeito de entrada com atraso
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100);

    // Adicionar efeito de hover para dispositivos touch
    card.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-hover");
      },
      { passive: true }
    );

    card.addEventListener(
      "touchend",
      function () {
        this.classList.remove("touch-hover");
      },
      { passive: true }
    );
  });
});
