import GrowthTree from './GrowthTree';

export default function Summary({ storyLog, journalLog, growth, onRestart }) {
  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Your Journey</h2>
      <div className="space-y-2">
        <h3 className="font-semibold">Story Highlights</h3>
        {storyLog.map((s, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow">
            <p>You: {s.user}</p>
            <p>MindBloom: {s.bot}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Journal Entries</h3>
        {journalLog.map((j, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow">
            <p>{j.entry}</p>
            <p className="text-sm text-gray-600">GPT: {j.summary}</p>
          </div>
        ))}
      </div>
      <GrowthTree growth={growth} />
      <button onClick={onRestart} className="bg-peach px-3 py-1 rounded">Restart Journey</button>
    </div>
  );
}
