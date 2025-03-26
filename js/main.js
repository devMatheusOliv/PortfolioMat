// Função para alternar entre modo claro e escuro - agora gerenciado por theme-toggle.js

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se há preferência de tema salva - agora gerenciado por theme-toggle.js

  // Inicializa a animação das feature boxes
  initFeatureBoxes();

  // Inicializa a animação das hover feature boxes
  initHoverFeatures();

  // Inicializa a animação das aceternity feature boxes
  initAceternityFeatures();

  // Inicializa a animação das aceternity feature boxes na seção de educação
  initEducationAceternityFeatures();

  // Inicializa a animação das aceternity feature boxes na seção de experiência
  initExperienceAceternityFeatures();

  // Inicializa as animações de scroll
  initScrollAnimations();

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("active");
    } else {
      scrollToTopBtn.classList.remove("active");
    }
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navbar = document.querySelector(".navbar");
  const sidebarContainer = document.querySelector(".sidebar-container");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");

      // Toggle sidebar
      if (sidebarContainer) {
        sidebarContainer.classList.toggle("active");

        // Toggle overlay
        if (sidebarOverlay) {
          sidebarOverlay.classList.toggle("active");
        }
      }

      // Toggle navbar if it exists
      if (navbar) {
        navbar.classList.toggle("active");
      }
    });

    // Close sidebar when clicking on overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        sidebarContainer.classList.remove("active");
        this.classList.remove("active");

        if (navbar) {
          navbar.classList.remove("active");
        }
      });
    }
  }

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".static-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category").includes(filterValue)
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Formulário de contato
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const letterImage = document.querySelector(".letter-image");
    const formInputs = contactForm.querySelectorAll("input, textarea");

    // Animar a carta quando o usuário clica em qualquer campo do formulário
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        letterImage.classList.add("active");
      });

      input.addEventListener("blur", function () {
        // Verificar se algum campo tem valor antes de remover a classe active
        const anyFieldHasValue = Array.from(formInputs).some(
          (field) => field.value.trim() !== ""
        );
        if (!anyFieldHasValue) {
          letterImage.classList.remove("active");
        }
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formStatus = document.getElementById("formStatus");

      // Simulação de envio de formulário
      formStatus.textContent = "Enviando mensagem...";
      formStatus.className = "form-status";
      formStatus.style.display = "block";

      // Animar a carta sendo enviada
      letterImage.classList.add("sending");

      setTimeout(() => {
        formStatus.textContent = "Mensagem enviada com sucesso!";
        formStatus.className = "form-status success";
        contactForm.reset();

        // Remover as classes de animação após um tempo
        setTimeout(() => {
          letterImage.classList.remove("active", "sending");
        }, 2000);
      }, 1500);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (sidebarContainer && sidebarContainer.classList.contains("active")) {
          sidebarContainer.classList.remove("active");
          mobileMenuToggle.classList.remove("active");
          sidebarOverlay.classList.remove("active");
        }

        if (navbar && navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          mobileMenuToggle.classList.remove("active");
        }
      }
    });
  });

  // Detectar dispositivos touch e adicionar classe ao body
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    document.body.classList.add("touch-device");
  }
});

// Função para animar as feature boxes quando o usuário rolar até a seção
function initFeatureBoxes() {
  const featureBoxes = document.querySelectorAll(".feature-box");

  // Verifica se o elemento está visível na tela
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Adiciona classe de animação às feature boxes quando estiverem visíveis
  const animateFeatureBoxes = () => {
    featureBoxes.forEach((box, index) => {
      if (isElementInViewport(box)) {
        // Adiciona um pequeno atraso para cada box, criando um efeito cascata
        setTimeout(() => {
          box.classList.add("animated");
        }, index * 100);
      }
    });
  };

  // Adiciona o evento de scroll para verificar quando as feature boxes estão visíveis
  window.addEventListener("scroll", animateFeatureBoxes);

  // Verifica se as feature boxes já estão visíveis ao carregar a página
  animateFeatureBoxes();
}

// Função para animar as hover feature boxes
function initHoverFeatures() {
  const hoverFeatures = document.querySelectorAll(".hover-feature-box");

  hoverFeatures.forEach((feature) => {
    feature.addEventListener("mouseenter", function () {
      this.classList.add("hovered");
    });

    feature.addEventListener("mouseleave", function () {
      this.classList.remove("hovered");
    });
  });
}

// Função para animar as aceternity feature boxes
function initAceternityFeatures() {
  const aceternityFeatures = document.querySelectorAll(".aceternity-feature");

  // Adiciona efeitos de entrada com atraso para cada feature
  aceternityFeatures.forEach((feature, index) => {
    // Adiciona um pequeno atraso para cada feature, criando um efeito cascata
    setTimeout(() => {
      feature.style.opacity = "0";
      feature.style.transform = "translateY(20px)";
      feature.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      // Força um reflow para garantir que a transição funcione
      void feature.offsetWidth;

      feature.style.opacity = "1";
      feature.style.transform = "translateY(0)";
    }, index * 100);

    // Adiciona eventos de hover para efeitos adicionais
    feature.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";

      // Destaca o ícone
      const icon = this.querySelector(".aceternity-feature-icon i");
      if (icon) {
        icon.style.color = "var(--primary-color)";

        // Efeito especial para o ícone do React
        if (icon.classList.contains("fa-react")) {
          icon.style.animation = "spin 10s linear infinite";
        }
      }
    });

    feature.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";

      // Restaura o ícone
      const icon = this.querySelector(".aceternity-feature-icon i");
      if (icon) {
        icon.style.color = "";

        // Remove o efeito especial do ícone do React
        if (icon.classList.contains("fa-react")) {
          icon.style.animation = "";
        }
      }
    });
  });
}

