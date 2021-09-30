const watchClock = () => {
  function leftPad(number) {
    if (number < 10) {
      return `0${number}`;
     }
     /*else*/return `${number}`;
    };

function setText(selector, text) {
  const targetElement = document.querySelector(selector);
  if (!targetElement) {
    return;
   }
   targetElement.innerText = text;
 };
 function getDayText(index) {
   const days = ['일', '월', '화', '수', '목', '금', '토'];
   return days[index];
  };
  const present = new Date();
  const hh = leftPad(present.getHours());
  const mm = leftPad(present.getMinutes());
  const ss = leftPad(present.getSeconds());
  setText('#hh', hh);
  setText('#mm', mm);
  setText('#ss', ss);
  const year = present.getFullYear();
  const month = leftPad(present.getMonth() + 1);
  const date = leftPad(present.getDate());
  const week = getDayText(present.getDay());
  setText('#year', year);
  setText('#month', month);
  setText('#date', date);
  setText('#week', week);
 
};
  watchClock();

  const clockInterval = setInterval(watchClock, 1000);


//이 밑에는 연습장임
