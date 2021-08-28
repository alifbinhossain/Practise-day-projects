const heading = document.getElementById("heading");
const container = document.getElementById("container");
let inputName;

/* ---------------------------- FETCH & LOAD DATA --------------------------- */
const loadData = () => {
  const inputField = document.getElementById("location-input");
  const locationName = inputField.value;
  inputField.value = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=605589626e3cc9c69ccb122babbf0cc6`;
  if (locationName == "") {
    heading.innerText = `Please enter your city name!`;
    container.textContent = "";
  } else {
    inputName = locationName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayWeather(data));
  }
};

/* -------------------------- DISPLAY WEATHER DATA -------------------------- */
const displayWeather = (weather) => {
  if (weather.cod == 404) {
    heading.innerText = `Sorry, ${inputName} is not found..`;
  } else {
    heading.innerText = `Welcome to World Weather`;
    container.textContent = "";

    const cityName = weather.name;
    const temperature = Math.round(weather.main.temp - 273.15);
    const weatherSituation = weather.weather[0].main;
    const weatherIcon = weather.weather[0].icon;

    const weatherInfo = document.createElement("div");
    weatherInfo.classList.add("weather-info");
    weatherInfo.innerHTML = `
       <img
          class="icon"
          src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"
          alt=""
       />
  
      <h2>${cityName}</h2>
      <h3>${temperature}°C</h3>
      <p>${weatherSituation}</p>
    `;
    container.appendChild(weatherInfo);
  }
};
