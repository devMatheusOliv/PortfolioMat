// TMDB API configuration
const API_KEY = "6dd15cc9858f54ef8ee96159874b959f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const BACKDROP_SIZE = "w1280";
const POSTER_SIZE = "w500";

// DOM Elements
const moviesGrid = document.getElementById("movies-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const loadMoreBtn = document.getElementById("load-more-btn");
const modal = document.getElementById("movie-modal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.querySelector(".close");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const htmlElement = document.documentElement;

// State
let currentPage = 1;
let totalPages = 0;
let currentSearchQuery = "";
let isSearching = false;
let isLoading = false;
let currentTheme = localStorage.getItem("theme") || "light";

// Event Listeners
searchForm.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", loadMoreMovies);
closeModal.addEventListener("click", closeMovieModal);
themeToggle.addEventListener("click", toggleTheme);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeMovieModal();
  }
});

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeMovieModal();
  }
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme
  applyTheme();

  // Fetch movies
  fetchPopularMovies();

  // Add smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

// Theme functions
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
  applyTheme();
}

function applyTheme() {
  htmlElement.setAttribute("data-theme", currentTheme);

  // Update icon
  if (currentTheme === "dark") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// Functions
async function fetchPopularMovies(page = 1) {
  if (isLoading) return;

  try {
    isLoading = true;
    showLoadingSpinner();

    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Falha na conexão com a API");
    }

    const data = await response.json();
    totalPages = data.total_pages;

    setTimeout(() => {
      displayMovies(data.results, page === 1);
      updateLoadMoreButton();
      hideLoadingSpinner();
      isLoading = false;
    }, 300);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    showError("Erro ao carregar os filmes populares.");
    hideLoadingSpinner();
    isLoading = false;
  }
}

async function searchMovies(query, page = 1) {
  if (isLoading) return;

  try {
    isLoading = true;
    showLoadingSpinner();

    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Falha na conexão com a API");
    }

    const data = await response.json();
    totalPages = data.total_pages;

    setTimeout(() => {
      if (data.results.length === 0) {
        showError(`Nenhum resultado encontrado para "${query}".`);
      } else {
        displayMovies(data.results, page === 1);
      }

      updateLoadMoreButton();
      hideLoadingSpinner();
      isLoading = false;
    }, 300);
  } catch (error) {
    console.error("Error searching movies:", error);
    showError("Erro ao buscar filmes.");
    hideLoadingSpinner();
    isLoading = false;
  }
}

function displayMovies(movies, clearGrid = false) {
  if (clearGrid) {
    moviesGrid.innerHTML = "";
  }

  const fragment = document.createDocumentFragment();

  movies.forEach((movie, index) => {
    const movieCard = createMovieCard(movie);

    // Add staggered animation delay
    movieCard.style.animation = `fadeIn 0.3s ease forwards ${index * 0.03}s`;
    movieCard.style.opacity = "0";

    fragment.appendChild(movieCard);
  });

  moviesGrid.appendChild(fragment);
}

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieCard.onclick = () => showMovieDetails(movie.id);

  const posterPath = movie.poster_path
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  movieCard.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" loading="lazy">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <div class="movie-meta">
                ${releaseYear ? `<span>${releaseYear}</span>` : ""}
                <span class="rating">
                    <i class="fas fa-star"></i>
                    ${movie.vote_average.toFixed(1)}
                </span>
            </div>
        </div>
    `;

  return movieCard;
}

async function showMovieDetails(movieId) {
  try {
    showModalLoadingSpinner();
    modal.style.display = "block";

    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits,videos`
    );

    if (!response.ok) {
      throw new Error("Falha ao carregar detalhes do filme");
    }

    const movie = await response.json();

    const posterPath = movie.poster_path
      ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=Sem+Imagem";

    // Format runtime to hours and minutes
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const formattedRuntime = movie.runtime ? `${hours}h ${minutes}min` : "";

    // Format release date
    const releaseDate = movie.release_date
      ? new Date(movie.release_date).toLocaleDateString("pt-BR")
      : "";

    // Get director
    const director =
      movie.credits?.crew.find((person) => person.job === "Director")?.name ||
      "";

    // Get top cast
    const topCast =
      movie.credits?.cast
        .slice(0, 5)
        .map((actor) => actor.name)
        .join(", ") || "";

    // Get trailer
    const trailer = movie.videos?.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    modalDetails.innerHTML = `
            <div class="movie-details">
                <div class="movie-poster">
                    <img src="${posterPath}" alt="${movie.title}">
                </div>
                <div class="movie-info-details">
                    <h2>${movie.title}</h2>
                    <div class="movie-meta">
                        ${
                          releaseDate
                            ? `<span><i class="fas fa-calendar"></i> ${releaseDate}</span>`
                            : ""
                        }
                        ${
                          formattedRuntime
                            ? `<span><i class="fas fa-clock"></i> ${formattedRuntime}</span>`
                            : ""
                        }
                        <span><i class="fas fa-star"></i> ${movie.vote_average.toFixed(
                          1
                        )}</span>
                    </div>
                    
                    ${
                      movie.genres.length > 0
                        ? `
                    <div class="genres">
                        ${movie.genres
                          .map(
                            (genre) => `
                            <span class="genre">${genre.name}</span>
                        `
                          )
                          .join("")}
                    </div>
                    `
                        : ""
                    }
                    
                    ${
                      movie.overview
                        ? `
                    <div class="overview">
                        <h3>Sinopse</h3>
                        <p>${movie.overview}</p>
                    </div>
                    `
                        : ""
                    }
                    
                    <div class="movie-credits">
                        ${
                          director
                            ? `<p><strong>Direção:</strong> ${director}</p>`
                            : ""
                        }
                        ${
                          topCast
                            ? `<p><strong>Elenco:</strong> ${topCast}</p>`
                            : ""
                        }
                    </div>
                    
                    ${
                      trailer
                        ? `
                    <div class="trailer-container">
                        <a href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank" class="trailer-button">
                            <i class="fab fa-youtube"></i> Assistir Trailer
                        </a>
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    modalDetails.innerHTML = `<div class="error-message">Erro ao carregar detalhes do filme.</div>`;
  }
}

function closeMovieModal() {
  modal.style.display = "none";
  modalDetails.innerHTML = "";
}

function handleSearch(e) {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (query) {
    currentPage = 1;
    currentSearchQuery = query;
    isSearching = true;
    searchMovies(query);
  }
}

function loadMoreMovies() {
  if (isLoading) return;

  currentPage++;
  if (isSearching) {
    searchMovies(currentSearchQuery, currentPage);
  } else {
    fetchPopularMovies(currentPage);
  }
}

function updateLoadMoreButton() {
  loadMoreBtn.style.display = currentPage < totalPages ? "block" : "none";
}

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  if (currentPage === 1) {
    moviesGrid.innerHTML = "";
  }

  moviesGrid.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 4000);
}

function showLoadingSpinner() {
  if (currentPage === 1) {
    moviesGrid.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    `;
  } else {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading";
    loadingDiv.innerHTML = "<div class='loading-spinner'></div>";
    loadMoreBtn.style.display = "none";
    moviesGrid.parentNode.insertBefore(loadingDiv, loadMoreBtn.parentNode);
  }
}

function hideLoadingSpinner() {
  const loadingElements = document.querySelectorAll(".loading");
  loadingElements.forEach((el) => el.remove());
}

function showModalLoadingSpinner() {
  modalDetails.innerHTML = `
      <div class="loading">
          <div class="loading-spinner"></div>
      </div>
  `;
}
