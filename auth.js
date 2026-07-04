// ============================================
// AGROSENSE — auth.js (Supabase Auth + Postgres)
// Used on login.html and register.html
// ============================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });

  if (error) {
    setLoading(false);
    showMsg(friendlyError(error.message), 'error');
    return;
  }

  // Create the matching profile row (id must match the auth user's id)
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      email,
      farm_name: '',
      location: '',
      phone: ''
    });
    if (profileError) console.error('Profile creation failed:', profileError.message);
  }

  // If "Confirm email" is ON in Supabase, there's no session yet — send to login instead
  if (!data.session) {
    showMsg('Account created! Please check your email to confirm, then sign in.', 'success');
    setLoading(false);
    return;
  }

  showMsg('Account created! Redirecting…', 'success');
  setTimeout(() => (window.location.href = 'dashboard.html'), 900);
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

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    setLoading(false);
    showMsg(friendlyError(error.message), 'error');
    return;
  }

  window.location.href = 'dashboard.html';
};

function friendlyError(message) {
  const map = {
    'User already registered': 'That email is already registered.',
    'Invalid login credentials': 'Incorrect email or password.',
    'Email not confirmed': 'Please confirm your email before signing in.',
    'Password should be at least 6 characters.': 'Password must be at least 6 characters.'
  };
  return map[message] || message || 'Something went wrong. Please try again.';
}
