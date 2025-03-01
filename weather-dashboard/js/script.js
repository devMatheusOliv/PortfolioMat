// API Key do OpenWeatherMap
const API_KEY = "e5b903b790a8b61d34da0e5aa3883191"; // Chave API do OpenWeatherMap

// Lista de cidades principais de São Paulo
const SP_CITIES = [
  "São Paulo",
  "Guarulhos",
  "Campinas",
  "São Bernardo do Campo",
  "Santo André",
  "Osasco",
  "São José dos Campos",
  "Ribeirão Preto",
  "Sorocaba",
  "Santos",
  "Mogi das Cruzes",
  "Diadema",
  "Jundiaí",
  "Piracicaba",
  "Bauru",
  "São Vicente",
  "Itaquaquecetuba",
  "Franca",
  "Guarujá",
  "Taubaté",
  "Praia Grande",
  "Limeira",
];

// Elementos DOM
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const toggleUnitBtn = document.getElementById("toggle-unit");
const toggleThemeBtn = document.getElementById("toggle-theme");
const errorContainer = document.getElementById("error-container");
const errorText = document.getElementById("error-text");
const errorCloseBtn = document.getElementById("error-close-btn");
const loader = document.getElementById("loader");
const weatherInfo = document.getElementById("weather-info");
const forecastContainer = document.getElementById("forecast-container");

// Configurar datalist para sugestões de cidades
function setupCityDatalist() {
  const datalist = document.createElement("datalist");
  datalist.id = "sp-cities";

  SP_CITIES.forEach((city) => {
    const option = document.createElement("option");
    option.value = `${city}, SP, Brasil`;
    datalist.appendChild(option);
  });

  document.body.appendChild(datalist);
  cityInput.setAttribute("list", "sp-cities");
  cityInput.placeholder = "Digite o nome da cidade de SP...";
}

// Variáveis de estado
let currentUnit = "metric"; // 'metric' para Celsius, 'imperial' para Fahrenheit
let currentCity = "";
let currentWeatherData = null;
let forecastData = null;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Configurar datalist para cidades de SP
  setupCityDatalist();

  // Verificar tema salvo
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Verificar unidade salva
  if (localStorage.getItem("unit") === "imperial") {
    currentUnit = "imperial";
    toggleUnitBtn.textContent = "°F / °C";
  }

  // Verificar cidade salva
  const savedCity = localStorage.getItem("lastCity");
  if (savedCity) {
    cityInput.value = savedCity;
    searchWeather();
  } else {
    // Usar geolocalização para obter a cidade atual
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          // Usar São Paulo como padrão se a geolocalização falhar
          cityInput.value = "São Paulo";
          searchWeather();
        }
      );
    } else {
      // Usar São Paulo como padrão se a geolocalização não for suportada
      cityInput.value = "São Paulo";
      searchWeather();
    }
  }

  // Event Listeners
  searchBtn.addEventListener("click", searchWeather);
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchWeather();
  });
  toggleUnitBtn.addEventListener("click", toggleUnit);
  toggleThemeBtn.addEventListener("click", toggleTheme);
  errorCloseBtn.addEventListener("click", closeError);
});

// Funções principais
async function searchWeather() {
  const cityInput = document.getElementById("city-input");
  let city = cityInput.value.trim();

  // Adicionar ", SP, Brasil" se não estiver presente
  if (!city.includes(",")) {
    city += ", SP, Brasil";
  }

  if (!city) return;

  currentCity = city;
  localStorage.setItem("lastCity", city);

  showLoader();
  console.log("Buscando cidade:", city);

  try {
    // Codificar o nome da cidade para URL
    const encodedCity = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=${currentUnit}&appid=${API_KEY}&lang=pt_br`;

    const weatherResponse = await fetch(url);
    console.log("Status da resposta weather:", weatherResponse.status);

    const responseData = await weatherResponse.json();
    console.log("Resposta completa:", responseData);

    if (!weatherResponse.ok) {
      console.error("Erro detalhado da API:", responseData);
      if (weatherResponse.status === 401) {
        throw new Error(
          "Erro de autenticação com a API. Verifique a chave API."
        );
      } else if (weatherResponse.status === 404) {
        throw new Error(
          "Cidade não encontrada. Verifique o nome e tente novamente."
        );
      } else {
        throw new Error(
          `Erro na API (Código: ${weatherResponse.status} - ${
            responseData.message || "Erro desconhecido"
          })`
        );
      }
    }

    currentWeatherData = responseData;

    // Obter dados da previsão de 5 dias
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&units=${currentUnit}&appid=${API_KEY}&lang=pt_br`;
    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      throw new Error("Não foi possível obter a previsão");
    }

    forecastData = await forecastResponse.json();

    // Criar dados UV simulados (já que a API OneCall requer assinatura)
    const uvData = {
      current: {
        uvi: 5, // Valor médio padrão
        dt: Math.floor(Date.now() / 1000),
      },
    };

    // Atualizar a interface
    updateCurrentWeather(currentWeatherData, uvData);
    updateForecast(forecastData);

    hideLoader();
  } catch (error) {
    console.error("Erro completo:", error);
    hideLoader();
    showError(error.message);
  }
}

async function getWeatherByCoords(lat, lon) {
  showLoader();

  try {
    // Obter nome da cidade a partir das coordenadas
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      throw new Error("Não foi possível determinar sua localização");
    }

    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      throw new Error("Localização não encontrada");
    }

    const city = geoData[0].name;
    cityInput.value = city;
    currentCity = city;
    localStorage.setItem("lastCity", city);

    // Obter dados do clima
    await searchWeather();
  } catch (error) {
    hideLoader();
    showError(error.message);

    // Usar São Paulo como fallback
    cityInput.value = "São Paulo";
    searchWeather();
  }
}

