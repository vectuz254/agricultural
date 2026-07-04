// ============================================
// AGROSENSE — dash-auth.js (Supabase version)
// Protects dashboard.html / profile.html: redirects to
// login.html if no one is signed in, and loads the
// customer profile from the profiles table.
// ============================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
};

async function init() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = 'login.html';
    return;
  }

  // Auth confirmed — safe to reveal the page now
  document.body.style.visibility = 'visible';

  const user = session.user;
  let name = user.user_metadata?.name || 'Farmer';
  let profile = null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Could not load profile:', error.message);
  } else if (data) {
    profile = data;
    name = data.name || name;
  }

  const nameEl = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();

  // Make the profile + id available to other scripts on the page
  window.currentUserId = user.id;
  window.currentUserProfile = profile;
  window.dispatchEvent(new CustomEvent('authReady', {
    detail: { uid: user.id, profile, email: user.email }
  }));
}

init();
