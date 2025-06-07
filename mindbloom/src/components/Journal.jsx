import { useState } from 'react';
import { generateStoryResponse } from '../api';

const prompts = [
  "What's something that made you smile this week?",
  'Describe a moment when you felt unsure and how you handled it.',
];

export default function Journal({ onInteraction, log, setLog }) {
  const [entry, setEntry] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!entry) return;
    setLoading(true);
    const summary = await generateStoryResponse(entry);
    setLog((l) => [...l, { prompt: prompts[currentPrompt], entry, summary }]);
    setEntry('');
    setCurrentPrompt((p) => (p + 1) % prompts.length);
    setLoading(false);
    onInteraction('positive');
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Journal</h2>
      <p className="italic">{prompts[currentPrompt]}</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts..."
        />
        <button type="submit" disabled={loading} className="bg-green rounded px-3 py-1">
          {loading ? '...' : 'Save'}
        </button>
      </form>
      <div className="space-y-2">
        {log.map((item, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow">
            <p className="font-semibold">Prompt: {item.prompt}</p>
            <p className="mt-1">{item.entry}</p>
            <p className="text-sm text-gray-600 mt-1">GPT: {item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