// Funções de atualização da interface
function updateCurrentWeather(data, uvData) {
  // Atualizar informações principais
  document.getElementById(
    "city-name"
  ).textContent = `${data.name}, ${data.sys.country}`;

  const date = new Date();
  document.getElementById("date-time").textContent = formatDate(date);

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("weather-icon").src = iconUrl;

  const unitSymbol = currentUnit === "metric" ? "°C" : "°F";
  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}${unitSymbol}`;
  document.getElementById("feels-like").textContent = `Sensação: ${Math.round(
    data.main.feels_like
  )}${unitSymbol}`;

  document.getElementById("weather-condition").textContent =
    data.weather[0].description;

  const windSpeedUnit = currentUnit === "metric" ? "km/h" : "mph";
  const windSpeed =
    currentUnit === "metric" ? data.wind.speed * 3.6 : data.wind.speed;
  document.getElementById("wind-speed").textContent = `${windSpeed.toFixed(
    1
  )} ${windSpeedUnit}`;

  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;

  // Atualizar destaques
  const sunriseTime = new Date(data.sys.sunrise * 1000);
  const sunsetTime = new Date(data.sys.sunset * 1000);
  document.getElementById("sunrise").textContent = formatTime(sunriseTime);
  document.getElementById("sunset").textContent = formatTime(sunsetTime);

  // Índice UV (usando valor padrão ou da API)
  const uvIndex = uvData?.current?.uvi ?? 5;
  document.getElementById("uv-index").textContent = uvIndex.toFixed(1);

  // Definir texto do índice UV
  let uvText = "";
  let uvPercentage = 0;

  if (uvIndex < 3) {
    uvText = "Baixo";
    uvPercentage = (uvIndex / 3) * 33;
  } else if (uvIndex < 6) {
    uvText = "Moderado";
    uvPercentage = 33 + ((uvIndex - 3) / 3) * 33;
  } else if (uvIndex < 8) {
    uvText = "Alto";
    uvPercentage = 66 + ((uvIndex - 6) / 2) * 17;
  } else if (uvIndex < 11) {
    uvText = "Muito Alto";
    uvPercentage = 83 + ((uvIndex - 8) / 3) * 17;
  } else {
    uvText = "Extremo";
    uvPercentage = 100;
  }

  document.getElementById("uv-text").textContent = uvText;
  document.getElementById("uv-level").style.width = `${uvPercentage}%`;

  // Visibilidade
  const visibilityKm = data.visibility / 1000;
  const visibilityUnit = currentUnit === "metric" ? "km" : "mi";
  const visibilityValue =
    currentUnit === "metric" ? visibilityKm : visibilityKm * 0.621371;
  document.getElementById(
    "visibility"
  ).textContent = `${visibilityValue.toFixed(1)} ${visibilityUnit}`;

  // Direção do vento
  const windDegree = data.wind.deg;
  document.getElementById(
    "wind-arrow"
  ).style.transform = `rotate(${windDegree}deg)`;
  document.getElementById("wind-direction").textContent =
    getWindDirection(windDegree);

  // Mostrar informações
  weatherInfo.style.display = "block";
}

function updateForecast(data) {
  forecastContainer.innerHTML = "";

  // Agrupar previsões por dia (pegando apenas o meio-dia de cada dia)
  const dailyForecasts = {};

  data.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toISOString().split("T")[0];

    // Pegar apenas a previsão do meio-dia (ou a mais próxima)
    if (
      !dailyForecasts[day] ||
      Math.abs(date.getHours() - 12) <
        Math.abs(new Date(dailyForecasts[day].dt * 1000).getHours() - 12)
    ) {
      dailyForecasts[day] = forecast;
    }
  });

  // Converter para array e pegar os próximos 5 dias
  const dailyForecastArray = Object.values(dailyForecasts).slice(0, 5);

  // Criar cards para cada dia
  dailyForecastArray.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dayName = formatDay(date);
    const iconCode = forecast.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const temp = Math.round(forecast.main.temp);
    const unitSymbol = currentUnit === "metric" ? "°C" : "°F";

    const forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card";
    forecastCard.innerHTML = `
            <h4>${dayName}</h4>
            <img src="${iconUrl}" alt="${forecast.weather[0].description}">
            <p class="temp">${temp}${unitSymbol}</p>
            <p class="temp-range">${forecast.weather[0].description}</p>
        `;

    forecastContainer.appendChild(forecastCard);
  });
}

// Funções utilitárias
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options);
}

function formatDay(date) {
  const options = { weekday: "short" };
  return date.toLocaleDateString("pt-BR", options);
}

function formatTime(date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getWindDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function toggleUnit() {
  currentUnit = currentUnit === "metric" ? "imperial" : "metric";
  toggleUnitBtn.textContent = currentUnit === "metric" ? "°C / °F" : "°F / °C";
  localStorage.setItem("unit", currentUnit);

  if (currentCity) {
    searchWeather();
  }
}

function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle("dark-theme");
  toggleThemeBtn.innerHTML = isDarkTheme
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
}

function showLoader() {
  loader.style.display = "flex";
  weatherInfo.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError(message) {
  errorText.textContent = message;
  errorContainer.style.display = "flex";
}

function closeError() {
  errorContainer.style.display = "none";
}
