var temp = "";
var wind = "";
var rain = "";
var error = "";



document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("cityButton");
    button.addEventListener("click", function () {
        const cityInput = document.getElementById("cityIn");
        getWeather(cityInput.value);
    });
});





const buttons = document.querySelectorAll(".cities");


buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        getWeather(button.id);
    });
});



async function getWeather(city) {
    document.getElementById("cname").textContent = city;
    document.getElementById("temp").textContent = "Loading...";
    document.getElementById("wind").textContent = "Loading...";
    document.getElementById("rain").textContent = "Loading...";
    document.getElementById("error").textContent = "";


    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();


        if (!geoData.results || geoData.results.length == 0) {
            console.log("City not found");
            document.getElementById("error").textContent = "City not found";
            return;
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation&timezone=auto`
        );

        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        temp = current.temperature_2m + "°C";
        console.log("Temperature:", current.temperature_2m, "°C");
        wind = current.wind_speed_10m + "km/h";
        console.log("Wind:", current.wind_speed_10m, "km/h");
        rain = current.precipitation + "mm";
        console.log("Rain:", current.precipitation, "mm");

        document.getElementById("temp").textContent = temp;
        document.getElementById("wind").textContent = wind;
        document.getElementById("rain").textContent = rain;

    }
    catch (error) {
        document.getElementById("error").textContent = "Something went wrong";
        console.log("Error:", error);
        document.getElementById("error").textContent = "Something went wrong";
    }

}

