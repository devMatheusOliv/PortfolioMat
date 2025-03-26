// Dados dos projetos
const projectsData = [
  {
    title: "Social Media App",
    progress: 75,
    dueDate: "2023-12-15",
    contributors: ["Matheus", "Ana", "Carlos"],
    tasks: [
      { name: "Design de UI", completed: true },
      { name: "Backend API", completed: true },
      { name: "Autenticação", completed: true },
      { name: "Feed de posts", completed: false },
      { name: "Mensagens", completed: false },
    ],
    githubStars: 45,
    openIssues: 12,
    repoUrl: "https://github.com/matheuslincon/Social-Media-App",
  },
  {
    title: "LiteraTour - Livraria Online",
    progress: 60,
    dueDate: "2023-11-30",
    contributors: ["Matheus", "Pedro", "Julia"],
    tasks: [
      { name: "Catálogo de livros", completed: true },
      { name: "Sistema de busca", completed: true },
      { name: "Carrinho de compras", completed: false },
      { name: "Pagamento", completed: false },
    ],
    githubStars: 32,
    openIssues: 8,
    repoUrl: "https://github.com/matheuslincon/LiteraTour",
  },
  {
    title: "Weather Dashboard",
    progress: 90,
    dueDate: "2023-10-20",
    contributors: ["Matheus", "Fernanda"],
    tasks: [
      { name: "API de clima", completed: true },
      { name: "Interface gráfica", completed: true },
      { name: "Previsão 5 dias", completed: true },
      { name: "Geolocalização", completed: false },
    ],
    githubStars: 28,
    openIssues: 5,
    repoUrl: "https://github.com/matheuslincon/Weather-Dashboard",
  },
  {
    title: "Journal Web",
    progress: 40,
    dueDate: "2024-01-10",
    contributors: ["Matheus", "Renata", "Bruno"],
    tasks: [
      { name: "Editor de texto", completed: true },
      { name: "Armazenamento", completed: false },
      { name: "Exportação PDF", completed: false },
      { name: "Compartilhamento", completed: false },
    ],
    githubStars: 18,
    openIssues: 15,
    repoUrl: "https://github.com/matheuslincon/Journal-Web",
  },
  {
    title: "Calculadora Científica",
    progress: 85,
    dueDate: "2023-09-30",
    contributors: ["Matheus", "Lucas"],
    tasks: [
      { name: "Operações básicas", completed: true },
      { name: "Funções científicas", completed: true },
      { name: "Histórico", completed: true },
      { name: "Conversão de unidades", completed: false },
    ],
    githubStars: 22,
    openIssues: 3,
    repoUrl: "https://github.com/matheuslincon/Calculadora-Cientifica",
  },
  {
    title: "Catálogo de Filmes",
    progress: 70,
    dueDate: "2023-12-05",
    contributors: ["Matheus", "Camila", "Diego"],
    tasks: [
      { name: "Integração API TMDB", completed: true },
      { name: "Listagem de filmes", completed: true },
      { name: "Detalhes do filme", completed: true },
      { name: "Sistema de favoritos", completed: false },
      { name: "Recomendações", completed: false },
    ],
    githubStars: 37,
    openIssues: 9,
    repoUrl: "https://github.com/matheuslincon/Catalogo-Filmes",
  },
];

// Função para renderizar os cards de projetos
function renderProjectCards() {
  const container = document.getElementById("expandable-cards-container");
  if (!container) return;

  // Limpar o container
  container.innerHTML = "";

  // Renderizar cada card usando React
  projectsData.forEach((project) => {
    const cardElement = document.createElement("div");
    cardElement.className = "project-card-container";
    container.appendChild(cardElement);

    // Renderizar o componente React
    ReactDOM.render(
      React.createElement(ProjectStatusCard, project),
      cardElement
    );
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  renderProjectCards();
});
