// ============================================
// AGROSENSE — profile.js
// Waits for dash-auth.js to confirm the signed-in
// user, then loads/saves their Firestore profile.
// ============================================
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Reuse the app instance dash-auth.js already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
  document.getElementById('pfFarmName').value = profile?.farmName || '';
  document.getElementById('pfLocation').value = profile?.location || '';
  document.getElementById('pfPhone').value = profile?.phone || '';
}

// dash-auth.js dispatches this once it has confirmed the user + fetched the profile
window.addEventListener('authReady', (e) => {
  fillForm(e.detail.profile, auth.currentUser?.email);
});

window.saveProfile = async function () {
  const uid = window.currentUserUid;
  if (!uid) return;

  const btn = document.getElementById('saveBtn');
  btn.disabled = true;

  try {
    await updateDoc(doc(db, 'users', uid), {
      name: document.getElementById('pfName').value.trim(),
      farmName: document.getElementById('pfFarmName').value.trim(),
      location: document.getElementById('pfLocation').value.trim(),
      phone: document.getElementById('pfPhone').value.trim(),
    });
    showMsg('Profile updated successfully.', 'success');

    const nameEl = document.getElementById('userName');
    const avatarEl = document.getElementById('userAvatar');
    const newName = document.getElementById('pfName').value.trim();
    if (nameEl) nameEl.textContent = newName;
    if (avatarEl) avatarEl.textContent = newName.charAt(0).toUpperCase();
  } catch (err) {
    console.error(err);
    showMsg('Could not save changes. Please try again.', 'error');
  } finally {
    btn.disabled = false;
  }
};
