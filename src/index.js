function updateWeather(response) {
  let temperatureelement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let Cityelement = document.querySelector("#city");
  let descriptionelement = document.querySelector("#description");
  let humidityelement = document.querySelector("#humidity");
  let windspeedelement = document.querySelector("#wind-speed");
  let timeelement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconelement = document.querySelector("#icon");

  iconelement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  Cityelement.innerHTML = response.data.city;
  timeelement.innerHTML = `${formatDate(date)},`;
  descriptionelement.innerHTML = response.data.condition.description;
  humidityelement.innerHTML = `${response.data.temperature.humidity}%,`;
  windspeedelement.innerHTML = `${response.data.wind.speed}km/hr`;
  temperatureelement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function Searchcity(city) {
  let apikey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function FormSubmit(event) {
  event.preventDefault();
  let SearchInput = document.querySelector("#search-form-input");

  Searchcity(SearchInput.value);
}
function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let Searchformelement = document.querySelector("#search-form");
Searchformelement.addEventListener("submit", FormSubmit);

Searchcity("Lagos");

displayForecast();

