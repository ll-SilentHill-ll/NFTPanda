function countdown(element, targetTime) {
  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      element.innerHTML = "Время истекло";
      return;
    }

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

    element.innerHTML = `${daysLeft} : ${hoursLeft} : ${minutesLeft} : ${secondsLeft};
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Получаем все элементы с классом sale_timer
const timerElements = document.querySelectorAll('.timer_element');

// Устанавливаем обратный отсчет для каждого элемента
timerElements.forEach(element => {
  const targetTimeString = element.getAttribute('data-target-time');
  const targetTime = new Date(targetTimeString).getTime();
  countdown(element, targetTime);
});
