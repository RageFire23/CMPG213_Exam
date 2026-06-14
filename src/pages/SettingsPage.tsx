import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Trash2, CheckCircle2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';

export default function SettingsPage() {
  const { geminiApiKey, setGeminiApiKey, progress, resetProgress } = useStore();
  const [draftKey, setDraftKey] = useState(geminiApiKey);
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSaveKey = () => {
    setGeminiApiKey(draftKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 pb-24 md:pb-8 max-w-2xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Configure your exam prep experience.</p>
      </div>

      {/* Gemini API Key */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-bold text-white">Google Gemini API Key</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Required for AI mock exam generation and grading. Get a free key from Google AI Studio.
            </p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
          <p className="text-xs text-blue-300">
            <span className="font-semibold">How to get a free API key:</span><br />
            1. Go to <span className="font-mono">aistudio.google.com</span><br />
            2. Sign in with Google<br />
            3. Click "Get API Key" → "Create API key"<br />
            4. Copy and paste below
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              value={draftKey}
              onChange={e => setDraftKey(e.target.value)}
              placeholder="AIza..."
              className="w-full bg-slate-900/60 border border-slate-600 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors pr-10"
            />
            <button
              onClick={() => setShowKey(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button onClick={handleSaveKey} disabled={!draftKey.trim()}>
            {saved ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" /> : null}
            {saved ? 'Saved!' : 'Save'}
          </Button>
        </div>

        {geminiApiKey && (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">API key configured</span>
          </div>
        )}
      </div>

      {/* Progress Stats */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-3">
        <h2 className="font-bold text-white">Your Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total XP', value: progress.xp },
            { label: 'Level', value: progress.level },
            { label: 'Day Streak', value: progress.streak },
            { label: 'Topics Done', value: progress.completedTopics.length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-700/40 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress */}
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-bold text-rose-300">Reset Progress</h2>
            <p className="text-sm text-rose-400/80 mt-0.5">
              This will permanently delete all XP, completed topics, quiz scores, and exam sessions.
            </p>
          </div>
        </div>

        {!confirmReset ? (
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Reset All Progress
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-rose-300 font-semibold">Are you sure? This cannot be undone.</p>
            <div className="flex gap-2">
              <Button variant="danger" onClick={() => { resetProgress(); setConfirmReset(false); }}>
                Yes, reset everything
              </Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-xs text-slate-500 text-center">
          CMPG213 Exam Prep · All data stored locally in your browser ·
          API key never sent anywhere except directly to Google's Gemini API
        </p>
      </div>
    </motion.div>
  );
}
