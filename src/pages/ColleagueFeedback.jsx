import { useState, useMemo, useRef } from 'react';
import { MessageSquare, Sparkles, Send, Lightbulb, ArrowRight, Tag } from 'lucide-react';
import { employees, currentUser, feedbackTips } from '../data/mockData';

function extractThemes(text) {
  const strengthKeywords = ['strong', 'excellent', 'exceptional', 'great', 'remarkable', 'impressive', 'effective', 'outstanding', 'collaborative', 'reliable', 'skilled', 'positive', 'growth', 'capable', 'prepared', 'professional', 'quality', 'consistent', 'creative', 'innovative', 'thoughtful'];
  const developmentKeywords = ['improve', 'develop', 'growth area', 'could benefit', 'should focus', 'opportunity', 'encourage', 'suggest', 'more effectively', 'work on', 'strengthen', 'could be better', 'needs to', 'area for'];

  const lower = text.toLowerCase();
  const strengths = [];
  const development = [];

  if (strengthKeywords.some((k) => lower.includes(k))) {
    const sentences = text.split(/[.!]/).filter(Boolean);
    sentences.forEach((s) => {
      if (strengthKeywords.some((k) => s.toLowerCase().includes(k))) {
        const words = s.trim().split(' ').slice(0, 4).join(' ');
        if (words.length > 3 && strengths.length < 3) strengths.push(words + '...');
      }
    });
  }
  if (developmentKeywords.some((k) => lower.includes(k))) {
    const sentences = text.split(/[.!]/).filter(Boolean);
    sentences.forEach((s) => {
      if (developmentKeywords.some((k) => s.toLowerCase().includes(k))) {
        const words = s.trim().split(' ').slice(0, 4).join(' ');
        if (words.length > 3 && development.length < 2) development.push(words + '...');
      }
    });
  }

  if (strengths.length === 0) strengths.push('Positive contribution noted');
  if (development.length === 0) development.push('Growth opportunities identified');

  return { strengths, development };
}

export default function ColleagueFeedback() {
  const [search, setSearch] = useState('');
  const [selectedColleague, setSelectedColleague] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [visibility, setVisibility] = useState('both');
  const [submitted, setSubmitted] = useState(false);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [themes, setThemes] = useState(null);
  const inputRef = useRef(null);

  const others = employees.filter((e) => e.id !== currentUser.id);
  const filtered = search.length > 0
    ? others.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const tip = useMemo(() => feedbackTips[Math.floor(Math.random() * feedbackTips.length)], [submitted]);
  const selectionTip = useMemo(() => feedbackTips[Math.floor(Math.random() * feedbackTips.length)], []);

  const handleAiCleanup = () => {
    setIsCleaningUp(true);
    setTimeout(() => {
      const sentences = feedback.split(/(?<=[.!?])\s+/).filter(Boolean);
      const cleaned = sentences
        .map((s) => s.trim())
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');

      const narrative = cleaned
        .replace(/they is/gi, 'they are')
        .replace(/\s+/g, ' ')
        .trim();

      setFeedback(narrative.endsWith('.') ? narrative : narrative + '.');
      setIsCleaningUp(false);
    }, 1200);
  };

  const handleSubmit = () => {
    const extractedThemes = extractThemes(feedback);
    setThemes(extractedThemes);
    setSubmitted(true);
  };

  const handleStartNew = () => {
    setSearch('');
    setSelectedColleague(null);
    setFeedback('');
    setVisibility('both');
    setSubmitted(false);
    setThemes(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in mx-auto max-w-xl pt-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-full bg-green-50 p-3">
            <Send size={24} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Thank you for your feedback!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your feedback on <span className="font-medium text-slate-700">{selectedColleague?.name}</span> has been submitted successfully.
          </p>
        </div>

        {/* Themes */}
        {themes && (
          <div className="mb-8 rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Tag size={14} className="text-primary-500" />
              <h3 className="text-[13px] font-semibold text-slate-700">Key Themes Identified</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-green-600">Strengths</p>
                {themes.strengths.map((t, i) => (
                  <div key={i} className="mb-1 rounded-md bg-green-50 px-2.5 py-1.5 text-[12px] text-green-700">{t}</div>
                ))}
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-amber-600">Development</p>
                {themes.development.map((t, i) => (
                  <div key={i} className="mb-1 rounded-md bg-amber-50 px-2.5 py-1.5 text-[12px] text-amber-700">{t}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-amber-50/50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb size={14} className="text-amber-500" />
            <h3 className="text-[12px] font-semibold text-amber-700">Feedback Tip!</h3>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-600 italic">"{tip}"</p>
        </div>

        <button
          onClick={handleStartNew}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Provide Feedback on Another Colleague
          <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <MessageSquare size={18} className="text-primary-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Colleague Feedback</h1>
        </div>
        <p className="text-sm text-slate-500">
          Provide feedback on a coworker, peer, manager, or leader.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
          Select a colleague
        </label>
        <input
          ref={inputRef}
          type="text"
          value={selectedColleague ? selectedColleague.name : search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedColleague(null);
          }}
          placeholder="Start typing a name..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
        />
        {filtered.length > 0 && !selectedColleague && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {filtered.map((emp) => (
              <button
                key={emp.id}
                onClick={() => {
                  setSelectedColleague(emp);
                  setSearch('');
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-[12px] font-semibold text-primary-700">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-slate-800">{emp.name}</div>
                  <div className="text-[11px] text-slate-400">{emp.title}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Tip shown before colleague is selected */}
      {!selectedColleague && (
        <div className="mb-6 animate-fade-in rounded-xl border border-slate-200 bg-amber-50/50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb size={14} className="text-amber-500" />
            <h3 className="text-[12px] font-semibold text-amber-700">Feedback Tip!</h3>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-600 italic">"{selectionTip}"</p>
        </div>
      )}

      {/* Feedback box */}
      {selectedColleague && (
        <div className="animate-fade-in">
          <div className="mb-6">
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              Feedback
            </label>
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-4 py-2.5">
                <p className="text-[12px] text-slate-400">
                  Please provide feedback on your colleague, highlighting particular strengths and development areas.
                </p>
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                className="w-full resize-none px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-300"
                placeholder="Start writing your feedback..."
              />
            </div>

            {/* AI Cleanup */}
            {feedback.length > 0 && (
              <div className="mt-3 animate-fade-in">
                <button
                  onClick={handleAiCleanup}
                  disabled={isCleaningUp}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-2 text-[12px] font-semibold text-primary-700 transition-all hover:bg-primary-100 disabled:opacity-60"
                >
                  <Sparkles size={14} className={isCleaningUp ? 'animate-spin' : ''} />
                  {isCleaningUp ? 'Cleaning up...' : 'AI Clean-up'}
                </button>
                <span className="ml-3 text-[11px] text-slate-400">
                  Makes feedback more narrative-based, clear, and actionable
                </span>
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="mb-6">
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              Make feedback visible to
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
            >
              <option value="both">Colleague and their manager</option>
              <option value="colleague">Colleague only</option>
              <option value="manager">Their manager only</option>
            </select>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={feedback.trim().length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={15} />
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
}
