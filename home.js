// ============================================
// AGROSENSE — home.js
// Powers the clickable "Everything your farm
// needs" cards on index.html — each opens a
// modal with a fuller explanation.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const FEATURES = {
    soil: {
      icon: '🌱',
      title: 'Soil Intelligence',
      body: 'Precision sensors placed across your fields track moisture, pH, and nutrient levels continuously — not just once a day. AgroSense flags problems while they are still small, so a dry patch or a nutrient dip gets caught before it affects yield.',
      bullets: [
        'Live moisture % per field, updated continuously',
        'pH and nutrient trend alerts',
        'Early warning before visible crop stress',
      ],
    },
    weather: {
      icon: '🌤',
      title: 'Weather Integration',
      body: 'Hyper-local forecasts are merged directly with your own field readings — not generic city-wide weather. This lets you plan irrigation, spraying, and harvest timing around what is actually happening on your land.',
      bullets: [
        '5-day temperature and rainfall outlook',
        'Forecasts matched to your exact field location',
        'Plan harvest and spraying around real conditions',
      ],
    },
    irrigation: {
      icon: '💦',
      image: 'https://images.pexels.com/photos/33881124/pexels-photo-33881124.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&dpr=1',
      imageAlt: 'Sprinkler irrigating a farm field',
      title: 'Smart Irrigation',
      body: 'Instead of watering on a fixed schedule, AgroSense schedules irrigation based on real soil moisture readings from each field. Farmers using this approach typically cut water usage by up to 40% without hurting yield.',
      bullets: [
        'Per-field schedules based on real soil data',
        'Up to 40% reduction in water usage',
        'Manual override any time from the Irrigation page',
      ],
    },
    crops: {
      icon: '📊',
      image: 'https://images.pexels.com/photos/14170532/pexels-photo-14170532.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&dpr=1',
      imageAlt: 'Farmers harvesting a bumper corn crop',
      title: 'Crop Analytics',
      body: 'Every field gets a health score, a growth-stage timeline, and a yield forecast — all in one view. Spot which field is under-performing before harvest, not after.',
      bullets: [
        'Health score (0–100) per field',
        'Growth-stage timeline: planted → flowering → harvest',
        'Yield forecast vs. last season',
      ],
    },
    livestock: {
      icon: '🐄',
      image: 'https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&dpr=1',
      imageAlt: 'Cows grazing on pasture',
      title: 'Livestock Monitoring',
      body: 'For mixed farms, AgroSense tracks your herd alongside your crops — herd size, current grazing zone, and an overall health score, right next to your soil and weather data.',
      bullets: [
        'Herd size and health score',
        'Current grazing zone tracking',
        'One dashboard for crops and livestock together',
      ],
    },
    fields: {
      icon: '🗺️',
      image: 'https://images.pexels.com/photos/101977/pexels-photo-101977.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&dpr=1',
      imageAlt: 'Maize plantation field',
      title: 'Multi-Field Management',
      body: 'Whether you manage 2 fields or 20, AgroSense gives you one place to compare them side by side — land allocation, health scores, and irrigation status for every field at a glance.',
      bullets: [
        'Compare all fields side by side',
        'Land allocation by crop, visualized',
        'Spot the under-performing field fast',
      ],
    },
    team: {
      icon: '👥',
      title: 'Team Collaboration',
      body: 'Invite the people who help run your farm — a manager, a field worker, an accountant — and give each one the right level of access. Owners get full control, Managers can update farm data, and Viewers get read-only access.',
      bullets: [
        'Owner — full control, billing, and team management',
        'Manager — can view and update sensors, irrigation, and crops',
        'Viewer — read-only access to the dashboard and reports',
      ],
    },
    reports: {
      icon: '📄',
      title: 'Automated Reports',
      body: 'Weekly and monthly summaries are generated automatically — water saved, average crop health, and yield forecasts — so you always have an up-to-date picture without pulling numbers together by hand.',
      bullets: [
        'Weekly report every Monday morning',
        'Monthly yield and water-usage summary',
        'Everything visible from the Reports page',
      ],
    },
  };

  const overlay = document.getElementById('featureModalOverlay');
  const iconEl = document.getElementById('featureModalIcon');
  const titleEl = document.getElementById('featureModalTitle');
  const bodyEl = document.getElementById('featureModalBody');
  const listEl = document.getElementById('featureModalList');
  const photoWrap = document.getElementById('featureModalPhoto');
  const photoImg = document.getElementById('featureModalImg');

  function openFeature(key) {
    const f = FEATURES[key];
    if (!f) return;

    iconEl.textContent = f.icon || '';
    titleEl.textContent = f.title || '';
    bodyEl.textContent = f.body || '';
    listEl.innerHTML = (f.bullets || []).map((b) => `<li>${b}</li>`).join('');

    if (f.image) {
      photoImg.src = f.image;
      photoImg.alt = f.imageAlt || '';
      photoWrap.style.display = 'block';
    } else {
      photoWrap.style.display = 'none';
    }

    overlay.classList.add('open');
  }

  window.closeFeatureModal = function () {
    overlay.classList.remove('open');
  };
  window.closeFeatureModalOutside = function (e) {
    if (e.target.id === 'featureModalOverlay') window.closeFeatureModal();
  };

  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('click', () => openFeature(card.dataset.feature));
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openFeature(card.dataset.feature);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeFeatureModal();
  });
});
