/**
 * Gerenciador de animações minimalista para o portfólio
 */
document.addEventListener("DOMContentLoaded", function () {
  // Aplicar animações sutis aos elementos interativos
  const interactiveElements = document.querySelectorAll(
    ".button-30, .projeto-links a, .info-item a, .nav-links a"
  );

  interactiveElements.forEach((element) => {
    // Garantir que a animação seja sutil
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });
    
    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Animação simplificada para barras de progresso
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll(".skill-progress");

    progressBars.forEach((bar) => {
      // Armazenar a largura final
      const finalWidth = bar.getAttribute("style").includes("--progress") 
        ? getComputedStyle(bar).getPropertyValue("--progress") 
        : "100%";

      // Iniciar com largura zero
      bar.style.width = "0%";

      // Configurar a transição
      bar.style.transition = "width 0.8s ease-out";

      // Observer para animar quando visível
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Pequeno delay para melhor efeito visual
              setTimeout(() => {
                bar.style.width = finalWidth;
              }, 200);

              // Parar de observar após animar
              observer.unobserve(bar);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(bar);
    });
  };

  // Iniciar animações
  animateProgressBars();

  // Efeito de typing simplificado para o título principal
  const heroTitle = document.querySelector(".hero-text h1 .name");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    typeText(heroTitle, text, 100);
  }

  // Efeito de destaque para seções ativas
  highlightActiveSection();
  window.addEventListener("scroll", highlightActiveSection);

  // Efeito de scroll suave para links internos
  smoothScrollLinks();
});

// Função para efeito de digitação simplificado
function typeText(element, text, speed) {
  let i = 0;
  const timer = setInterval(function () {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      // Adicionar cursor piscante simples
      const cursor = document.createElement("span");
      cursor.className = "typing-cursor";
      cursor.textContent = "|";
      element.appendChild(cursor);

      // Remover cursor após 3 segundos
      setTimeout(() => {
        cursor.remove();
      }, 3000);
    }
  }, speed);
}

// Função para destacar seção ativa
function highlightActiveSection() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

// Função para scroll suave
function smoothScrollLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Inicializar efeitos adicionais
window.addEventListener("load", function () {
  // Forçar barras de progresso para 100%
  setTimeout(function () {
    document.querySelectorAll(".skill-progress").forEach(function (progress) {
      progress.style.width = "100%";
    });
  }, 1000);

  // Adicionar classe para animar seção hero
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.classList.add("animate");
  }
  
  // Animar elementos com fade-in
  document.querySelectorAll(".fade-in-hidden").forEach(function(element) {
    element.classList.add("fade-in");
  });
});

// Animação de blink para o cursor
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

// Classe para o cursor
.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: var(--military-green);
  animation: blink 1s infinite;
  margin-left: 2px;
  vertical-align: middle;
}
