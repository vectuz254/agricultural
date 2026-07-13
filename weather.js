// ============================================
// AGROSENSE — weather.js
// Renders the 5-day temperature histogram on the
// Weather page.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const FOREST = '#4B6B23';
  const AMBER = '#D9A356';
  const TEXT_MUTED = '#8a8578';
  const BORDER = '#e6e1d3';

  const el = document.getElementById('weatherBarChart');
  if (!el) return;

  const highs = [29, 27, 24, 23, 26];
  const lows = [18, 17, 16, 15, 17];

  new Chart(el, {
    type: 'bar',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: 'High °C',
          data: highs,
          backgroundColor: highs.map((t) => (t >= 26 ? AMBER : FOREST)),
          borderRadius: 5,
        },
        {
          label: 'Low °C',
          data: lows,
          backgroundColor: 'rgba(75,107,35,0.35)',
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
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
});
