// ============================================
// AGROSENSE — home-modals.js
// Powers the clickable feature cards on index.html.
// Each card calls openFeatureModal('key') and the
// matching entry below fills in the modal content.
// ============================================

const FEATURE_DATA = {
  soil: {
    icon: '🌱',
    title: 'Soil Intelligence',
    desc: 'Precision sensors buried across each field track moisture, pH and nutrient levels continuously, alerting you the moment a reading drifts out of range — long before it shows up in the crop.',
    stats: [
      { value: '65%', label: 'Soil Moisture' },
      { value: '6.8', label: 'Soil pH' },
      { value: 'Moderate', label: 'Nitrogen Level' },
      { value: '24°C', label: 'Soil Temp' },
    ],
  },
  weather: {
    icon: '🌤',
    title: 'Weather Integration',
    desc: 'Hyper-local forecasts are merged with your live field data, so irrigation and harvest plans are based on what your farm will actually experience — not a city-wide average.',
    stats: [
      { value: '29°C', label: 'Today' },
      { value: '70%', label: 'Humidity' },
      { value: '20%', label: 'Rain Chance' },
      { value: 'Fri', label: 'Next Rain' },
    ],
  },
  irrigation: {
    icon: '💦',
    title: 'Smart Irrigation',
    desc: 'Scheduling runs automatically off real soil readings instead of a fixed timer, cutting water waste while keeping every field in its optimal moisture range.',
    stats: [
      { value: '38%', label: 'Water Saved' },
      { value: '1,240 L', label: 'This Week' },
      { value: '1', label: 'Zone Active Now' },
      { value: '6PM', label: 'Next Cycle' },
    ],
  },
  analytics: {
    icon: '📊',
    title: 'Crop Analytics',
    desc: 'Every field gets a live health score built from growth stage, sensor trends and visual condition, so you can compare fields at a glance and catch problems early.',
    stats: [
      { value: '81/100', label: 'Avg. Farm Health' },
      { value: '+4', label: 'Score This Month' },
      { value: '3', label: 'Fields Tracked' },
      { value: '2', label: 'Crops Ready Soon' },
    ],
  },
  livestock: {
    icon: '🐄',
    title: 'Livestock Overview',
    desc: 'Herd headcount, grazing zone and a rolling health score sit alongside your crop data, giving you one dashboard for the whole farm instead of a separate app.',
    stats: [
      { value: '24', label: 'Cattle on Pasture' },
      { value: '92%', label: 'Herd Health' },
      { value: 'Zone B', label: 'Current Grazing' },
      { value: '0', label: 'Health Alerts' },
    ],
  },
  pest: {
    icon: '🐛',
    title: 'Pest & Disease Watch',
    desc: 'Sensor and visual trends are screened for the early signs of pest pressure and nutrient deficiency, so you can act while treatment is still cheap and easy.',
    stats: [
      { value: '3', label: 'Active Alerts' },
      { value: '14', label: 'Resolved This Month' },
      { value: 'Low', label: 'Current Risk' },
      { value: 'Field B', label: 'Watching Closest' },
    ],
  },
  yield: {
    icon: '📈',
    title: 'Yield Forecasting',
    desc: 'Growth data is compared against past seasons to project your harvest weeks in advance, helping you plan labor, storage and buyers ahead of time.',
    stats: [
      { value: '+12%', label: 'Vs Last Season' },
      { value: '2,500 kg', label: 'Maize Forecast' },
      { value: '1,300 kg', label: 'Tomato Forecast' },
      { value: 'Aug 20', label: 'Next Harvest' },
    ],
  },
  team: {
    icon: '👥',
    title: 'Team Collaboration',
    desc: 'Invite farm managers and field workers with role-based access — owners see everything, managers handle day-to-day, and viewers get read-only reports.',
    stats: [
      { value: '4', label: 'Team Members' },
      { value: '1', label: 'Owner' },
      { value: '2', label: 'Managers' },
      { value: '1', label: 'Viewer' },
    ],
  },
};

function openFeatureModal(key) {
  const data = FEATURE_DATA[key];
  const overlay = document.getElementById('featureModalOverlay');
  if (!data || !overlay) return;

  document.getElementById('modalIcon').textContent = data.icon;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent = data.desc;

  const statsEl = document.getElementById('modalStats');
  statsEl.innerHTML = '';
  data.stats.forEach((s) => {
    const card = document.createElement('div');
    card.className = 'modal-stat';
    const strong = document.createElement('strong');
    strong.textContent = s.value;
    const span = document.createElement('span');
    span.textContent = s.label;
    card.appendChild(strong);
    card.appendChild(span);
    statsEl.appendChild(card);
  });

  overlay.style.display = 'flex';
  // Force a reflow so the transition actually plays after display:flex is set
  void overlay.offsetWidth;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFeatureModal() {
  const overlay = document.getElementById('featureModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 250);
}

window.openFeatureModal = openFeatureModal;
window.closeFeatureModal = closeFeatureModal;

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('featureModalOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeFeatureModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFeatureModal();
  });
});
