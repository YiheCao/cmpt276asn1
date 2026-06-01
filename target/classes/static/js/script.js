var temp = "";
var wind = "";
var rain = "";
async function getWeather(city) {
    try {
        const geoRes = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1');
        const geoData = await geoRes.json();


        if (!geoData.results || geoData.results.length == 0) {
            console.log("City not found");
            return;
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation&timezone=auto`
        );

        const weatherData = await weatherRes.json();
        const current = weatherData.current;


        console.log("Temperature:", current.temperature_2m, "°C");
        console.log("Wind:", current.wind_speed_10m, "km/h");
        console.log("Rain:", current.precipitation, "mm");

    }
    catch (error) {
        console.log("Error:", error);
    }

}