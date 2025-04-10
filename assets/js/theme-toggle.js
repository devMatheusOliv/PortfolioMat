document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("theme-checkbox");
  const html = document.documentElement;

  // Verificar se há uma preferência salva no localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Aplicar o modo escuro se estiver salvo como preferência
  if (isDarkMode) {
    html.classList.add("dark-mode");
    checkbox.checked = true;
  }

  // Alternar entre os modos quando o checkbox for alterado
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      html.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      html.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  });
});
