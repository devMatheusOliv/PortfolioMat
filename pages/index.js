import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Carregar scripts necessários que precisam interagir com o DOM
    const loadScripts = () => {
      const scripts = [
        "/js/sidebar.js",
        "/js/main.js",
        "/js/theme-toggle.js",
        "/js/project-gallery.js",
        "/js/project-cards.js",
        "/js/analytics.js",
      ];

      scripts.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
    };

    loadScripts();

    // Adicionar listener para formulário quando o DOM estiver carregado
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.querySelector(".contact-form form");
      const formStatus = document.getElementById("formStatus");
      const letterImage = document.querySelector(".letter-image");

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("submitted")) {
        formStatus.innerHTML =
          '<p class="success">Mensagem enviada com sucesso! Entrarei em contato em breve.</p>';
        formStatus.className = "form-status success";
        formStatus.style.display = "block";

        if (form) {
          form.reset();
        }

        if (letterImage) {
          letterImage.classList.add("active");
        }

        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" });

        if (history.pushState) {
          const newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
          window.history.pushState({ path: newurl }, "", newurl);
        }
      }

      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();

          if (letterImage) {
            letterImage.classList.add("sending");
          }

          formStatus.innerHTML = '<p class="sending">Enviando mensagem...</p>';
          formStatus.className = "form-status sending";
          formStatus.style.display = "block";

          const formData = new FormData(form);

          fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Erro no envio do formulário");
            })
            .then((data) => {
              formStatus.innerHTML =
                '<p class="success">Mensagem enviada com sucesso! Entrarei em contato em breve.</p>';
              formStatus.className = "form-status success";

              form.reset();

              if (letterImage) {
                letterImage.classList.remove("sending");
                letterImage.classList.add("active");
              }
            })
            .catch((error) => {
              formStatus.innerHTML =
                '<p class="error">Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.</p>';
              formStatus.className = "form-status error";

              if (letterImage) {
                letterImage.classList.remove("sending");
              }

              console.error("Erro:", error);
            });
        });
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Matheus Oliveira | Desenvolvedor Front-End</title>
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/sidebar.css" />
        <link rel="stylesheet" href="/css/mail-animation.css" />
        <link rel="stylesheet" href="/css/feature-boxes.css" />
        <link rel="stylesheet" href="/css/project-gallery.css" />
        <link rel="stylesheet" href="/css/hover-features.css" />
        <link rel="stylesheet" href="/css/aceternity-features.css" />
        <link rel="stylesheet" href="/css/theme-toggle.css" />
        <link rel="stylesheet" href="/css/typography.css" />
        <link rel="stylesheet" href="/css/expandable-card.css" />
        <style jsx>{`
          .skill-icon {
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .skill-card:hover .skill-icon {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .skill-card:hover .skill-icon i {
            animation: pulse 1.5s infinite;
          }

          .skill-card:hover .skill-icon .fa-react {
            animation: spin 10s linear infinite;
          }
        `}</style>
      </Head>

      <div className="theme-toggle-container">
        <input type="checkbox" className="checkbox" id="theme-checkbox" />
        <label htmlFor="theme-checkbox" className="checkbox-label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <span className="ball"></span>
        </label>
      </div>

      <div id="root"></div>

      <div className="sidebar-overlay"></div>

      <section id="home" className="hero">
        <div className="container flex-container">
          <div className="hero-text-container">
            <h1 className="hero-title">
              Olá, eu sou
              <span className="accent-text">Matheus Oliveira</span>
            </h1>
            <h2 className="hero-subtitle">Desenvolvedor Front-End Jr.</h2>
            <p className="hero-description">
              Transformando ideias em experiências digitais incríveis com código
              limpo e design responsivo.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                Ver Projetos
              </a>
              <a href="#contact" className="btn btn-outline">
                Contato
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img
              src="/images/hero-section.svg"
              alt="Ilustração de Desenvolvimento"
              className="hero-profile-image"
            />
          </div>
        </div>
        <div className="scroll-down">
          <a href="#about">
            <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>
      </section>

      {/* Note: Continue adding the rest of your HTML content here */}
      {/* This is a simplified example. You'll need to convert all your HTML to JSX format */}
      {/* For example, class becomes className, for becomes htmlFor, etc. */}
      {/* Also update all relative paths to start with / for the public folder */}
    </>
  );
}
