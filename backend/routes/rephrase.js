// backend/routes/rephrase.js
import express from 'express';
import { OpenAI } from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that rephrases toxic or offensive messages to sound respectful and emotionally constructive.',
        },
        {
          role: 'user',
          content: `Rephrase this message politely: "${message}"`,
        },
      ],
      max_tokens: 60,
    });

    const rephrased = completion.choices[0].message.content.trim();
    res.json({ rephrased });
  } catch (error) {
    console.error(error);
    res.status(500).json({ rephrased: message });
  }
});

export default router;
