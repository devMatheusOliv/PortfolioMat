// Project Gallery Component
document.addEventListener("DOMContentLoaded", function () {
  initProjectGallery();
});

function initProjectGallery() {
  const carousel = document.querySelector(".project-carousel");
  if (!carousel) return;

  const carouselContent = carousel.querySelector(".project-carousel-content");
  const carouselItems = carousel.querySelectorAll(".project-carousel-item");
  const prevButton = document.querySelector(".gallery-prev-button");
  const nextButton = document.querySelector(".gallery-next-button");
  const indicators = document.querySelectorAll(".carousel-indicator");

  let currentIndex = 0;
  let startX,
    startScrollLeft,
    isDragging = false;

  // Calculate the total width of items
  const itemWidth = carouselItems[0].offsetWidth;
  const totalItems = carouselItems.length;

  // Update buttons state
  function updateControls() {
    if (prevButton) prevButton.disabled = currentIndex === 0;
    if (nextButton) nextButton.disabled = currentIndex === totalItems - 1;

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Scroll to a specific item
  function scrollToItem(index) {
    if (index < 0) index = 0;
    if (index > totalItems - 1) index = totalItems - 1;

    currentIndex = index;
    const scrollPosition = index * itemWidth;
    carouselContent.style.transform = `translateX(-${scrollPosition}px)`;

    updateControls();
  }

  // Event listeners for buttons
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      scrollToItem(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      scrollToItem(currentIndex + 1);
    });
  }

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      scrollToItem(index);
    });
  });

  // Mouse and touch events for dragging
  carouselContent.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    startScrollLeft = carouselContent._scrollLeft || 0;
    carouselContent.style.cursor = "grabbing";
  });

  carouselContent.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 2; // Scroll speed
    const newScrollLeft = startScrollLeft - walk;
    carouselContent._scrollLeft = newScrollLeft;

    carouselContent.style.transform = `translateX(${-newScrollLeft}px)`;
  });

  carouselContent.addEventListener("mouseup", () => {
    isDragging = false;
    carouselContent.style.cursor = "grab";

    // Snap to closest item
    const scrollPosition = carouselContent._scrollLeft || 0;
    const newIndex = Math.round(scrollPosition / itemWidth);
    scrollToItem(newIndex);
  });

  carouselContent.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      carouselContent.style.cursor = "grab";

      // Snap to closest item
      const scrollPosition = carouselContent._scrollLeft || 0;
      const newIndex = Math.round(scrollPosition / itemWidth);
      scrollToItem(newIndex);
    }
  });

  // Touch events
  carouselContent.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    startScrollLeft = carouselContent._scrollLeft || 0;
  });

  carouselContent.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    const newScrollLeft = startScrollLeft - walk;
    carouselContent._scrollLeft = newScrollLeft;

    carouselContent.style.transform = `translateX(${-newScrollLeft}px)`;
  });

  carouselContent.addEventListener("touchend", () => {
    isDragging = false;

    // Snap to closest item
    const scrollPosition = carouselContent._scrollLeft || 0;
    const newIndex = Math.round(scrollPosition / itemWidth);
    scrollToItem(newIndex);
  });

  // Initialize
  updateControls();

  // Handle window resize
  window.addEventListener("resize", () => {
    // Recalculate item width
    const newItemWidth = carouselItems[0].offsetWidth;

    // Update scroll position
    scrollToItem(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      scrollToItem(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      scrollToItem(currentIndex + 1);
    }
  });
}

// Project data
const projectsData = [
  {
    id: "portfolio",
    title: "Portfolio Pessoal",
    description:
      "Site de portfolio pessoal desenvolvido com React, TypeScript e CSS moderno para exibir projetos.",
    href: "https://github.com/devMatheusOliv/portfolio",
    image: "images/projects/portfolio.jpg",
  },
  {
    id: "todolist",
    title: "Lista de Tarefas",
    description:
      "Aplicativo de lista de tarefas com funcionalidades de adicionar, editar e marcar como concluídas.",
    href: "https://github.com/devMatheusOliv/todo-app",
    image: "images/projects/to-do-list-app.png",
  },
  {
    id: "livraria",
    title: "LiteraTour - Livraria Online",
    description:
      "Landing page moderna e responsiva para uma livraria online, com design limpo, modo claro/escuro, menu mobile interativo e seções organizadas para diferentes categorias de livros.",
    href: "https://devmatheus-literatour.netlify.app",
    image: "images/projects/livraria.png",
  },
  {
    id: "weather",
    title: "Weather Dashboard",
    description:
      "Aplicação web para consulta de previsão do tempo em diferentes cidades, utilizando APIs de clima.",
    href: "https://github.com/devMatheusOliv",
    image: "images/projects/weather-dashboard.png",
  },
  {
    id: "quiz",
    title: "Quiz App",
    description:
      "Aplicação interativa de quiz com diferentes categorias e sistema de pontuação.",
    href: "https://github.com/devMatheusOliv",
    image: "images/projects/quiz-app.png",
  },
];
