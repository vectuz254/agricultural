// ============================================
// AGROSENSE — irrigation.js
// Renders the weekly water usage bar chart on the
// Irrigation page.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const FOREST = '#4B6B23';
  const SAGE = '#8FAE55';
  const AMBER = '#D9A356';
  const TEXT_MUTED = '#8a8578';
  const BORDER = '#e6e1d3';

  const el = document.getElementById('irrigationBarChart');
  if (!el) return;

  new Chart(el, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Field A', data: [180, 150, 190, 170, 160, 140, 150], backgroundColor: FOREST, borderRadius: 4 },
        { label: 'Field B', data: [90, 80, 100, 85, 95, 70, 80], backgroundColor: AMBER, borderRadius: 4 },
        { label: 'Field C', data: [40, 30, 45, 35, 30, 25, 30], backgroundColor: SAGE, borderRadius: 4 },
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
        x: { stacked: true, grid: { display: false }, ticks: { color: TEXT_MUTED, font: { family: 'Inter' } } },
        y: { stacked: true, grid: { color: BORDER }, ticks: { color: TEXT_MUTED, font: { family: 'Inter' } } },
      },
    },
  });
});
