// ============================================
// AGROSENSE — team.js (Supabase version)
// Powers the "Add Member" button and team list
// on team.html. Waits for dash-auth.js to confirm
// the signed-in user before loading anything.
// ============================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let ownerId = null;

function showMsg(text, type) {
  const el = document.getElementById('teamMsg');
  if (!el) return;
  el.textContent = text;
  el.className = 'auth-msg ' + type;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function roleBadge(role) {
  const labels = { owner: 'Owner', manager: 'Manager', viewer: 'Viewer' };
  return `<span class="role-badge role-${role}">${labels[role] || role}</span>`;
}

function statusBadge(status) {
  const cls = status === 'active' ? 'good' : 'warn';
  const label = status === 'active' ? 'Active' : 'Pending';
  return `<span class="sc-status ${cls}">${label}</span>`;
}

async function loadTeam() {
  const tbody = document.getElementById('teamTableBody');
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('owner_id', ownerId)
    .order('invited_at', { ascending: false });

  if (error) {
    console.error('Could not load team:', error.message);
    tbody.innerHTML = `<tr><td colspan="4" class="team-empty">Could not load team members.</td></tr>`;
    return;
  }

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="team-empty">No team members yet — click "Add Member" to invite someone.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map((m) => `
    <tr>
      <td>${m.email}</td>
      <td>${roleBadge(m.role)}</td>
      <td>${statusBadge(m.status)}</td>
      <td class="team-row-actions">
        <button class="team-remove-btn" data-id="${m.id}">Remove</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.team-remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => removeMember(btn.dataset.id));
  });
}

async function removeMember(id) {
  if (!confirm('Remove this team member? They will lose access immediately.')) return;
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) {
    showMsg('Could not remove member. Please try again.', 'error');
    return;
  }
  showMsg('Team member removed.', 'success');
  loadTeam();
}

// ── Modal controls ──────────────────────────────
window.openAddMemberModal = function () {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('memberEmail').value = '';
  document.getElementById('memberRole').value = 'manager';
};
window.closeAddMemberModal = function () {
  document.getElementById('modalOverlay').classList.remove('open');
};
window.closeAddMemberModalOutside = function (e) {
  if (e.target.id === 'modalOverlay') window.closeAddMemberModal();
};

// ── Send invite ──────────────────────────────────
window.sendInvite = async function () {
  const email = document.getElementById('memberEmail').value.trim();
  const role = document.getElementById('memberRole').value;

  if (!email) {
    showMsg('Please enter an email address.', 'error');
    return;
  }

  const btn = document.getElementById('sendInviteBtn');
  btn.disabled = true;

  const { error } = await supabase.from('team_members').insert({
    owner_id: ownerId,
    email,
    role,
    status: 'pending',
  });

  btn.disabled = false;

  if (error) {
    if (error.code === '23505') {
      showMsg('That email has already been invited.', 'error');
    } else {
      console.error(error);
      showMsg('Could not send invite. Please try again.', 'error');
    }
    return;
  }

  showMsg('Invite added — they will get access once they sign up with this email.', 'success');
  window.closeAddMemberModal();
  loadTeam();
};

// dash-auth.js dispatches this once it has confirmed the signed-in user
window.addEventListener('authReady', (e) => {
  ownerId = e.detail.uid;
  loadTeam();
});
