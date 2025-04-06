// src/utils/toxicity.js
const checkToxicity = async (text) => {
  try {
    const response = await fetch('http://localhost:5000/api/check-toxicity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      credentials: 'include' // Optional if you plan to use cookies/session auth later
    });

    if (!response.ok) throw new Error('Toxicity API failed');

    const result = await response.json();

    // HuggingFace toxicity result check
    return result[0]?.some(item =>
      item.label === 'toxic' && item.score > 0.7
    );

  } catch (error) {
    console.warn('⚠️ Using fallback detection (HuggingFace failed)');
    const toxicKeywords = ['idiot', 'stupid', 'hate', 'dumb', 'trash'];
    return toxicKeywords.some(word =>
      text.toLowerCase().includes(word)
    );
  }
};

export default checkToxicity;

