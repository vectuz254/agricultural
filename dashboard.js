// ============================================
// AGROSENSE — dashboard.js
// Renders the Weekly Sensor Trends line chart and
// wires up the Week/Month tabs + Live refresh chip.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const FOREST = '#4B6B23';
  const BLUE = '#6a9bc3';
  const TEXT_MUTED = '#8a8578';
  const BORDER = '#e6e1d3';

  const pageDateEl = document.getElementById('pageDate');
  if (pageDateEl) {
    pageDateEl.textContent = new Date().toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  const datasets = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      moisture: [60, 62, 63, 65, 64, 66, 65],
      temperature: [26, 27, 28, 29, 28, 30, 29],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      moisture: [58, 61, 64, 65],
      temperature: [27, 28, 29, 28],
    },
  };

  const canvas = document.getElementById('sensorChart');
  let chart;

  function render(range) {
    const d = datasets[range];
    if (chart) {
      chart.data.labels = d.labels;
      chart.data.datasets[0].data = d.moisture;
      chart.data.datasets[1].data = d.temperature;
      chart.update();
      return;
    }
    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          {
            label: 'Soil Moisture (%)',
            data: d.moisture,
            borderColor: FOREST,
            backgroundColor: 'rgba(75,107,35,0.08)',
            tension: 0.35,
            fill: true,
            pointRadius: 3,
          },
          {
            label: 'Temperature (°C)',
            data: d.temperature,
            borderColor: BLUE,
            backgroundColor: 'rgba(106,155,195,0.08)',
            borderDash: [5, 4],
            tension: 0.35,
            fill: false,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#2b2a24', font: { family: 'Inter', size: 11 }, padding: 14 },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: TEXT_MUTED, font: { family: 'Inter' } } },
          y: { grid: { color: BORDER }, ticks: { color: TEXT_MUTED, font: { family: 'Inter' } } },
        },
      },
    });
  }

  if (canvas) render('week');

  // Week / Month tab switching — called from the onclick="setChart(...)" in dashboard.html
  window.setChart = function (range, btnEl) {
    document.querySelectorAll('.ct').forEach((b) => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    render(range);
  };

  // "Live" refresh chip — called from onclick="refreshData()" in dashboard.html
  window.refreshData = function () {
    const chip = document.querySelector('.refresh-chip');
    if (!chip) return;
    const label = chip.querySelector('span:last-child') || chip;
    const original = label.textContent;
    label.textContent = 'Updating…';

    setTimeout(() => {
      // Nudge each sensor card value slightly to simulate a live refresh
      const moisture = document.getElementById('moistureVal');
      const moistureBar = document.getElementById('moistureBar');
      const temp = document.getElementById('tempVal');
      const tempBar = document.getElementById('tempBar');
      const humid = document.getElementById('humidVal');
      const humidBar = document.getElementById('humidBar');

      if (moisture) {
        const v = 63 + Math.round(Math.random() * 5);
        moisture.textContent = v + '%';
        if (moistureBar) moistureBar.style.width = v + '%';
      }
      if (temp) {
        const v = 27 + Math.round(Math.random() * 3);
        temp.textContent = v + '°C';
        if (tempBar) tempBar.style.width = Math.min(100, v * 2) + '%';
      }
      if (humid) {
        const v = 66 + Math.round(Math.random() * 6);
        humid.textContent = v + '%';
        if (humidBar) humidBar.style.width = v + '%';
      }

      label.textContent = original;
    }, 700);
  };
});

