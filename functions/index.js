

const HF_API_URL = 'https://api-inference.huggingface.co/models/unitary/toxic-bert';
const HF_API_KEY = 'your_huggingface_api_key_here';
import functions from 'firebase-functions';
import fetch from 'node-fetch';

export const detectToxicity = functions.https.onRequest(async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/unitary/toxic-bert',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();
    res.set('Access-Control-Allow-Origin', '*'); // Allow in dev, restrict later
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error contacting HuggingFace API');
  }
});

