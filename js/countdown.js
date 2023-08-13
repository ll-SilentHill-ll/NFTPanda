function countdown(element, targetTime) {
  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      element.innerHTML = "Время истекло";
      return;
    }

    const minutesLeft = Math.floor(timeDifference / (60 * 1000));
    const secondsLeft = Math.floor((timeDifference % (60 * 1000)) / 1000);

    element.innerHTML = `${minutesLeft}:${secondsLeft}`;
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
