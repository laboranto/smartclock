const weather = document.querySelector("#weather");

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function wmoToIcon(code, isDay) {
  const s = isDay ? 'd' : 'n';
  if (code === 0)  return `01${s}`;
  if (code <= 2)   return `02${s}`;
  if (code === 3)  return `04${s}`;
  if (code <= 48)  return `50${s}`;
  if (code <= 55)  return `09${s}`;
  if (code <= 67)  return `10${s}`;
  if (code <= 77)  return `13${s}`;
  if (code <= 82)  return `09${s}`;
  if (code <= 86)  return `13${s}`;
  return `11${s}`;
}

function wmoDesc(code) {
  if (code === 0)  return '맑음';
  if (code <= 2)   return '구름 조금';
  if (code === 3)  return '흐림';
  if (code <= 48)  return '안개';
  if (code <= 55)  return '이슬비';
  if (code <= 67)  return '비';
  if (code <= 77)  return '눈';
  if (code <= 82)  return '소나기';
  if (code <= 86)  return '눈 소나기';
  return '뇌우';
}

async function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  try {
    const [weatherRes, geoRes] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`),
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
        headers: { 'Accept-Language': 'ko' }
      })
    ]);

    const wData = await weatherRes.json();
    const gData = await geoRes.json();

    const cur  = wData.current;
    const temp = Math.floor(cur.temperature_2m);
    const icon = wmoToIcon(cur.weather_code, cur.is_day);
    const desc = wmoDesc(cur.weather_code);
    const city = gData.address?.city || gData.address?.town ||
                 gData.address?.village || gData.address?.county || '';

    weather.innerHTML =
      `${city}, <img src="icons/weather/${icon}.svg" alt="${desc}"> ${temp}°C`;
  } catch {
    onGeoError();
  }
}

async function onGeoError() {
  try {
    const res  = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    await onGeoOk({ coords: { latitude: data.latitude, longitude: data.longitude } });
  } catch {
    weather.innerHTML = `<span class="font-grey">날씨 정보를 불러오지 못했습니다</span>`;
  }
}

setInterval(
  () => navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError),
  1800000
);
