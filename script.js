function displayDateTime(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jully",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let currentDate = now.getDate();
  let year = now.getFullYear();
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${day}, ${month} ${currentDate}, ${year} <br/> local time ${currentHours}:${currentMinutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector(
    "#current-temperature-displayed"
  );
  let temperature = displayedTemperature.innerHTML;
  temperature = Number(temperature);
  displayedTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector(
    "#current-temperature-displayed"
  );
  let temperature = displayedTemperature.innerHTML;
  temperature = Number(temperature);
  displayedTemperature.innerHTML = "19";
}

let currentDateTime = document.querySelector("#current-date-time");
let now = new Date();
currentDateTime.innerHTML = displayDateTime(now);

function getWeatherData(response) {
  console.log(response.data);
  document.querySelector("#displayed-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature-displayed").innerHTML =
    Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "ff099235c69da20db0648197324b0d72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeatherData);
  console.log(apiUrl);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function loadCurrentPosition(position) {
  let apiKey = "ff099235c69da20db0648197324b0d72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeatherData);
}

function getCurrLocation(event) {
  debugger;
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(loadCurrentPosition);
}

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("Tokyo");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrLocation);
