const DAILY_KARMA_KEY = 'daily_karma';
const LAST_RESET_KEY = 'karma_last_reset';
const MAX_DAILY_KARMA = 8;

// Reset karma if a new day has started
function maybeResetDailyKarma() {
  const lastReset = localStorage.getItem(LAST_RESET_KEY);
  const today = new Date().toDateString();

  if (lastReset !== today) {
    localStorage.setItem(DAILY_KARMA_KEY, MAX_DAILY_KARMA);
    localStorage.setItem(LAST_RESET_KEY, today);
  }
}

// Get current karma (after possible reset)
export const getKarma = () => {
  maybeResetDailyKarma();
  return parseFloat(localStorage.getItem(DAILY_KARMA_KEY)) || MAX_DAILY_KARMA;
};

// Update karma with delta (+/-), keeping within bounds
export const updateKarma = (change) => {
  maybeResetDailyKarma();

  const current = getKarma();
  let updated = current + change;

  if (change > 0) {
    // Cap daily gain at MAX_DAILY_KARMA
    updated = Math.min(updated, MAX_DAILY_KARMA);
  } else {
    // Never go below 0
    updated = Math.max(updated, 0);
  }

  localStorage.setItem(DAILY_KARMA_KEY, updated);
  return updated;
};

