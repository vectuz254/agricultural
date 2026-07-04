// ============================================
// AGROSENSE — profile.js (Supabase version)
// Waits for dash-auth.js to confirm the signed-in
// user, then loads/saves their profile row.
// ============================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function showMsg(text, type) {
  const el = document.getElementById('profileMsg');
  if (!el) return;
  el.textContent = text;
  el.className = 'auth-msg ' + type;
  el.style.display = 'block';
}

function fillForm(profile, email) {
  document.getElementById('pfName').value = profile?.name || '';
  document.getElementById('pfEmail').value = email || '';
  document.getElementById('pfFarmName').value = profile?.farm_name || '';
  document.getElementById('pfLocation').value = profile?.location || '';
  document.getElementById('pfPhone').value = profile?.phone || '';
}

// dash-auth.js dispatches this once it has confirmed the user + fetched the profile
window.addEventListener('authReady', (e) => {
  fillForm(e.detail.profile, e.detail.email);
});

window.saveProfile = async function () {
  const uid = window.currentUserId;
  if (!uid) return;

  const btn = document.getElementById('saveBtn');
  btn.disabled = true;

  const { error } = await supabase
    .from('profiles')
    .update({
      name: document.getElementById('pfName').value.trim(),
      farm_name: document.getElementById('pfFarmName').value.trim(),
      location: document.getElementById('pfLocation').value.trim(),
      phone: document.getElementById('pfPhone').value.trim(),
    })
    .eq('id', uid);

  if (error) {
    console.error(error);
    showMsg('Could not save changes. Please try again.', 'error');
    btn.disabled = false;
    return;
  }

  showMsg('Profile updated successfully.', 'success');

  const nameEl = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');
  const newName = document.getElementById('pfName').value.trim();
  if (nameEl) nameEl.textContent = newName;
  if (avatarEl) avatarEl.textContent = newName.charAt(0).toUpperCase();

  btn.disabled = false;
};
