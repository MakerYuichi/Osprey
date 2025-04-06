let karma = 8;
let dailyKarmaAdd = 0;

let onKarmaChange = null; // 🧠 This will point to setKarma from React

export const getKarma = () => karma;

export const subscribeToKarma = (callback) => {
  onKarmaChange = callback;
};

export const updateKarma = (change) => {
  if (change > 0 && dailyKarmaAdd >= 1.5) return;

  karma = Math.max(0, Math.min(8, karma + change));

  if (change > 0) dailyKarmaAdd += change;

  console.log('🔁 Karma updated to:', karma);

  // 🧠 Call the subscribed state updater
  if (onKarmaChange) onKarmaChange(karma);
};

