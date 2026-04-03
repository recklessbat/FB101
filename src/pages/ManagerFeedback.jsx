import { useState } from 'react';
import {
  UserCheck,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Edit3,
  AlertCircle,
  ArrowLeft,
  Circle,
} from 'lucide-react';
import {
  currentUser,
  employees,
  managerCompetencyQuestions,
  ratingScale,
  npsScale,
  altManagerReasons,
} from '../data/mockData';

const STORAGE_KEY = 'manager_feedback_v2';

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Migration: if old format (no direct/alt keys), wrap as direct
    if (parsed.ratings && !parsed.direct) {
      return { direct: parsed, alt: null };
    }
    return parsed;
  } catch {
    return null;
  }
}

const mainScale = ratingScale.filter((r) => r !== 'Unable to Evaluate');

export default function ManagerFeedback() {
  const saved = loadSaved();
  const [activeManager, setActiveManager] = useState(null); // null = selection, 'direct' | 'alt'
  const [data, setData] = useState(saved || { direct: null, alt: null });

  // Form state
  const [managerName, setManagerName] = useState('');
  const [useAltSearch, setUseAltSearch] = useState(false);
  const [altSearch, setAltSearch] = useState('');
  const [altReason, setAltReason] = useState('');
  const [ratings, setRatings] = useState({});
  const [nps, setNps] = useState(null);
  const [editing, setEditing] = useState(false);

  const others = employees.filter((e) => e.id !== currentUser.id);
  const altFiltered = altSearch.length > 0
    ? others.filter((e) => e.name.toLowerCase().includes(altSearch.toLowerCase()))
    : [];

  const allAnswered = managerCompetencyQuestions.every((q) => ratings[q]) && nps !== null;

  const openForm = (type) => {
    const existing = data[type];
    if (existing?.submitted && !editing) {
      setActiveManager(type);
      return;
    }
    setActiveManager(type);
    if (type === 'direct') {
      setManagerName(existing?.managerName || currentUser.managerName);
    } else {
      setManagerName(existing?.managerName || currentUser.altManagerName || '');
    }
    setRatings(existing?.ratings || {});
    setNps(existing?.nps ?? null);
    setAltReason(existing?.altReason || '');
    setEditing(!existing?.submitted);
  };

  const handleEdit = () => {
    const existing = data[activeManager];
    setManagerName(existing?.managerName || '');
    setRatings(existing?.ratings || {});
    setNps(existing?.nps ?? null);
    setAltReason(existing?.altReason || '');
    setEditing(true);
  };

  const handleRating = (question, value) => {
    setRatings((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    const entry = { managerName, ratings, nps, altReason, submitted: true };
    const updated = { ...data, [activeManager]: entry };
    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditing(false);
  };

  const handleBack = () => {
    setActiveManager(null);
    setEditing(false);
    setUseAltSearch(false);
    setAltSearch('');
  };

  // Selection view
  if (activeManager === null) {
    const directEntry = data.direct;
    const altEntry = data.alt;
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2">
            <UserCheck size={18} className="text-violet-600" />
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Manager Feedback</h1>
          </div>
          <p className="text-sm text-slate-500">
            Provide quantitative feedback on your managers' competencies.
          </p>
        </div>

        <div className="space-y-3">
          {/* Direct Manager */}
          <button
            onClick={() => openForm('direct')}
            className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-5 text-left transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-[13px] font-semibold text-violet-700">
              {currentUser.managerName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-medium text-slate-800">{currentUser.managerName}</div>
              <div className="text-[12px] text-slate-400">Direct Manager</div>
            </div>
            {directEntry?.submitted ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                <CheckCircle2 size={12} /> Submitted
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                <Circle size={12} /> Pending
              </span>
            )}
          </button>

          {/* Alt / Dotted Line Manager */}
          {currentUser.altManagerId && (
            <button
              onClick={() => openForm('alt')}
              className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-5 text-left transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-[13px] font-semibold text-amber-700">
                {(altEntry?.managerName || currentUser.altManagerName || '??').split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-medium text-slate-800">
                  {altEntry?.managerName || currentUser.altManagerName}
                </div>
                <div className="text-[12px] text-slate-400">Alt / Dotted Line Manager</div>
              </div>
              {altEntry?.submitted ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                  <CheckCircle2 size={12} /> Submitted
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                  <Circle size={12} /> Pending
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Submitted view
  const currentEntry = data[activeManager];
  if (currentEntry?.submitted && !editing) {
    return (
      <div className="animate-fade-in mx-auto max-w-xl pt-8">
        <button onClick={handleBack} className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-slate-500 transition hover:text-slate-700">
          <ArrowLeft size={15} /> Back to manager selection
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex rounded-full bg-green-50 p-3">
            <CheckCircle2 size={24} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Feedback Submitted</h1>
          <p className="mt-2 text-sm text-slate-500">
            Your feedback on <span className="font-medium text-slate-700">{currentEntry.managerName}</span> has been
            recorded. This will be shared with your manager's manager as part of the year-end review.
          </p>
          <button
            onClick={handleEdit}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Edit3 size={14} /> Edit My Responses
          </button>
        </div>
      </div>
    );
  }

  // Form view
  return (
    <div className="animate-fade-in">
      <button onClick={handleBack} className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-slate-500 transition hover:text-slate-700">
        <ArrowLeft size={15} /> Back to manager selection
      </button>

      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <UserCheck size={18} className="text-violet-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {activeManager === 'direct' ? 'Direct Manager' : 'Alt / Dotted Line Manager'} Feedback
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          Provide quantitative feedback on your manager's competencies.
        </p>
      </div>

      {/* Manager name */}
      <div className="mb-8 rounded-xl border border-slate-200 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {activeManager === 'direct' ? 'Your Direct Manager' : 'Alt / Dotted Line Manager'}
            </p>
            <p className="mt-0.5 text-[15px] font-medium text-slate-800">{managerName}</p>
          </div>
          {activeManager === 'alt' && (
            <button
              onClick={() => setUseAltSearch(!useAltSearch)}
              className="flex items-center gap-1 text-[12px] font-medium text-primary-600 transition hover:text-primary-700"
            >
              Select Different Manager
              {useAltSearch ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
        {useAltSearch && (
          <div className="animate-fade-in space-y-3 border-t border-slate-100 pt-4">
            <div className="relative">
              <input
                type="text"
                value={altSearch}
                onChange={(e) => setAltSearch(e.target.value)}
                placeholder="Search for manager..."
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
              />
              {altFiltered.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                  {altFiltered.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => { setManagerName(emp.name); setAltSearch(''); }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-slate-50"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-[11px] font-semibold text-violet-700">
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
            <select
              value={altReason}
              onChange={(e) => setAltReason(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-primary-300"
            >
              <option value="">Select reason for alternative manager...</option>
              {altManagerReasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Competency Ratings */}
      <div className="mb-8">
        <h2 className="mb-1 text-[15px] font-semibold text-slate-800">
          Rate your manager on the below managerial competencies
        </h2>
        <p className="mb-6 text-[12px] text-slate-400">
          Select one rating per competency. All responses are confidential.
        </p>

        <div className="space-y-5">
          {managerCompetencyQuestions.map((question) => (
            <div key={question} className="rounded-xl border border-slate-200 p-5">
              <p className="mb-3 text-[13px] font-medium text-slate-700">{question}</p>
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-2">
                  {mainScale.map((option) => {
                    const selected = ratings[question] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleRating(question, option)}
                        className={`rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all ${
                          selected
                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="ml-3 border-l border-slate-200 pl-3">
                  <button
                    onClick={() => handleRating(question, 'Unable to Evaluate')}
                    className={`rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all ${
                      ratings[question] === 'Unable to Evaluate'
                        ? 'border-slate-400 bg-slate-100 text-slate-700'
                        : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Unable to Evaluate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NPS */}
      <div className="mb-8 rounded-xl border border-slate-200 p-5">
        <p className="mb-1 text-[13px] font-medium text-slate-700">
          How likely are you to recommend your manager to colleagues and coworkers?
        </p>
        <p className="mb-4 text-[11px] text-slate-400">0 = Not at all likely · 10 = Extremely likely</p>
        <div className="flex gap-2">
          {npsScale.map((n) => {
            const selected = nps === n;
            let colorClass = 'border-slate-200 text-slate-500 hover:border-slate-300';
            if (selected) {
              if (n <= 6) colorClass = 'border-red-300 bg-red-50 text-red-700';
              else if (n <= 8) colorClass = 'border-amber-300 bg-amber-50 text-amber-700';
              else colorClass = 'border-green-300 bg-green-50 text-green-700';
            }
            return (
              <button
                key={n}
                onClick={() => setNps(n)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-[13px] font-semibold transition-all ${colorClass}`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {!allAnswered && (
        <div className="mb-4 flex items-center gap-2 text-[12px] text-slate-400">
          <AlertCircle size={14} /> Please complete all ratings before submitting.
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send size={15} />
        {editing ? 'Resubmit Feedback' : 'Submit Feedback'}
      </button>
    </div>
  );
}
