/* ------------------------ DECLARE REUSABLE VARIABLE ----------------------- */
const heading = document.getElementById("heading");
const container = document.getElementById("container");
const spinner = `<div class="spinner-border text-white mt-3" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;
let inputName;

/* ---------------------------- FETCH & LOAD DATA --------------------------- */
const loadData = () => {
  container.innerHTML = spinner;
  const inputField = document.getElementById("location-input");
  const locationName = inputField.value;
  inputField.value = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=605589626e3cc9c69ccb122babbf0cc6`;

  ////////////CONDITIONS TO LOAD DATA
  if (locationName == "") {
    container.innerHTML = `<h4 class="text-white">Please enter your city name..</h4>`;
  } else {
    inputName = locationName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayWeather(data));
  }
};

/* -------------------------- DISPLAY WEATHER DATA -------------------------- */
const displayWeather = (weather) => {
  ///////////CHECK IF WEATHER DATA IS VALID OR NOT
  if (weather.cod == 404) {
    container.innerHTML = `<h4 class="text-white">Sorry, ${inputName} is not found..</h4>`;
  } else {
    heading.innerText = `Welcome to World Weather`;
    container.textContent = "";

    ///////////CITY INFO
    const cityName = weather.name;
    const temperature = Math.round(weather.main.temp - 273.15);
    const weatherSituation = weather.weather[0].main;
    const weatherIcon = weather.weather[0].icon;

    ///////////CREATE NEW DIV & APPENED INTO CONTAINER
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
