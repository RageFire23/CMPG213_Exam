import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider } from './store/useStore';
import { Page } from './types';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import XPToastLayer from './components/ui/XPToast';
import RoadmapPage from './pages/RoadmapPage';
import StudyUnitsPage from './pages/StudyUnitsPage';
import LearnPage from './pages/LearnPage';
import QuizPage from './pages/QuizPage';
import MockExamPage from './pages/MockExamPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('roadmap');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const navigate = (page: Page, unitId?: string) => {
    setCurrentPage(page);
    if (unitId !== undefined) setSelectedUnitId(unitId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'roadmap':
        return <RoadmapPage onNavigate={navigate} />;
      case 'study':
        return <StudyUnitsPage onNavigate={navigate} />;
      case 'learn':
        return <LearnPage unitId={selectedUnitId} onNavigate={navigate} />;
      case 'quiz':
        return <QuizPage onNavigate={navigate} />;
      case 'mockexam':
        return <MockExamPage onNavigate={navigate} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <RoadmapPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${selectedUnitId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <MobileNav currentPage={currentPage} onNavigate={navigate} />
      <XPToastLayer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