// Função para animar as aceternity feature boxes na seção de educação
function initEducationAceternityFeatures() {
  const educationAceternityFeatures = document.querySelectorAll(
    ".education-aceternity-feature"
  );

  // Adiciona efeitos de entrada com atraso para cada feature
  educationAceternityFeatures.forEach((feature, index) => {
    // Adiciona um pequeno atraso para cada feature, criando um efeito cascata
    setTimeout(() => {
      feature.style.opacity = "0";
      feature.style.transform = "translateY(20px)";
      feature.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      // Força um reflow para garantir que a transição funcione
      void feature.offsetWidth;

      feature.style.opacity = "1";
      feature.style.transform = "translateY(0)";
    }, index * 100);

    // Adiciona eventos de hover para efeitos adicionais
    feature.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";

      // Destaca o ícone
      const icon = this.querySelector(".aceternity-feature-icon i");
      if (icon) {
        icon.style.color = "var(--primary-color)";

        // Efeito especial para o ícone do JS
        if (icon.classList.contains("fa-js")) {
          icon.style.animation = "bounce 1s infinite";
        }

        // Efeito especial para o ícone de graduação
        if (icon.classList.contains("fa-graduation-cap")) {
          icon.style.animation = "pulse 2s infinite";
        }

        // Efeito especial para o ícone de laptop
        if (icon.classList.contains("fa-laptop-code")) {
          icon.style.animation = "wiggle 1s infinite";
        }
      }
    });

    feature.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";

      // Restaura o ícone
      const icon = this.querySelector(".aceternity-feature-icon i");
      if (icon) {
        icon.style.color = "";
        icon.style.animation = "";
      }
    });
  });
}

// Função para animar as aceternity feature boxes na seção de experiência
function initExperienceAceternityFeatures() {
  const experienceAceternityFeatures = document.querySelectorAll(
    ".experience-aceternity-feature"
  );

  // Adiciona efeitos de entrada com atraso para cada feature
  experienceAceternityFeatures.forEach((feature, index) => {
    // Adiciona um pequeno atraso para cada feature, criando um efeito cascata
    setTimeout(() => {
      feature.style.opacity = "0";
      feature.style.transform = "translateY(20px)";
      feature.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      // Força um reflow para garantir que a transição funcione
      void feature.offsetWidth;

      feature.style.opacity = "1";
      feature.style.transform = "translateY(0)";
    }, index * 100);

    // Adiciona eventos de hover para efeitos adicionais
    feature.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";

      // Destaca o ícone
      const icon = this.querySelector(".aceternity-feature-icon i");
      if (icon) {
        icon.style.color = "var(--primary-color)";

        // Efeito especial para o ícone de headset
        if (icon.classList.contains("fa-headset")) {
          icon.style.animation = "pulse 1.5s infinite";
        }

        // Efeito especial para o ícone de telefone
        if (icon.classList.contains("fa-phone-alt")) {
          icon.style.animation = "shake 0.8s infinite";
        }
      }
    });

    feature.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";

      // Restaura o ícone
      const icon = this.querySelector(".aceternity-feature-icon i");
      if (icon) {
        icon.style.color = "";
        icon.style.animation = "";
      }
    });
  });
}

// Função para inicializar animações de scroll
function initScrollAnimations() {
  // Seleciona todas as seções que devem ser animadas
  const sections = document.querySelectorAll("section");
  const cards = document.querySelectorAll(
    ".project-carousel-item, .experience-card, .skill-card"
  );

  // Configuração do Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% do elemento visível
  };

  // Função de callback para o observer
  const sectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        // Desativa o observer após a animação
        observer.unobserve(entry.target);
      }
    });
  };

  // Função de callback para os cards
  const cardObserverCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Adiciona um atraso baseado no índice para criar um efeito cascata
        setTimeout(() => {
          entry.target.classList.add("card-visible");
        }, index * 100);
        // Desativa o observer após a animação
        observer.unobserve(entry.target);
      }
    });
  };

  // Cria os observers
  const sectionObserver = new IntersectionObserver(
    sectionObserverCallback,
    options
  );
  const cardObserver = new IntersectionObserver(cardObserverCallback, options);

  // Observa cada seção
  sections.forEach((section) => {
    section.classList.add("section-hidden");
    sectionObserver.observe(section);
  });

  // Observa cada card
  cards.forEach((card) => {
    card.classList.add("card-hidden");
    cardObserver.observe(card);
  });
}
