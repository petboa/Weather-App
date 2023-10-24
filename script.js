const apiKey = "50ac82dfb59f173ca83a45389d99a854";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            errorElement.style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            errorElement.style.display = "none";
            document.querySelector(".weather").style.display = "block";


            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            if (data.weather[0].main.toLowerCase() === "clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main.toLowerCase() === "clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main.toLowerCase() === "rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main.toLowerCase() === "drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main.toLowerCase() === "mist") {
                weatherIcon.src = "images/mist.png";
            } else if (data.weather[0].main.toLowerCase() === "snow") {
                weatherIcon.src = "images/snow.png";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
        errorElement.style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    checkWeather(city);
});

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async(position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

        if (response.status === 404) {
            errorElement.style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else if (!response.ok) {
            errorElement.style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            errorElement.style.display = "none";
            document.querySelector(".weather").style.display = "block";

            const data = await response.json();
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            if (data.weather[0].main.toLowerCase() === "clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main.toLowerCase() === "clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main.toLowerCase() === "rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main.toLowerCase() === "drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main.toLowerCase() === "mist") {
                weatherIcon.src = "images/mist.png";
            } else if (data.weather[0].main.toLowerCase() === "snow") {
                weatherIcon.src = "images/snow.png";
            }
        }
    });
}