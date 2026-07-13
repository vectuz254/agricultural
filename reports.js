// ============================================
// AGROSENSE — reports.js
// Renders the Water Usage pie chart and the
// Monthly Yield bar chart on the Reports page.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const FOREST = '#4B6B23';
  const SAGE = '#8FAE55';
  const AMBER = '#D9A356';
  const BLUE = '#6a9bc3';
  const TEXT_MUTED = '#8a8578';
  const BORDER = '#e6e1d3';

  // ── Pie chart: Water Usage by Field (Liters, this week) ──
  const pieEl = document.getElementById('waterPieChart');
  if (pieEl) {
    new Chart(pieEl, {
      type: 'pie',
      data: {
        labels: ['Field A · Maize', 'Field B · Beans', 'Field C · Tomatoes'],
        datasets: [{
          data: [480, 410, 350],
          backgroundColor: [FOREST, AMBER, SAGE],
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
              label: (ctx) => `${ctx.label}: ${ctx.parsed} L`,
            },
          },
        },
      },
    });
  }

  // ── Bar chart: Monthly yield by crop (kg) ──
  const barEl = document.getElementById('yieldBarChart');
  if (barEl) {
    new Chart(barEl, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { label: 'Maize', data: [2000, 2000, 2400, 2200, 2600, 2500], backgroundColor: FOREST, borderRadius: 4 },
          { label: 'Tomatoes', data: [900, 700, 1200, 1000, 1500, 1300], backgroundColor: SAGE, borderRadius: 4 },
          { label: 'Beans', data: [500, 400, 600, 500, 700, 600], backgroundColor: AMBER, borderRadius: 4 },
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
  }
});
