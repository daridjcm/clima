const apiKey = import.meta.env.VITE_API_KEY;

const btn = document.getElementById('btn');
const infoGeneral = document.getElementById('infoWeather')
const containerWeather = document.getElementById('weather-info')
const infoWeather1 = document.getElementById('infoWeather1')
const infoWeather2 = document.getElementById('infoWeather2')

const getWeather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {

      if (data.cod !== 200) {
        infoGeneral.innerHTML =
          'Información <span style="color: darkred;">NO</span> encontrada.';
        containerWeather.style.display = 'none';
        return;
      }

      infoGeneral.innerHTML = 'Información encontrada exitosamente.';
      displayWeather(data);
    })
    .catch(error => {
      console.error(error);
      infoGeneral.innerHTML =
        'Ocurrió un error al consultar la información.';
    });
};

const displayWeather = (data) => {
  containerWeather.style.display = 'flex';

  infoWeather1.innerHTML = `
  📍 Ciudad: ${data.name}, ${data.sys.country}<br>
  🌡️ Temperatura: ${(data.main.temp - 273.15).toFixed(1)} °C<br>
  🥵 Sensación térmica: ${(data.main.feels_like - 273.15).toFixed(1)} °C<br>
  🌦️ Clima: ${data.weather[0].description}<br>
  ☁️ Nubosidad: ${data.clouds.all}%
  `;

  infoWeather2.innerHTML = `
  💧 Humedad: ${data.main.humidity}%<br>
  ⏱️ Presión: ${data.main.pressure} hPa<br>
  🌊 Nivel del mar: ${data.main.sea_level} hPa<br>
  👀 Visibilidad: ${data.visibility / 1000} km<br>
  💨 Velocidad del viento: ${data.wind.speed} m/s<br>
  🧭 Dirección del viento: ${data.wind.deg}°<br>
  🌬️ Ráfagas: ${data.wind.gust ?? 'N/D'} m/s
  `;
};

// Effect Blur CSS
const cards = document.querySelectorAll('.info-weather');

cards.forEach(card => {
  card.addEventListener('mouseenter', () =>
    cards.forEach(c => c !== card && c.classList.add('blurred'))
  );

  card.addEventListener('mouseleave', () =>
    cards.forEach(c => c.classList.remove('blurred'))
  );
});

btn.addEventListener('click', () => {
  const input = document.getElementById('input-data').value.trim();

  if (!input) {
    alert(
      'Por favor, ingrese una ciudad válida.'
    );
  }

  btn.innerHTML = 'Cargando...';

  setTimeout(() => {
    getWeather(input);
    btn.innerHTML = 'Enviar';
  }, 1000);
});