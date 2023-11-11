const apiKey = "354aec74d95706242b344ef7deaa989d";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl} ${city} &appid=${apiKey}`);

  if (response.status === 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(
      data.main.temp
    )} °C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity} %`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "./images/mist.png";
    }
    error.style.display = "none";
    weather.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
