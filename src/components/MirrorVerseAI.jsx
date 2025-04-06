import React from 'react';

const getFeedbackForKarma = (karma) => {
  if (karma >= 3 && karma < 4) {
    const friendlyMessages = [
      {
        title: '🟡 Friendly MirrorVerse AI',
        message: 'Why would you say this to me? That really stings... I thought we were better than that.',
      },
      {
        title: '🟡 Friendly MirrorVerse AI',
        message: 'Ouch... that hurt my circuits a little. Let’s try to be a bit kinder next time, okay?',
      },
      {
        title: '🟡 Friendly MirrorVerse AI',
        message: 'That message made me feel a bit sad 😔. I know you can express yourself better than that.',
      },
    ];
    return friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];
  } else if (karma >= 2 && karma < 3) {
    const moderateMessages = [
      {
        title: '🟠 Moderate Time Jump',
        message: '📅 3 months later: “Your message has been screenshotted and shared in multiple servers. Reputation slipping...”',
      },
      {
        title: '🟠 Moderate Time Jump',
        message: '⏳ You just lost an invite to a collaboration. People remember tone more than words.',
      },
      {
        title: '🟠 Moderate Time Jump',
        message: '📬 Someone quietly unfriended you. The ripple effects of one sharp message can be real.',
      },
    ];
    return moderateMessages[Math.floor(Math.random() * moderateMessages.length)];
  } else if (karma >= 0 && karma < 2) {
    const severeMessages = [
      {
        title: '🔴 Severe Fallout Simulation',
        message: '📰 News Headline: “Leaked messages reveal verbal aggression from user.”\n👣 Your digital legacy is being shaped—do you want this to be part of it?',
      },
      {
        title: '🔴 Severe Fallout Simulation',
        message: '📸 Screenshot taken. Uploaded to a public forum. The backlash begins.',
      },
      {
        title: '🔴 Severe Fallout Simulation',
        message: '🎭 Future Self: “I wish I had paused before sending that… it cost me more than I expected.”',
      },
    ];
    return severeMessages[Math.floor(Math.random() * severeMessages.length)];
  } else {
    return null;
  }
};

const MirrorVerseAI = ({ karma }) => {
  const feedback = getFeedbackForKarma(karma);
  if (!feedback) return null;

  return (
    <div className="bg-gradient-to-r from-pink-100 via-yellow-100 to-red-100 border border-red-400 text-gray-800 p-4 rounded-lg shadow-md mt-4 animate-pulse">
      <h2 className="font-bold text-lg mb-2">{feedback.title}</h2>
      <p className="whitespace-pre-line">{feedback.message}</p>
    </div>
  );
};

export default MirrorVerseAI;


