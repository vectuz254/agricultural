// ============================================
// AGROSENSE — crops.js
// Renders the Land Allocation pie chart and the
// Health Score bar chart on the Crops page.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const FOREST = '#4B6B23';
  const SAGE = '#8FAE55';
  const AMBER = '#D9A356';
  const BLUE = '#6a9bc3';
  const TEXT_MUTED = '#8a8578';
  const BORDER = '#e6e1d3';

  // ── Pie chart: Land Allocation by Crop (acres) ──
  const pieEl = document.getElementById('cropPieChart');
  if (pieEl) {
    new Chart(pieEl, {
      type: 'pie',
      data: {
        labels: ['Maize (Field A)', 'Beans (Field B)', 'Tomatoes (Field C)', 'Fallow / Reserve'],
        datasets: [{
          data: [4.5, 2.2, 1.8, 1.0],
          backgroundColor: [FOREST, SAGE, AMBER, BORDER],
          borderColor: '#fff',
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#2b2a24', font: { family: 'Inter', size: 11 }, padding: 14 },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed} acres`,
            },
          },
        },
      },
    });
  }

  // ── Bar chart: Health Score by Field ──
  const barEl = document.getElementById('cropBarChart');
  if (barEl) {
    new Chart(barEl, {
      type: 'bar',
      data: {
        labels: ['Maize · Field A', 'Beans · Field B', 'Tomatoes · Field C'],
        datasets: [{
          label: 'Health score (/100)',
          data: [90, 68, 85],
          backgroundColor: [FOREST, AMBER, SAGE],
          borderRadius: 6,
          maxBarThickness: 60,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true, max: 100,
            grid: { color: BORDER },
            ticks: { color: TEXT_MUTED, font: { family: 'Inter' } },
          },
          x: {
            grid: { display: false },
            ticks: { color: TEXT_MUTED, font: { family: 'Inter' } },
          },
        },
      },
    });
  }
});
