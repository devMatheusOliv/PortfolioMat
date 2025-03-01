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
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-bar")) {
    navLinks.classList.remove("active");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });

      navLinks.classList.remove("active");
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
