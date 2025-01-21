"use strict";

const searchBar = document.querySelector(".search-bar-input");
let locationCountry = document.querySelector(".location-country");
let locationCity = document.querySelector(".location-city");
let locationTemp = document.querySelector(".location-temp");
let locationWindspeed = document.querySelector(".location-windspeed");
let locationHumidity = document.querySelector(".location-humidity");
let locationDesc = document.querySelector(".location-desc");
const scroller = document.querySelector(".scroll-to-link");
const apiKey = "6df5e72a8b2f47918d9103107252101";

document.addEventListener("keydown", function (e) {
  // Check if Enter key is pressed and the input is not empty
  if (e.key === "Enter" && searchBar.value.trim() !== "") {
    const location = searchBar.value.trim(); // Get the user input
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    // Fetch weather data
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Display data in the console
        console.log("Weather Data:", data);
        console.log(
          `Location: ${data.location.name}, ${data.location.country}`
        );
        console.log(`Temperature: ${data.current.temp_c}°C`);
        console.log(`Condition: ${data.current.condition.text}`);

        locationCity.textContent = data.location.name;
        locationCountry.textContent = data.location.country;
        locationTemp.textContent =
          data.current.temp_c + " °C" + "/" + data.current.temp_f + " °F";
        locationDesc.textContent = data.current.condition.text;
        locationWindspeed.textContent =
          data.current.wind_mph + "MPH" + "/ " + data.current.wind_kph + "KPH";
        locationHumidity.textContent = data.current.humidity;
      })
      .catch((error) => {
        alert("Oops! There's been an error.");
        console.error("Error fetching weather data:", error);
      });
    document
      .getElementById("result-area")
      .scrollIntoView({ behavior: "smooth" });
  }
});
