const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector("#city");
const weatherCard = document.querySelector(".weathercard");
const apiKey = "374a9fa3c2be1d7084ac0a792db68d9d";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch (error) {
            displayError(error.message || "An unknown error occurred.");
        }
    } else {
        displayError("Enter the city name");
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not get the weather");
    }
    return await response.json();
}

function displayWeather(data) {
    console.log(data);
    const { name: city, main: { temp, humidity }, weather: [{ description, id }], wind: { speed } } = data;

    weatherCard.textContent = " ";
    weatherCard.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const weatherDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    var temperature = temp - 273.15;
    temperature = temperature.toFixed(2);
    tempDisplay.textContent =`${temperature}°C` ;  // Corrected conversion   
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherDisplay.textContent = description;
    windDisplay.textContent = `wind:${speed} km/h`;

    emojiDisplay.textContent = getWeatheremoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherDisplay.classList.add("weatherDisplay");
    windDisplay.classList.add("windDisplay");
    emojiDisplay.classList.add("emojiDisplay");

    weatherCard.appendChild(cityDisplay);
    weatherCard.appendChild(tempDisplay);
    weatherCard.appendChild(humidityDisplay);
    weatherCard.appendChild(weatherDisplay);
    weatherCard.appendChild(windDisplay);
    weatherCard.appendChild(emojiDisplay);
}

function getWeatheremoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "🌧️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 400 && weatherId < 500):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId == 800):
            return "☀️";
        case (weatherId == 801 && weatherId < 900):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    weatherCard.textContent = " ";
    errorDisplay.classList.add("errorDisplay");

    errorDisplay.textContent = message;
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorDisplay);
}
