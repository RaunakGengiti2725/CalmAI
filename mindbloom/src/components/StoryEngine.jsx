import { useState } from 'react';
import { generateStoryResponse, analyzeSentiment } from '../api';

export default function StoryEngine({ onInteraction, log, setLog }) {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userInput) return;
    setLoading(true);
    const sentiment = await analyzeSentiment(userInput);
    const reply = await generateStoryResponse(userInput);
    setLog((logArr) => [...logArr, { user: userInput, bot: reply }]);
    setUserInput('');
    setLoading(false);
    onInteraction(sentiment);
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Story Time</h2>
      <div className="space-y-2 bg-white p-4 rounded shadow max-h-60 overflow-y-auto">
        {log.map((entry, idx) => (
          <div key={idx} className="mb-2">
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
