const apiKey = 'e2daddbf5ecb482498c12854252501';
async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temp').textContent = data.current.temp_c;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = data.current.humidity;
    document.getElementById('wind').textContent = data.current.wind_kph;
    document.getElementById('icon').src = "https:" + data.current.condition.icon;

    document.getElementById('weatherInfo').classList.remove('hidden');
  } catch (error) {
    alert("Error fetching weather: " + error.message);
    document.getElementById('weatherInfo').classList.add('hidden');
  }
}

document.getElementById("cityInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getWeather();
  }
});
