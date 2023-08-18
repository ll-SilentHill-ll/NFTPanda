var ctx = document.getElementById('priceChart').getContext('2d');

// Пример данных для графика (здесь представлены случайные значения)
var data = {
  labels: ['15/9', '16/9', '17/9', '18/9', '19/9', '20/9', '21/9', '22/9', '23/9', '24/9', '25/9', '26/9', '27/9', '28/9', '29/9', '30/9'],
  datasets: [{
    label: 'All Time Avg. Price',
    backgroundColor: 'rgba(52, 102, 226, 0.2)', // Белый цвет заливки графика (прозрачный)
    borderColor: 'rgba(52, 102, 226, 1)', // Белый цвет границы графика
    borderWidth: 2, // Увеличиваем толщину линии
    pointRadius: 0, // Убрать точки
    data: [0.7, 1, 0.7, 1.7, 1, 1.3, 0.7, 1.7, 1, 1.3, 1, 1.3, 0.7, 1, 1.3, 1], // Ваши данные изменения цены
    tension: 0.4, // Задайте желаемое значение натяжения (от 0 до 1)
    
  }]
};

var priceChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false, // Отключение сохранения пропорций
    width: 1200, // Задание ширины графика
    height: 408, // Задание высоты графика
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      }
    }
  }
});
