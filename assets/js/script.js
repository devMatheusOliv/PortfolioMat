const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const langToggle = document.querySelector(".lang-toggle");
const langText = document.querySelector(".lang-text");

function toggleLanguage() {
  console.log("Função toggleLanguage chamada");
  let currentLang = localStorage.getItem("language") || "pt";
  currentLang = currentLang === "pt" ? "en" : "pt";
  console.log("Novo idioma:", currentLang);
  localStorage.setItem("language", currentLang);
  document.documentElement.lang = currentLang;

  const langText = document.querySelector(".lang-text");
  if (langText) {
    langText.textContent = currentLang.toUpperCase();
  }

  const languageText = document.getElementById("language-text");
  if (languageText) {
    languageText.textContent = currentLang.toUpperCase();
  }

  updateLanguage(currentLang);
}

document.addEventListener("DOMContentLoaded", function () {
  let currentLang = localStorage.getItem("language") || "pt";
  document.documentElement.lang = currentLang;

  console.log("Inicializando idioma:", currentLang);

  const langText = document.querySelector(".lang-text");
  if (langText) {
    langText.textContent = currentLang.toUpperCase();
  }

  const languageText = document.getElementById("language-text");
  if (languageText) {
    languageText.textContent = currentLang.toUpperCase();
  }

  const langToggle = document.querySelector(".lang-toggle");
  console.log("Botão de idioma encontrado:", langToggle);

  if (langToggle) {
    updateLanguage(currentLang);

    langToggle.addEventListener("click", function () {
      console.log("Botão de idioma clicado");
      currentLang = currentLang === "pt" ? "en" : "pt";
      console.log("Novo idioma:", currentLang);
      localStorage.setItem("language", currentLang);
      document.documentElement.lang = currentLang;
      updateLanguage(currentLang);
    });
  } else {
    console.error("Botão de idioma não encontrado!");
    updateLanguage(currentLang);
  }

  const projetosGrid = document.querySelector(".projetos-grid");
  if (projetosGrid) {
    const cards = projetosGrid.querySelectorAll(".projeto-card");
    cards.forEach((card) => {
      const title = card.querySelector("h3");
      if (title && title.textContent.includes("Catálogo de Filmes")) {
        const githubLink = card.querySelector(".projeto-links a:first-child");
        if (githubLink) {
          githubLink.href = "https://github.com/devMatheusOliv/movie-catalog";
        }
      }
    });
  }

  const form = document.querySelector(".formspree-form");
  if (form) {
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const currentLang = localStorage.getItem("language") || "pt";

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            const successMessage =
              getTranslation("contact.success", currentLang) ||
              "Obrigado! Sua mensagem foi enviada com sucesso.";

            formStatus.innerHTML = `<div class="alert-success" data-i18n="contact.success">${successMessage}</div>`;
            form.reset();
            setTimeout(() => {
              formStatus.innerHTML = "";
            }, 5000);
          } else {
            response.json().then((data) => {
              if (data.errors) {
                const errorPrefix =
                  getTranslation("contact.error", currentLang) ||
                  "Oops! Houve um problema ao enviar sua mensagem.";

                formStatus.innerHTML = `<div class="alert-error" data-i18n="contact.error">${errorPrefix} ${data.errors
                  .map((error) => error.message)
                  .join(", ")}</div>`;
              } else {
                const errorMessage =
                  getTranslation("contact.error", currentLang) ||
                  "Oops! Houve um problema ao enviar sua mensagem. Por favor, tente novamente.";

                formStatus.innerHTML = `<div class="alert-error" data-i18n="contact.error">${errorMessage}</div>`;
              }
            });
          }
        })
        .catch((error) => {
          const errorMessage =
            getTranslation("contact.error", currentLang) ||
            "Oops! Houve um problema ao enviar sua mensagem. Por favor, tente novamente.";

          formStatus.innerHTML = `<div class="alert-error" data-i18n="contact.error">${errorMessage}</div>`;
          console.error("Error:", error);
        });
    });
  }
});

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navLinks.classList.remove("active");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
  lastScrollTop = scrollTop;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(
    ".experiencia-card, .educacao-card, .habilidade-card, .projeto-card"
  )
  .forEach((el) => {
    el.classList.add("fade-in-hidden");
    observer.observe(el);
  });

const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (window.innerWidth <= 1024) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

const sections = document.querySelectorAll("section[id]");
const sidebarNavLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sidebarNavLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

function updateLanguage(lang) {
  console.log("Atualizando idioma para:", lang);
  const elements = document.querySelectorAll("[data-i18n]");

  const langText = document.querySelector(".lang-text");
  if (langText) {
    langText.textContent = lang.toUpperCase();
  }

  const languageText = document.getElementById("language-text");
  if (languageText) {
    languageText.textContent = lang.toUpperCase();
  }

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = getTranslation(key, lang);

    if (translation) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translation;
      } else {
        element.innerHTML = translation;
      }
    }
  });

  const formStatus = document.getElementById("form-status");
  if (formStatus && formStatus.children.length > 0) {
    const alertElement = formStatus.children[0];
    if (alertElement.classList.contains("alert-success")) {
      const successTranslation = getTranslation("contact.success", lang);
      if (successTranslation) {
        alertElement.innerHTML = successTranslation;
      }
    } else if (alertElement.classList.contains("alert-error")) {
      const errorTranslation = getTranslation("contact.error", lang);
      if (errorTranslation) {
        alertElement.innerHTML = errorTranslation;
      }
    }
  }

  document.documentElement.lang = lang;
}

function getTranslation(key, lang) {
  if (!window.translations || !window.translations[lang]) {
    console.error("Traduções não encontradas para o idioma:", lang);
    return null;
  }

  const keys = key.split(".");
  let translation = window.translations[lang];

  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k];
    } else {
      console.warn(
        "Chave de tradução não encontrada:",
        key,
        "para idioma:",
        lang
      );
      return null;
    }
  }

  return translation;
}
