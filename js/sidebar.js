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

  // Função para fechar a sidebar em dispositivos móveis
  const closeSidebarOnMobile = () => {
    const sidebarContainer = document.querySelector(".sidebar-container");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (window.innerWidth <= 992) {
      if (sidebarContainer) sidebarContainer.classList.remove("active");
      if (sidebarOverlay) sidebarOverlay.classList.remove("active");
    }
  };

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
              <a href="#home" onClick={closeSidebarOnMobile}>
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
              <a href="#about" onClick={closeSidebarOnMobile}>
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
                activeSection === "skills" ? "active" : ""
              }`}
            >
              <a href="#skills" onClick={closeSidebarOnMobile}>
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
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="sidebar-listItemText">Habilidades</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${
                activeSection === "education" ? "active" : ""
              }`}
            >
              <a href="#education" onClick={closeSidebarOnMobile}>
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
                activeSection === "experience" ? "active" : ""
              }`}
            >
              <a href="#experience" onClick={closeSidebarOnMobile}>
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
                activeSection === "projects" ? "active" : ""
              }`}
            >
              <a href="#projects" onClick={closeSidebarOnMobile}>
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
              <a href="#contact" onClick={closeSidebarOnMobile}>
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

        <div className="sidebar-section">
          <h3 className="sidebar-section-title">DOWNLOAD</h3>
          <div className="sidebar-cv-button">
            <a
              href="images/Matheus_Oliveira_CV.pdf"
              download="Matheus_Oliveira_CV.pdf"
              className="sidebar-cv-link"
              onClick={closeSidebarOnMobile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sidebar-cv-icon"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <span className="sidebar-cv-text">Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Navbar Component
const MobileNavbar = () => {
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

  // Função para fechar a sidebar em dispositivos móveis
  const handleNavClick = () => {
    const sidebarContainer = document.querySelector(".sidebar-container");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (sidebarContainer) sidebarContainer.classList.remove("active");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
  };

  return (
    <nav className="mobile-navbar">
      <ul className="mobile-navbar-list">
        <li className="mobile-navbar-item">
          <a
            href="#home"
            className={`mobile-navbar-link ${
              activeSection === "home" ? "active" : ""
            }`}
            onClick={handleNavClick}
          >
            <i className="fa-solid fa-house mobile-navbar-icon"></i>
            <span className="mobile-navbar-text">Início</span>
          </a>
        </li>
        <li className="mobile-navbar-item">
          <a
            href="#about"
            className={`mobile-navbar-link ${
              activeSection === "about" ? "active" : ""
            }`}
            onClick={handleNavClick}
          >
            <i className="fa-solid fa-user mobile-navbar-icon"></i>
            <span className="mobile-navbar-text">Sobre</span>
          </a>
        </li>
        <li className="mobile-navbar-item">
          <a
            href="#skills"
            className={`mobile-navbar-link ${
              activeSection === "skills" ? "active" : ""
            }`}
            onClick={handleNavClick}
          >
            <i className="fa-solid fa-code mobile-navbar-icon"></i>
            <span className="mobile-navbar-text">Skills</span>
          </a>
        </li>
        <li className="mobile-navbar-item">
          <a
            href="#projects"
            className={`mobile-navbar-link ${
              activeSection === "projects" ? "active" : ""
            }`}
            onClick={handleNavClick}
          >
            <i className="fa-solid fa-briefcase mobile-navbar-icon"></i>
            <span className="mobile-navbar-text">Projetos</span>
          </a>
        </li>
        <li className="mobile-navbar-item">
          <a
            href="#contact"
            className={`mobile-navbar-link ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={handleNavClick}
          >
            <i className="fa-solid fa-envelope mobile-navbar-icon"></i>
            <span className="mobile-navbar-text">Contato</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

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
              href="https://www.instagram.com/m4theus.oliv/"
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

// Função para inicializar a interação entre a sidebar e a navbar móvel
function initMobileNavbarInteraction() {
  const sidebarContainer = document.querySelector(".sidebar-container");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  if (sidebarContainer && sidebarOverlay) {
    // Adicionar evento de clique ao overlay
    sidebarOverlay.addEventListener("click", function () {
      sidebarContainer.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }
}

// Inicializar a interação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  initMobileNavbarInteraction();
});

// Renderização dos componentes
ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
    <MobileNavbar />
    {/* Outros componentes podem ser adicionados aqui */}
  </React.StrictMode>,
  document.getElementById("root")
);
