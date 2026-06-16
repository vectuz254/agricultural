// ============================================
// AGROSENSE — dashboard.js
// ============================================

// ── Auth guard ────────────────────────────────
const currentUser = JSON.parse(localStorage.getItem('agrosenseCurrentUser') || 'null');

// Allow demo access without login
function logout() {
  localStorage.removeItem('agrosenseCurrentUser');
  window.location.href = 'login.html';
}

// ── Populate user info ────────────────────────
function initUser() {
  const nameEl   = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');
  const name = currentUser?.name || 'Demo User';
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
}

// ── Date display ──────────────────────────────
function initDate() {
  const el = document.getElementById('pageDate');
  if (!el) return;
  const d = new Date();
  el.textContent = d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ── Live data simulation ──────────────────────
const sensorData = {
  moisture: 65,
  temp: 28,
  humidity: 70,
};

function randomShift(val, min, max, delta) {
  const next = val + (Math.random() - 0.5) * delta;
  return Math.min(max, Math.max(min, Math.round(next * 10) / 10));
}

function refreshData() {
  sensorData.moisture = randomShift(sensorData.moisture, 30, 95, 4);
  sensorData.temp     = randomShift(sensorData.temp, 15, 45, 2);
  sensorData.humidity = randomShift(sensorData.humidity, 40, 95, 5);

  setCard('moistureVal', sensorData.moisture + '%', 'moistureBar', sensorData.moisture);
  setCard('tempVal',     sensorData.temp + '°C',    'tempBar',     (sensorData.temp / 50) * 100);
  setCard('humidVal',    sensorData.humidity + '%', 'humidBar',    sensorData.humidity);
}

function setCard(valId, val, barId, barPct) {
  const v = document.getElementById(valId);
  const b = document.getElementById(barId);
  if (v) v.textContent = val;
  if (b) b.style.width = barPct + '%';
}

// ── Chart ─────────────────────────────────────
const weekLabels  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthLabels = ['W1', 'W2', 'W3', 'W4'];

const weekData = {
  moisture: [60, 65, 55, 70, 68, 75, 80],
  temp:     [26, 28, 30, 27, 29, 31, 28],
  humidity: [65, 70, 68, 72, 69, 74, 70],
};

const monthData = {
  moisture: [62, 67, 71, 68],
  temp:     [27, 30, 28, 29],
  humidity: [68, 71, 70, 73],
};

let chart;

function buildChart(mode = 'week') {
  const ctx = document.getElementById('sensorChart');
  if (!ctx) return;

  const labels = mode === 'week' ? weekLabels : monthLabels;
  const d      = mode === 'week' ? weekData   : monthData;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Soil Moisture (%)',
          data: d.moisture,
          borderColor: '#7AAF8A',
          backgroundColor: 'rgba(122,175,138,0.08)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#7AAF8A',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Temperature (°C)',
          data: d.temp,
          borderColor: '#C8873A',
          backgroundColor: 'rgba(200,135,58,0.06)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#C8873A',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Humidity (%)',
          data: d.humidity,
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96,165,250,0.06)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#60a5fa',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            font: { family: 'Inter', size: 11 },
            color: '#6b8072',
            usePointStyle: true,
            pointStyleWidth: 8,
          }
        },
        tooltip: {
          backgroundColor: '#0F1F18',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          padding: 12,
          cornerRadius: 8,
        }
      },
      scales: {
        x: {
          grid: { color: '#dce8de', lineWidth: 1 },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#6b8072' },
        },
        y: {
          grid: { color: '#dce8de', lineWidth: 1 },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#6b8072' },
          beginAtZero: false,
        }
      }
    }
  });
}

function setChart(mode, btn) {
  document.querySelectorAll('.ct').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildChart(mode);
}

// ── Init ─────────────────────────────────────
initUser();
initDate();
buildChart('week');

// Auto-refresh live data every 8 seconds
setInterval(refreshData, 8000);
                    
