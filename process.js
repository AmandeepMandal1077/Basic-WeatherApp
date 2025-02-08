document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = process.env.API_KEY;

    const inputField = document.getElementById("location-input");
    const findBtn = document.getElementById("search-btn");
    const weatherInfo = document.getElementById("weather-info");
    const locationField = document.getElementById("location");
    const temperaturField = document.getElementById("temperature");
    const weatherField = document.getElementById("weather");
    const errorField = document.getElementById("error");

    async function FetchData(loc) {
        try {
            spinner.classList.remove("hidden");
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${API_KEY}`;
            const response = await fetch(url);
            spinner.classList.add("hidden");

            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            return data;
        } catch (msg) {
            spinner.classList.add("hidden");
            errorField.textContent = msg;
            errorField.classList.remove("hidden");
            weatherInfo.classList.add("hidden");
        }
    }

    function UpdateWeatherInfo(data) {
        errorField.classList.add("hidden");
        weatherInfo.classList.remove("hidden", "opacity-0");

        const { name, main, weather, wind, visibility } = data;
        const { temp, humidity, pressure, feels_like } = main;
        const valC = Math.round(temp - 273.15);
        const feelsLikeC = Math.round(feels_like - 273.15);

        locationField.textContent = `Location: ${name}`;
        temperaturField.textContent = `Temperature: ${valC}°C`;
        weatherField.textContent = `Weather: ${weather[0].main}`;
        document.getElementById(
            "humidity"
        ).textContent = `Humidity: ${humidity}%`;
        document.getElementById(
            "pressure"
        ).textContent = `Pressure: ${pressure} hPa`;
        document.getElementById(
            "visibility"
        ).textContent = `Visibility: ${visibility}m`;
        document.getElementById("wind").textContent = `Wind: ${wind.speed} m/s`;
        document.getElementById(
            "feels-like"
        ).textContent = `Feels Like: ${feelsLikeC}°C`;
    }

    function UpdateTemperature(temp) {
        if (!temp) {
            return;
        }
        temperaturField.textContent = `Temperature: ${temp} C`;
    }

    function UpdateLocation(loc) {
        if (!loc) {
            return;
        }
        locationField.textContent = `Location: ${loc}`;
    }

    function UpdateWeather(weather) {
        if (!weather) {
            return;
        }
        weatherField.textContent = `Weather: ${weather}`;
    }

    findBtn.addEventListener("click", async () => {
        let content = inputField.value.trim();
        if (content == "") {
            return;
        }

        const data = await FetchData(content);
        if (data) {
            UpdateWeatherInfo(data);
        }

        inputField.value = "";
    });
});
