//시계가 표시될 자리
const timeTitle = document.querySelector('#clockTitle')
const timeTarget = document.querySelector("#clockTime");
const dateTarget = document.querySelector("#clockDate");

function clock(){
  //현재시각 불러오기
  const nowDate = new Date();

  //시-분-초 선언
  const hh = nowDate.getHours();
  const mm = nowDate.getMinutes();
  const ss = nowDate.getSeconds();
  //시-분-초 표시
  timeTarget.innerText = `${hh < 10? `0${hh}`:hh}:${mm < 10? `0${mm}`:mm}:${ss < 10? `0${ss}`:ss}`;
  //시-분-초 표시 (탭 제목)
  timeTitle.innerText = `${hh < 10? `0${hh}`:hh}:${mm < 10? `0${mm}`:mm}:${ss < 10? `0${ss}`:ss}`;

  //연-월-일-요일 선언
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth();
  const date = nowDate.getDate();
  const week = nowDate.getDay();
  const weekName = ['일','월','화','수','목','금','토'];
  //연-월-일 표시
  dateTarget.innerText = `${year}년 ${month+1}월 ${date}일 (${weekName[week]})`;
}

//clock을 1초마다 새로고침
function initClock(){
  clock();
  setInterval(clock, 1000);
}

initClock();
