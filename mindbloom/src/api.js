const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateStoryResponse(userInput) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a calm and empathetic storyteller for teenagers.' },
        { role: 'user', content: userInput },
      ],
      temperature: 0.7,
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function analyzeSentiment(userInput) {
  const prompt = `Classify the sentiment of the following text as Positive, Neutral, or Negative. Reply with just the word.\n"${userInput}"`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful sentiment analyzer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0,
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content.trim().toLowerCase();
}
