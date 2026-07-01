// ============================================
// AGROSENSE — auth.js (Firebase Auth + Firestore)
// Used on login.html and register.html
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMsg(text, type) {
  const el = document.getElementById('authMsg');
  if (!el) return;
  el.textContent = text;
  el.className = 'auth-msg ' + type;
  el.style.display = 'block';
}

function setLoading(isLoading) {
  const btn = document.querySelector('.btn-submit');
  if (!btn) return;
  btn.disabled = isLoading;
  btn.style.opacity = isLoading ? 0.6 : 1;
}

// ── Registration ──────────────────────────────
window.handleRegister = async function () {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
    showMsg('Please fill in all fields.', 'error');
    return;
  }
  if (password.length < 6) {
    showMsg('Password must be at least 6 characters.', 'error');
    return;
  }

  setLoading(true);
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Create the customer profile document
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      farmName: '',
      location: '',
      phone: '',
      role: 'client',
      createdAt: serverTimestamp()
    });

    showMsg('Account created! Redirecting…', 'success');
    setTimeout(() => (window.location.href = 'dashboard.html'), 900);
  } catch (err) {
    setLoading(false);
    showMsg(friendlyError(err.code), 'error');
  }
};

// ── Login ──────────────────────────────────────
window.handleLogin = async function () {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showMsg('Please enter your email and password.', 'error');
    return;
  }

  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'dashboard.html';
  } catch (err) {
    setLoading(false);
    showMsg(friendlyError(err.code), 'error');
  }
};

function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'That email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password is too weak (minimum 6 characters).',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.'
  };
  return map[code] || 'Something went wrong. Please try again.';
}

