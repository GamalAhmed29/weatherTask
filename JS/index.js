let cities = [];






function saveToLocalStorage() {
  localStorage.setItem("cities", JSON.stringify(cities));
}


function loadFromLocalStorage() {
  let savedCities = localStorage.getItem("cities");
  if (savedCities) {
    cities = JSON.parse(savedCities);
    view(); 
  }
}

async function getWeather(city) {
  try {
    let weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=fd0f8af993924a99879182406241306&q=${city}&aqi=no`
    );
    if (!weather.ok) {
      throw new Error("Network response was not ok " + weather.statusText);
    }
    let data = await weather.json();
    cities.push(data);
    saveToLocalStorage(); 
    console.log(data); 
    view();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function display() {
  let cityInput = document.querySelector("#cityInput input");
  let city = cityInput.value;
  if (city.trim() === "") {
    console.log("Please enter a city name.");
    return;
  }
  getWeather(city);
}

function view() {
  let cartona = "";
  for (let i = 0; i < cities.length; i++) {
    let lastUpdated = new Date(cities[i].current.last_updated);
    let dayOfWeek = lastUpdated.toLocaleDateString("en-US", {
      weekday: "long",
    });
    let date = lastUpdated.getDate();
    let month = lastUpdated.toLocaleDateString("en-US", { month: "short" });

    let tomorrow = new Date(lastUpdated);
    tomorrow.setDate(lastUpdated.getDate() + 1);
    let options = { weekday: "long" };
    let tomorrowName = tomorrow.toLocaleDateString("en-US", options);
    let lastDay = new Date(lastUpdated);
    lastDay.setDate(lastUpdated.getDate() + 2);
    let lastDayName = lastDay.toLocaleDateString("en-US", options);
    
    let iconUrl = `http:${cities[i].current.condition.icon}`;
    cartona += `
      <div class="col-md-4">
        <div class="weather">
          <div class="weatherHeaer">
            <span>${dayOfWeek}</span>
            <span class="date">${date} ${month}</span>
          </div>   
          <h6 class="location">${cities[i].location.name}</h6>
          <h6 class="temp">${cities[i].current.temp_c}°C   
            <img class="icon1" src="${iconUrl}" alt="Weather Icon">
          </h6>
          <span class="condition">${cities[i].current.condition.text}</span> 
          <div class="statue">
            <span class="statue1">
              <img class="Icon" src="Images/icon-umberella@2x.png" alt="umberella"> ${cities[i].current.humidity}% 
            </span>
            <span class="statue1">
              <img class="Icon" src="Images/icon-wind@2x.png" alt="umberella"> ${cities[i].current.wind_kph} kph 
            </span>
            <span class="statue1">
              <img class="Icon" src="Images/icon-compass@2x.png" alt="umberella"> ${cities[i].current.pressure_mb} mb
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="weather">
          <div class="weatherHeaer">
            <span class="header text-center">${tomorrowName}</span>
          </div> 
          <h6 class="location">${cities[i].location.name}</h6>
          <h6 class="temp">${cities[i].current.temp_c}°C   
            <img class="icon1" src="${iconUrl}" alt="Weather Icon">
          </h6>
          <span class="condition">${cities[i].current.condition.text}</span> 
          <div class="statue">
            <span class="statue1">
              <img class="Icon" src="Images/icon-umberella@2x.png" alt="umberella"> ${cities[i].current.humidity}% 
            </span>
            <span class="statue1">
              <img class="Icon" src="Images/icon-wind@2x.png" alt="umberella"> ${cities[i].current.wind_kph} kph 
            </span>
            <span class="statue1">
              <img class="Icon" src="Images/icon-compass@2x.png" alt="umberella"> ${cities[i].current.pressure_mb} mb
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="weather">
          <div class="weatherHeaer">
            <span class="header text-center">${lastDayName}</span>
          </div>   
          <h6 class="location">${cities[i].location.name}</h6>
          <h6 class="temp">${cities[i].current.temp_c}°C   
            <img class="icon1" src="${iconUrl}" alt="Weather Icon">
          </h6>
          <span class="condition">${cities[i].current.condition.text}</span> 
          <div class="statue">
            <span class="statue1">
              <img class="Icon" src="Images/icon-umberella@2x.png" alt="umberella"> ${cities[i].current.humidity}% 
            </span>
            <span class="statue1">
              <img class="Icon" src="Images/icon-wind@2x.png" alt="umberella"> ${cities[i].current.wind_kph} kph 
            </span>
            <span class="statue1">
              <img class="Icon" src="Images/icon-compass@2x.png" alt="umberella"> ${cities[i].current.pressure_mb} mb
            </span>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById("row").innerHTML = cartona;
}


document.addEventListener("DOMContentLoaded", function () {
  loadFromLocalStorage(); 
  document.getElementById("getWeatherButton").onclick = display;
});
