// src/utils/toxicity.js
export const detectToxicity = async (text) => {
    // 1. Quick keyword check first
    const toxicKeywords = ['stupid', 'idiot', 'hate', 'annoying'];
    if (toxicKeywords.some(word => text.toLowerCase().includes(word))) {
      return 0.95; // Immediately toxic
    }
  
    // 2. HuggingFace API call
    try {
      const hf = new HfInference(process.env.HF_TOKEN);
      const result = await hf.textClassification({
        model: 'unitary/toxic-bert',
        inputs: text,
      });
      return result[0]?.score || 0;
    } catch (e) {
      console.error("HF failed, defaulting to 0");
      return 0; // Fail-safe
    }
  };