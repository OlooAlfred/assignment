const apiKey = 'e01cce10c5363c6c04eb5ab488910214';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city = "Paris") {
    if (!city) return;

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {

        return;
    }

    const data = await response.json();

    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("temp-value").innerHTML = Math.round(data.main.temp);
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind-speed").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    switch (weatherMain) {
        case "Clouds":
            weatherIcon.innerHTML = "☁️";
            break;
        case "Clear":
            weatherIcon.innerHTML = "☀️";
            break;
        case "Rain":
            weatherIcon.innerHTML = "🌧️";
            break;
        case "Drizzle":
            weatherIcon.innerHTML = "🌦️";
            break;
        case "Mist":
            weatherIcon.innerHTML = "🌫️";
            break;
        default:
            weatherIcon.innerHTML = "❓";
            break;
    }

    const utcTimestamp = data.dt * 1000;
    const timezoneOffset = data.timezone * 1000;
    const localCityTime = new Date(utcTimestamp + timezoneOffset);

    let hours = localCityTime.getUTCHours();
    const minutes = localCityTime.getUTCMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const formattedDate = `${localCityTime.toLocaleDateString('en-US', { weekday: 'long' })} ${hours}:${minutes} ${ampm}`;

    const weatherDescription = data.weather[0].description;
    document.getElementById("weather-details").innerHTML = `${formattedDate}, <span>${weatherDescription}</span>`;

}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

checkWeather();