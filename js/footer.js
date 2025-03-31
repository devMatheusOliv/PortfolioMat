// Footer Component
function Footer() {
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] =
    React.useState(false);
  const currentYear = new Date().getFullYear();
  const emailInputRef = React.useRef(null);

  // Manipular envio do formulário de newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (emailInputRef.current && emailInputRef.current.value) {
      // Simulação de envio
      setTimeout(() => {
        setIsNewsletterSubmitted(true);
        emailInputRef.current.value = "";

        // Resetar o estado após 3 segundos
        setTimeout(() => {
          setIsNewsletterSubmitted(false);
        }, 3000);
      }, 500);
    }
  };

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
                  <a
                    href="images/Matheus_Oliveira_CV.pdf"
                    download="Matheus_Oliveira_CV.pdf"
                  >
                    Download CV
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-nav-section">
              <h4>Fique Conectado</h4>
              <form
                className="footer-newsletter"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="footer-input"
                  ref={emailInputRef}
                  required
                />
                <button type="submit" className="footer-submit-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
              {isNewsletterSubmitted ? (
                <p
                  className="footer-newsletter-text"
                  style={{ color: "var(--success-color)" }}
                >
                  Inscrição realizada com sucesso!
                </p>
              ) : (
                <p className="footer-newsletter-text">
                  Inscreva-se para receber atualizações e novidades.
                </p>
              )}
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

// Renderizar o componente Footer com AnalyticsProvider
// Carregar o componente AnalyticsProvider
const analyticScript = document.createElement("script");
analyticScript.src = "js/components/AnalyticsProvider.js";
analyticScript.type = "text/babel";
document.head.appendChild(analyticScript);

// Aguardar o carregamento do script AnalyticsProvider
analyticScript.onload = () => {
  ReactDOM.render(
    <AnalyticsProvider>
      <Footer />
    </AnalyticsProvider>,
    document.getElementById("footer-container")
  );
};

// Fallback caso o script não carregue a tempo
setTimeout(() => {
  if (!window.AnalyticsProvider) {
    ReactDOM.render(<Footer />, document.getElementById("footer-container"));
  }
}, 1000);
