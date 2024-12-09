const getLocationButton = document.getElementById('getLocationButton');
const weatherInfo = document.getElementById('weatherInfo');
const city = document.getElementById('city');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

// Fetch weather data
async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
}

// Display weather information
function displayWeather(data) {
    city.textContent = `📍 ${data.name}, ${data.sys.country}`;
    description.textContent = `🌤️ ${data.weather[0].description}`;
    temperature.textContent = `🌡️ Temperature: ${data.main.temp}°C`;
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    weatherInfo.classList.remove('hidden');
}

// Get user's location
function getLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        },
        (error) => {
            alert('Unable to retrieve location: ' + error.message);
        }
    );
}

// Event listener
getLocationButton.addEventListener('click', getLocation);
