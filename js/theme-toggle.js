// Theme Toggle Component
class ThemeToggle extends React.Component {
  constructor(props) {
    super(props);

    // Verifica o tema atual do localStorage
    const savedTheme = localStorage.getItem("theme");
    this.state = {
      isDark: savedTheme === "dark",
    };

    // Garante que o tema inicial esteja correto
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }

  toggleTheme = () => {
    const newIsDark = !this.state.isDark;
    this.setState({ isDark: newIsDark });

    // Atualiza o tema no DOM e localStorage
    if (newIsDark) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  render() {
    const { isDark } = this.state;
    console.log("Rendering ThemeToggle with isDark:", isDark);

    return (
      <div
        className={`theme-toggle-wrapper ${isDark ? "dark" : "light"}`}
        onClick={this.toggleTheme}
        role="button"
        tabIndex={0}
        style={{ width: "64px", height: "32px" }}
      >
        <div className="theme-toggle-track">
          <div className={`theme-toggle-thumb ${isDark ? "" : "translated"}`}>
            {isDark ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun"></i>
            )}
          </div>
          <div className={`theme-toggle-icon ${isDark ? "" : "hidden"}`}>
            <i className="fa-solid fa-sun"></i>
          </div>
          <div className={`theme-toggle-icon ${isDark ? "hidden" : ""}`}>
            <i className="fa-solid fa-moon"></i>
          </div>
        </div>
      </div>
    );
  }
}

// Renderiza o componente quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, looking for theme toggle container");
  const themeToggleContainer = document.getElementById(
    "theme-toggle-container"
  );
  console.log("Theme toggle container:", themeToggleContainer);

  if (themeToggleContainer) {
    console.log("Rendering ThemeToggle component");
    ReactDOM.render(<ThemeToggle />, themeToggleContainer);
  } else {
    console.error("Theme toggle container not found");
  }
});
