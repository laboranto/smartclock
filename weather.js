const weather = document.querySelector("#weather");
const API_KEY = "너의 API 코드";
import kpop from "cityname_to_ko/package.json";

// 현재 위치 확인. '에이전트_신원_정보.위치.현재위치_가져오기(성공,실패)'
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// 위치 조회에 성공했을 때 날씨 불러오기
function onGeoOk(position) {
  const ns = position.coords.latitude;
  const we = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lang=kr&lat=${ns}&lon=${we}&appid=${API_KEY}&units=metric`;
  // openweathermap에서 불러온 API 정보에서 const 선언
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const cityRomanized = data.name;
      const city = kpop.hangulify(cityRomanized);
      // const city = data.name;
      const currentWeather = data.weather[0].icon;
      const currentWeatherAlt = data.weather[0].description;
      const currentTemp = data.main.temp;
      const currentTempInt = currentTemp - (currentTemp % 1);
      weather.innerText = "";
      weather.insertAdjacentHTML(
        "afterbegin",
        `${city}, <img src="icons/weather/${currentWeather}.svg" alt="${currentWeatherAlt}"> ${currentTempInt}°C`
      );
    });
}

// 위치 조회를 실패했을 때 함수
function onGeoError() {
  weather.innerText = "";
  weather.insertAdjacentHTML(
    "afterbegin",
    `<span class="font-grey">날씨 정보를 불러오지 못했습니다</span>`
  );
}

//onGeoOk를 30분에 한 번 새로고침
function initWeather() {
  onGeoOk();
  setInterval(1800000);
}

initWeather();
