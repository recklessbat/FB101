import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ColleagueFeedback from './pages/ColleagueFeedback';
import ManagerFeedback from './pages/ManagerFeedback';
import TalentRatings from './pages/TalentRatings';
import ReviewMyFeedback from './pages/ReviewMyFeedback';
import ReviewTeamFeedback from './pages/ReviewTeamFeedback';
import TeamCurve from './pages/TeamCurve';
import SolicitFeedback from './pages/SolicitFeedback';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-white">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-8 py-10 lg:px-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/colleague-feedback" element={<ColleagueFeedback />} />
              <Route path="/manager-feedback" element={<ManagerFeedback />} />
              <Route path="/talent-ratings" element={<TalentRatings />} />
              <Route path="/review-my-feedback" element={<ReviewMyFeedback />} />
              <Route path="/review-team-feedback" element={<ReviewTeamFeedback />} />
              <Route path="/team-curve" element={<TeamCurve />} />
              <Route path="/solicit-feedback" element={<SolicitFeedback />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}
