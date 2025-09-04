const API_KEY = '350f29065202ef393a75d3ddefaf1f49';

// Theme Management
let isDarkTheme = true;

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('light-theme', !isDarkTheme);
  document.getElementById('theme-toggle').textContent = isDarkTheme ? '🌙' : '☀️';
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Loading Spinner
function showLoading() {
  document.getElementById('loading-spinner').classList.add('show');
}

function hideLoading() {
  document.getElementById('loading-spinner').classList.remove('show');
}

// Weather Alerts
function showWeatherAlert(message, type = 'warning') {
  const alertsContainer = document.getElementById('weather-alerts');
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-item';
  alertDiv.innerHTML = `
    <strong>⚠️ Weather Alert</strong>
    <p>${message}</p>
  `;
  alertsContainer.appendChild(alertDiv);
  
  // Auto remove after 10 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 10000);
}

// GSAP Background Animation Function
function setWeatherBackground(condition) {
  let colors, particleColor;

  switch (condition.toLowerCase()) {
    case 'clear':
      colors = ['rgba(255, 154, 158, 0.6)', 'rgba(250, 208, 196, 0.4)']; // warm sunny gradient
      particleColor = '#ffeb3b';
      break;
    case 'clouds':
      colors = ['rgba(189, 195, 199, 0.6)', 'rgba(44, 62, 80, 0.4)']; // grey cloudy
      particleColor = '#9e9e9e';
      break;
    case 'rain':
      colors = ['rgba(0, 198, 251, 0.6)', 'rgba(0, 91, 234, 0.4)']; // blue rainy
      particleColor = '#03a9f4';
      break;
    case 'snow':
      colors = ['rgba(224, 234, 252, 0.6)', 'rgba(207, 222, 243, 0.4)']; // icy white-blue
      particleColor = '#e3f2fd';
      break;
    case 'thunderstorm':
      colors = ['rgba(20, 30, 48, 0.8)', 'rgba(36, 59, 85, 0.6)']; // dark stormy
      particleColor = '#9c27b0';
      break;
    case 'drizzle':
      colors = ['rgba(100, 181, 246, 0.6)', 'rgba(63, 81, 181, 0.4)']; // light blue
      particleColor = '#2196f3';
      break;
    default:
      colors = ['rgba(0, 255, 255, 0.4)', 'rgba(15, 12, 41, 0.8)']; // default neon
      particleColor = '#00ffff';
  }

  // Animate background transition with GSAP
  gsap.to(".animated-bg", {
    duration: 3,
    background: `radial-gradient(circle at center, ${colors[0]}, ${colors[1]})`,
    ease: "power2.inOut"
  });

  // Add floating animation
  gsap.to(".animated-bg", {
    duration: 20,
    rotation: 360,
    repeat: -1,
    ease: "none"
  });

  // Scale pulsing effect
  gsap.to(".animated-bg", {
    scale: 1.1,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// Initialize GSAP animations on page load
function initGSAPAnimations() {
  // Initial floating animation
  gsap.to(".animated-bg", {
    duration: 20,
    rotation: 360,
    repeat: -1,
    ease: "none"
  });

  // Weather cards entrance animation
  gsap.from(".weather-main", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "back.out(1.7)"
  });

  gsap.from(".search-bar", {
    duration: 1.2,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power2.out"
  });

  gsap.from(".forecast", {
    duration: 1.5,
    y: 40,
    opacity: 0,
    delay: 0.6,
    ease: "power2.out"
  });
}

const weatherIconMap = {
  'Clear': 'assets/icons/sunny.json',
  'Clouds': 'assets/icons/Weather-storm.json',
  'Rain': 'assets/icons/Weather-storm.json',
  'Snow': 'assets/icons/Weather-snow sunny.json',
  'Thunderstorm': 'assets/icons/Weather-storm.json',
  'Drizzle': 'assets/icons/Weather-storm.json',
  'Mist': 'assets/icons/Weather-snow sunny.json',
  'Smoke': 'assets/icons/Weather-snow sunny.json',
  'Haze': 'assets/icons/sunny.json',
  'Dust': 'assets/icons/Weather-snow sunny.json',
  'Fog': 'assets/icons/Weather-snow sunny.json',
  'Sand': 'assets/icons/Weather-snow sunny.json',
  'Ash': 'assets/icons/Weather-snow sunny.json',
  'Squall': 'assets/icons/Weather-storm.json',
  'Tornado': 'assets/icons/Weather-storm.json',
};

function showToast(message, type = 'error') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  
  // Change toast color based on type
  if (type === 'info') {
    toast.style.background = 'rgba(0, 150, 255, 0.9)';
    toast.style.boxShadow = '0 0 20px #0096ff';
  } else if (type === 'success') {
    toast.style.background = 'rgba(76, 175, 80, 0.9)';
    toast.style.boxShadow = '0 0 20px #4caf50';
  } else {
    toast.style.background = 'rgba(255, 0, 80, 0.9)';
    toast.style.boxShadow = '0 0 20px #ff0050';
  }
  
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function setWeatherIcon(condition) {
  const iconDiv = document.getElementById('weather-icon');
  const iconPath = weatherIconMap[condition] || weatherIconMap['Clear'];
  
  // Try Lottie first, fallback to emoji if fails
  iconDiv.innerHTML = `<lottie-player 
    src="${iconPath}" 
    background="transparent" 
    speed="1" 
    style="width: 100px; height: 100px;" 
    loop 
    autoplay
    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
  </lottie-player>
  <div class="fallback-icon" style="display: none; font-size: 70px; text-align: center;">
    ${getWeatherEmoji(condition)}
  </div>`;
}

function getWeatherEmoji(condition) {
  const emojiMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Snow': '❄️',
    'Thunderstorm': '⛈️',
    'Drizzle': '🌦️',
    'Mist': '🌫️',
    'Smoke': '💨',
    'Haze': '🌤️',
    'Dust': '💨',
    'Fog': '🌫️',
    'Sand': '💨',
    'Ash': '💨',
    'Squall': '🌪️',
    'Tornado': '🌪️',
  };
  return emojiMap[condition] || '☀️';
}

function displayWeather(data) {
  document.getElementById('weather-temp').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('weather-location').textContent = `${data.name}, ${data.sys.country}`;
  
  // Update weather details
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
  document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
  
  setWeatherIcon(data.weather[0].main);
  
  // Update background based on weather condition
  setWeatherBackground(data.weather[0].main);
  
  // Check for weather alerts
  checkWeatherAlerts(data);
}

function displayForecast(forecastData) {
  const cardsDiv = document.getElementById('forecast-cards');
  cardsDiv.innerHTML = '';
  
  // Group by day for 5-day forecast
  const days = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    if (!days[day]) days[day] = item;
  });
  
  Object.values(days).slice(0, 5).forEach(item => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    const iconPath = weatherIconMap[item.weather[0].main] || weatherIconMap['Clear'];
    const fallbackEmoji = getWeatherEmoji(item.weather[0].main);
    card.innerHTML = `
      <div class="forecast-icon">
        <lottie-player 
          src="${iconPath}" 
          background="transparent" 
          speed="1" 
          style="width: 50px; height: 50px;" 
          loop 
          autoplay
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        </lottie-player>
        <div class="fallback-icon" style="display: none; font-size: 35px; text-align: center;">
          ${fallbackEmoji}
        </div>
      </div>
      <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
      <div class="forecast-desc">${item.weather[0].main}</div>
      <div class="forecast-date">${new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</div>
    `;
    cardsDiv.appendChild(card);
  });
  
  // Display hourly forecast (first 8 hours)
  displayHourlyForecast(forecastData.list.slice(0, 8));
}

