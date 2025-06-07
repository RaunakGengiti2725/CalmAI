import { useState } from 'react';
import { getNextStory, analyzeSentiment, evaluateGrowth } from '../api';

const scenarios = [
  "You're overwhelmed with homework and feeling anxious. What do you do?",
  'A close friend seems distant lately. How do you reach out?',
  'You have a big presentation tomorrow and feel nervous. What helps you prepare?',
];

const options = [
  ['Take a short break', 'Ask a teacher for help', 'Ignore it for now'],
  ['Send them a kind message', 'Give them space', 'Plan a fun hangout'],
  ['Practice your speech', 'Talk with a friend', 'Watch a calming video'],
];

export default function StoryEngine({ onInteraction, log, setLog }) {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const prompt = scenarios[step % scenarios.length];

  async function sendMessage(input) {
    if (!input) return;
    setLoading(true);
    const sentiment = await analyzeSentiment(input);
    const score = await evaluateGrowth(input);
    const reply = await getNextStory(`${prompt}\nTeen: ${input}`);
    setLog((logArr) => [...logArr, { question: prompt, user: input, bot: reply }]);
    setStep((s) => s + 1);
    setLoading(false);
    onInteraction(sentiment, score);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await sendMessage(userInput);
    setUserInput('');
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Story Time</h2>
      <p className="italic">{prompt}</p>
      <div className="flex flex-wrap gap-2">
        {options[step % options.length].map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => sendMessage(o)}
            className="bg-peach px-2 py-1 rounded shadow"
          >
            {o}
          </button>
        ))}
      </div>
      <div className="space-y-2 bg-white p-4 rounded shadow max-h-60 overflow-y-auto">
        {log.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <p className="text-sm text-gray-600">{entry.question}</p>
            <p className="font-semibold">You:</p>
            <p className="ml-2">{entry.user}</p>
            <p className="font-semibold mt-1">MindBloom:</p>
            <p className="ml-2">{entry.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 p-2 border rounded"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Your response..."
        />
        <button type="submit" disabled={loading} className="bg-green rounded px-3 py-1">
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
