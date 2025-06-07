import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import StoryEngine from './components/StoryEngine';
import Journal from './components/Journal';
import GrowthTree from './components/GrowthTree';
import Summary from './components/Summary';

export default function App() {
  const [storyLog, setStoryLog] = useState([]);
  const [journalLog, setJournalLog] = useState([]);
  const [growth, setGrowth] = useState({ positive: 0, neutral: 0, insight: 0 });

  function handleInteraction(sentiment, entry) {
    setGrowth((g) => ({
      positive: g.positive + (sentiment === 'positive' ? 1 : 0),
      neutral: g.neutral + (sentiment === 'neutral' ? 1 : 0),
      insight: g.insight + (sentiment === 'insight' ? 1 : 0),
    }));
  }



  function restart() {
    setStoryLog([]);
    setJournalLog([]);
    setGrowth({ positive: 0, neutral: 0, insight: 0 });
  }

  return (
    <Router>
      <nav className="bg-peach p-2 flex justify-around">
        <Link to="/story">Story</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/tree">Tree</Link>
        <Link to="/summary">Summary</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StoryEngine onInteraction={handleInteraction} log={storyLog} setLog={setStoryLog} />} />
        <Route path="/story" element={<StoryEngine onInteraction={handleInteraction} log={storyLog} setLog={setStoryLog} />} />
        <Route path="/journal" element={<Journal onInteraction={handleInteraction} log={journalLog} setLog={setJournalLog} />} />
        <Route path="/tree" element={<GrowthTree growth={growth} />} />
        <Route path="/summary" element={<Summary storyLog={storyLog} journalLog={journalLog} growth={growth} onRestart={restart} />} />
      </Routes>
    </Router>
  );
}
