import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StoryEngine from './components/StoryEngine';
import Journal from './components/Journal';
import GrowthTree from './components/GrowthTree';
import Summary from './components/Summary';

export default function App() {
  const [storyLog, setStoryLog] = useState(() => JSON.parse(sessionStorage.getItem('storyLog') || '[]'));
  const [journalLog, setJournalLog] = useState(() => JSON.parse(sessionStorage.getItem('journalLog') || '[]'));
  const [growth, setGrowth] = useState(() => JSON.parse(sessionStorage.getItem('growth') || '{"positive":0,"neutral":0,"insight":0}'));

  useEffect(() => {
    sessionStorage.setItem('storyLog', JSON.stringify(storyLog));
  }, [storyLog]);

  useEffect(() => {
    sessionStorage.setItem('journalLog', JSON.stringify(journalLog));
  }, [journalLog]);

  useEffect(() => {
    sessionStorage.setItem('growth', JSON.stringify(growth));
  }, [growth]);

  function handleInteraction(sentiment, score = 1) {
    setGrowth((g) => ({
      positive: g.positive + (score === 2 ? 1 : 0),
      neutral: g.neutral + (score === 1 ? 1 : 0),
      insight: g.insight + (score === 3 ? 1 : 0),
    }));
  }



  function restart() {
    setStoryLog([]);
    setJournalLog([]);
    setGrowth({ positive: 0, neutral: 0, insight: 0 });
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-lavender to-peach text-gray-800 font-rounded">
      <nav className="bg-green/40 backdrop-blur p-2 flex justify-around rounded-b shadow">
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
      </div>
    </Router>
  );
}
