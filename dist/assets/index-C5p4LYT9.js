(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function d(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(n){if(n.ep)return;n.ep=!0;const t=d(n);fetch(n.href,t)}})();const u="31b55a5371f6b9401a9c81b86b3e8fce",o=document.getElementById("btn"),s=document.getElementById("infoWeather"),l=document.getElementById("weather-info"),m=document.getElementById("infoWeather1"),f=document.getElementById("infoWeather2"),p=e=>{fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&lang=es&appid=${u}`).then(r=>r.json()).then(r=>{if(r.cod!==200){s.innerHTML='Información <span style="color: darkred;">NO</span> encontrada.',l.style.display="none";return}s.innerHTML="Información encontrada exitosamente.",h(r)}).catch(r=>{console.error(r),s.innerHTML="Ocurrió un error al consultar la información."})},h=e=>{l.style.display="flex",m.innerHTML=`
  📍 Ciudad: ${e.name}, ${e.sys.country}<br>
  🌡️ Temperatura: ${(e.main.temp-273.15).toFixed(1)} °C<br>
  🥵 Sensación térmica: ${(e.main.feels_like-273.15).toFixed(1)} °C<br>
  🌦️ Clima: ${e.weather[0].description}<br>
  ☁️ Nubosidad: ${e.clouds.all}%
  `,f.innerHTML=`
  💧 Humedad: ${e.main.humidity}%<br>
  ⏱️ Presión: ${e.main.pressure} hPa<br>
  🌊 Nivel del mar: ${e.main.sea_level} hPa<br>
  👀 Visibilidad: ${e.visibility/1e3} km<br>
  💨 Velocidad del viento: ${e.wind.speed} m/s<br>
  🧭 Dirección del viento: ${e.wind.deg}°<br>
  🌬️ Ráfagas: ${e.wind.gust??"N/D"} m/s
  `},c=document.querySelectorAll(".info-weather");c.forEach(e=>{e.addEventListener("mouseenter",()=>c.forEach(r=>r!==e&&r.classList.add("blurred"))),e.addEventListener("mouseleave",()=>c.forEach(r=>r.classList.remove("blurred")))});o.addEventListener("click",()=>{const e=document.getElementById("input-data").value.trim();e||alert("Por favor, ingrese una ciudad válida."),o.innerHTML="Cargando...",setTimeout(()=>{p(e),o.innerHTML="Enviar"},1e3)});
