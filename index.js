let showDate = document.querySelector("#current-date");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
showDate.innerHTML = `${day}, ${hours}:${minutes}`;

const searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", search);

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#h1").innerHTML = response.data.name;
  document.querySelector("#temperature-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  console.log({ city });
  let apiKey = "5a27d3182080e072019af9925b777d30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function searchPosition(position) {
  let apiKey = "5a27d3182080e072019af9925b777d30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", showCurrentLocation);

function searchDefault(city) {
  let apiKey = "5a27d3182080e072019af9925b777d30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
searchDefault("New York");
