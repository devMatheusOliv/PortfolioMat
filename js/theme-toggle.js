// Função para alternar entre modo claro e escuro
function toggleDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// Inicializa o tema quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("checkbox");

  // Verifica se há preferência de tema salva
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    checkbox.checked = true;
    toggleDarkMode(true);
  }

  // Adiciona o evento de mudança ao checkbox
  checkbox.addEventListener("change", () => {
    toggleDarkMode(checkbox.checked);
  });
});