function displayHourlyForecast(hourlyData) {
  const hourlyDiv = document.getElementById('hourly-cards');
  hourlyDiv.innerHTML = '';
  
  hourlyData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'hourly-card';
    const time = new Date(item.dt * 1000).toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const iconPath = weatherIconMap[item.weather[0].main] || weatherIconMap['Clear'];
    const fallbackEmoji = getWeatherEmoji(item.weather[0].main);
    
    card.innerHTML = `
      <div class="hourly-time">${time}</div>
      <div class="hourly-icon">
        <lottie-player 
          src="${iconPath}" 
          background="transparent" 
          speed="1" 
          style="width: 30px; height: 30px;" 
          loop 
          autoplay
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        </lottie-player>
        <div class="fallback-icon" style="display: none; font-size: 20px;">
          ${fallbackEmoji}
        </div>
      </div>
      <div class="hourly-temp">${Math.round(item.main.temp)}°</div>
    `;
    hourlyDiv.appendChild(card);
  });
}

function checkWeatherAlerts(data) {
  const temp = data.main.temp;
  const condition = data.weather[0].main.toLowerCase();
  
  // Clear previous alerts
  document.getElementById('weather-alerts').innerHTML = '';
  
  // Temperature alerts
  if (temp > 35) {
    showWeatherAlert('Extreme heat warning! Temperature above 35°C. Stay hydrated and avoid outdoor activities.');
  } else if (temp < 0) {
    showWeatherAlert('Freezing temperature alert! Roads may be icy. Drive carefully.');
  }
  
  // Weather condition alerts
  if (condition === 'thunderstorm') {
    showWeatherAlert('Thunderstorm warning! Seek shelter indoors and avoid outdoor activities.');
  } else if (condition === 'snow') {
    showWeatherAlert('Snow alert! Expect travel delays and slippery roads.');
  } else if (condition === 'rain' && data.wind.speed > 10) {
    showWeatherAlert('Heavy rain and strong winds! Use caution when traveling.');
  }
}

