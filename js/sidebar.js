const { useState, useEffect } = React;

const Sidebar = () => {
  // Estado para controlar qual item está ativo
  const [activeSection, setActiveSection] = useState("home");

  // Função para atualizar o item ativo com base na rolagem
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar a seção ativa ao carregar

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">MENU</h3>
          <ul className="sidebar-list">
            <li
              className={`sidebar-listItem ${
                activeSection === "home" ? "active" : ""
              }`}
            >
              <a href="#home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="sidebar-listItemText">Início</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "about" ? "active" : ""
              }`}
            >
              <a href="#about">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span className="sidebar-listItemText">Sobre</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "experience" ? "active" : ""
              }`}
            >
              <a href="#experience">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span className="sidebar-listItemText">Experiência</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "education" ? "active" : ""
              }`}
            >
              <a href="#education">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span className="sidebar-listItemText">Educação</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "skills" ? "active" : ""
              }`}
            >
              <a href="#skills">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
                <span className="sidebar-listItemText">Habilidades</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "projects" ? "active" : ""
              }`}
            >
              <a href="#projects">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span className="sidebar-listItemText">Projetos</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "contact" ? "active" : ""
              }`}
            >
              <a href="#contact">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="sidebar-listItemText">Contato</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-section-title">SOCIAL</h3>
          <ul className="sidebar-list">
            <li className="sidebar-listItem">
              <a
                href="https://github.com/devMatheusOliv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="sidebar-listItemText">GitHub</span>
              </a>
            </li>
            <li className="sidebar-listItem">
              <a
                href="https://www.linkedin.com/in/matheus-olive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sidebar-listItemText">LinkedIn</span>
              </a>
            </li>
            <li className="sidebar-listItem">
              <a
                href="mailto:matheus.luiz0524@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="sidebar-listItemText">Email</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Espaçador flexível para empurrar o botão CV para o final */}
        <div className="sidebar-spacer"></div>

        <div className="sidebar-cv-section">
          <a
            href="images/CV-english.pdf"
            download
            className="sidebar-cv-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sidebar-listIcon"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <span>Download CV</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Footer Component
function Footer() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#home">
              Matheus<span>Oliveira</span>
            </a>
          </div>
          <div className="footer-nav">
            <div className="footer-nav-section">
              <h4>Navegação</h4>
              <ul>
                <li>
                  <a href="#home">Início</a>
                </li>
                <li>
                  <a href="#about">Sobre</a>
                </li>
                <li>
                  <a href="#skills">Habilidades</a>
                </li>
                <li>
                  <a href="#projects">Projetos</a>
                </li>
              </ul>
            </div>
            <div className="footer-nav-section">
              <h4>Contato</h4>
              <ul>
                <li>
                  <a href="#contact">Formulário de Contato</a>
                </li>
                <li>
                  <a href="mailto:matheus.luiz0524@gmail.com">Email</a>
                </li>
                <li>
                  <a href="images/CV-english.pdf" download>
                    Download CV
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-nav-section">
              <h4>Fique Conectado</h4>
              <form className="footer-newsletter">
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="footer-input"
                />
                <button type="submit" className="footer-submit-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
              <p className="footer-newsletter-text">
                Inscreva-se para receber atualizações e novidades.
              </p>
            </div>
          </div>
          <div className="footer-social">
            <a
              href="https://github.com/devMatheusOliv"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/matheus-olive"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="mailto:matheus.luiz0524@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Matheus Oliveira. Todos os direitos reservados.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Política de Privacidade
            </a>
            <a href="#" className="footer-link">
              Termos de Serviço
            </a>
            <a href="#" className="footer-link">
              Configurações de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Renderização dos componentes
ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
    {/* Outros componentes podem ser adicionados aqui */}
  </React.StrictMode>,
  document.getElementById("root")
);
