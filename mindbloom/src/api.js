const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

async function chat(messages, temperature = 0.7) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature,
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content.trim() || '';
}

export async function getNextStory(userInput) {
  return chat(
    [
      { role: 'system', content: 'You are a calm and empathetic storyteller for teenagers.' },
      { role: 'user', content: userInput },
    ],
    0.7,
  );
}

export async function analyzeSentiment(userInput) {
  const prompt = `Classify the sentiment of the following text as Positive, Neutral, or Negative. Reply with just the word.\n"${userInput}"`;
  return chat(
    [
      { role: 'system', content: 'You are a helpful sentiment analyzer.' },
      { role: 'user', content: prompt },
    ],
    0,
  ).then((t) => t.toLowerCase());
}

export async function summarizeJournalEntry(userInput) {
  return chat(
    [
      { role: 'system', content: 'You encourage teens to reflect on their feelings and provide short, affirming summaries.' },
      { role: 'user', content: userInput },
    ],
    0.6,
  );
}

export async function evaluateGrowth(userInput) {
  const prompt = `Rate the depth of insight in the text on a scale of 1-3 where 1 is neutral, 2 is positive, and 3 is deep insight. Reply only with the number.`;
  const scoreText = await chat(
    [
      { role: 'system', content: 'You evaluate emotional insights succinctly.' },
      { role: 'user', content: `${prompt}\n"${userInput}"` },
    ],
    0,
  );
  return parseInt(scoreText, 10) || 1;
}

export async function generateSummary(log) {
  const convo = log.map((l) => `Teen: ${l.user}\nMindBloom: ${l.bot}`).join('\n');
  return chat(
    [
      { role: 'system', content: 'You are a supportive mentor summarizing a teen\'s emotional journey in a few sentences.' },
      { role: 'user', content: convo },
    ],
    0.6,
  );
}