function fetchWeatherByCoords(lat, lon) {
  showLoading();
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      displayWeather(data);
      fetchForecastByCoords(lat, lon);
      localStorage.setItem('lastCity', data.name);
      showToast(`Weather loaded for ${data.name}!`, 'success');
    })
    .catch(err => {
      console.error('Weather fetch error:', err);
      showToast('Failed to load weather data: ' + err.message);
    })
    .finally(() => {
      hideLoading();
    });
}

function fetchForecastByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== "200") throw new Error(data.message);
      displayForecast(data);
    })
    .catch(err => showToast('Forecast error: ' + err.message));
}

function fetchWeatherByCity(city) {
  showLoading();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      displayWeather(data);
      fetchForecastByCity(city);
      localStorage.setItem('lastCity', city);
      showToast(`Weather updated for ${data.name}!`, 'success');
    })
    .catch(err => {
      console.error('City weather error:', err);
      showToast('City not found or API error!');
    })
    .finally(() => {
      hideLoading();
    });
}

function fetchForecastByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== "200") throw new Error(data.message);
      displayForecast(data);
    })
    .catch(err => showToast('Forecast error: ' + err.message));
}

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) fetchWeatherByCity(city);
});

document.getElementById('city-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const city = document.getElementById('city-input').value.trim();
    if (city) fetchWeatherByCity(city);
  }
});

// Theme toggle event listener
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

window.onload = function() {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    toggleTheme();
  }
  
  // Initialize GSAP animations
  initGSAPAnimations();
  
  const lastCity = localStorage.getItem('lastCity');
  if (lastCity) {
    console.log('Loading last searched city:', lastCity);
    fetchWeatherByCity(lastCity);
  } else if (navigator.geolocation) {
    console.log('Requesting geolocation...');
    showToast('Getting your location...', 'info');
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log('Got coordinates:', pos.coords.latitude, pos.coords.longitude);
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        showToast('Location access denied. Showing default weather.');
        // Fallback to a default city
        fetchWeatherByCity('New York');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  } else {
    console.log('Geolocation not supported');
    showToast('Geolocation not supported. Showing default weather.');
    fetchWeatherByCity('New York');
  }
};
