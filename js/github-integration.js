const GITHUB_USERNAME = "devMatheusOliv";
const MAX_REPOS = 6;

async function fetchGitHubRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${MAX_REPOS}`
    );
    const repos = await response.json();

    updateProjectCards(repos);
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
  }
}

function updateProjectCards(repos) {
  const projetosGrid = document.querySelector(".projetos-grid");

  repos.forEach((repo, index) => {
    const card = projetosGrid.children[index];
    if (!card) return;

    const githubLink = card.querySelector(".projeto-links a:first-child");
    if (githubLink) {
      githubLink.href = repo.html_url;
    }

    if (repo.description && repo.description.match(/[áàâãéèêíïóôõöúçñ]/i)) {
      const descElement = card.querySelector("p");
      if (descElement) {
        descElement.textContent = repo.description;
      }
    }

    updateRepoLanguages(repo.languages_url, card);
  });
}

async function updateRepoLanguages(languagesUrl, card) {
  try {
    const response = await fetch(languagesUrl);
    const languages = await response.json();

    const tecnologiasDiv = card.querySelector(".tecnologias");
    if (tecnologiasDiv) {
      tecnologiasDiv.innerHTML = "";
      Object.keys(languages).forEach((lang) => {
        const span = document.createElement("span");
        span.textContent = `${lang} ${getLanguageEmoji(lang)}`;
        tecnologiasDiv.appendChild(span);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar linguagens:", error);
  }
}

function getLanguageEmoji(language) {
  const emojiMap = {
    JavaScript: "💻",
    HTML: "📝",
    CSS: "🎨",
    Python: "🐍",
    Java: "☕",
    TypeScript: "📘",
    PHP: "🐘",
    Ruby: "💎",
    "C#": "🎯",
    Swift: "🍎",
    Go: "🐹",
    Rust: "⚙️",
    Kotlin: "📱",
    React: "⚛️",
  };
  return emojiMap[language] || "🔧";
}

document.addEventListener("DOMContentLoaded", fetchGitHubRepos);
