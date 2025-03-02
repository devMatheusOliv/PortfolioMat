const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const langToggle = document.querySelector(".lang-toggle");
const langText = document.querySelector(".lang-text");

let currentLang = localStorage.getItem("language") || "pt";
document.documentElement.lang = currentLang;

function translatePage(lang) {
  document.documentElement.lang = lang;
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = translations[lang][key];

    if (translation) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  langText.textContent = lang.toUpperCase();
  localStorage.setItem("language", lang);
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  translatePage(currentLang);
});

document.addEventListener("DOMContentLoaded", () => {
  translatePage(currentLang);
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

// Animação de entrada para cards
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
