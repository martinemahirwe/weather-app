const apiKey = 'fc47e8108c0b9a3124581a654ae272ce';
const form = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');
const weatherDataContainer = document.getElementById('weatherData');
const loadingSpinner = document.getElementById('loadingSpinner');

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = locationInput.value;
  const unit = document.querySelector('input[name="unit"]:checked').value;

  showLoadingSpinner();

  getWeatherData(location, unit)
  .then(data => {
    displayWeatherData(data);
    hideLoadingSpinner(); 
  })
  .catch(error => {
    console.log(error);
    hideLoadingSpinner(); 
  });

});

async function getWeatherData(location, unit) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

function displayWeatherData(data) {
  const temperature = data.main.temp;
  const condition = data.weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const unit = document.querySelector('input[name="unit"]:checked').value === 'metric' ? '°C' : '°F';

  const html = `
    <div class="weather-info">
      <div class="condition">${condition}</div>
      <img src="${icon}" alt="${condition}">
      <div class="temperature">${temperature}${unit}</div>
    </div>
  `;

  weatherDataContainer.innerHTML = html;
}

function showLoadingSpinner() {
  loadingSpinner.classList.remove('hidden');
}

function hideLoadingSpinner() {
  loadingSpinner.classList.add('hidden');
}
