import { useState } from 'react';
import { BarChart3, CheckCircle2, Circle, ArrowLeft, Send, User } from 'lucide-react';
import {
  currentUser,
  employees,
  existingTalentRatings,
  historicRatings,
  existingColleagueFeedback,
  existingManagerFeedback,
} from '../data/mockData';
import EmployeeInsights from '../components/EmployeeInsights';

const ratingOptions = ['Exceeds expectations', 'Meets expectations', 'Does not meet expectations'];

export default function TalentRatings() {
  const directReports = employees.filter((e) => e.managerId === currentUser.id);
  const [ratingsState, setRatingsState] = useState(() => {
    try {
      const saved = localStorage.getItem('talent_ratings');
      return saved ? JSON.parse(saved) : { ...existingTalentRatings };
    } catch {
      return { ...existingTalentRatings };
    }
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [whatRating, setWhatRating] = useState('');
  const [howRating, setHowRating] = useState('');

  const selectEmployee = (emp) => {
    const existing = ratingsState[emp.id];
    setSelectedEmployee(emp);
    setWhatRating(existing?.what || '');
    setHowRating(existing?.how || '');
  };

  const handleSubmit = () => {
    const updated = {
      ...ratingsState,
      [selectedEmployee.id]: { what: whatRating, how: howRating, submitted: true },
    };
    setRatingsState(updated);
    localStorage.setItem('talent_ratings', JSON.stringify(updated));
    setSelectedEmployee(null);
  };

  // List view
  if (!selectedEmployee) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2">
            <BarChart3 size={18} className="text-amber-600" />
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Talent Ratings</h1>
          </div>
          <p className="text-sm text-slate-500">
            Provide performance ratings for your direct reports across two dimensions.
          </p>
        </div>

        <div className="space-y-3">
          {directReports.map((emp) => {
            const rating = ratingsState[emp.id];
            const isSubmitted = rating?.submitted;
            return (
              <button
                key={emp.id}
                onClick={() => selectEmployee(emp)}
                className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-5 text-left transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-[13px] font-semibold text-amber-700">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-slate-800">{emp.name}</div>
                  <div className="text-[12px] text-slate-400">{emp.title} · {emp.grade}</div>
                </div>
                <div className="flex items-center gap-2">
                  {isSubmitted ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                      <CheckCircle2 size={12} /> Rated
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                      <Circle size={12} /> Pending
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Rating view
  const empFeedback = existingColleagueFeedback.filter(
    (f) => f.toId === selectedEmployee.id && (f.visibleTo === 'manager' || f.visibleTo === 'both')
  );
  const empManagerFeedback = existingManagerFeedback[selectedEmployee.id] || null;
  const empHistoric = historicRatings[selectedEmployee.id] || null;

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setSelectedEmployee(null)}
        className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-slate-500 transition hover:text-slate-700"
      >
        <ArrowLeft size={15} /> Back to staff list
      </button>

      <div className="flex gap-6">
        {/* Left side - Rating assignment */}
        <div className="w-80 shrink-0">
          {/* Employee header */}
          <div className="mb-6 rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-[14px] font-semibold text-amber-700">
                {selectedEmployee.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="text-[15px] font-semibold text-slate-800">{selectedEmployee.name}</div>
                <div className="text-[12px] text-slate-400">{selectedEmployee.title}</div>
              </div>
            </div>
            <div className="flex gap-3 text-[12px]">
              <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">Grade: {selectedEmployee.grade}</span>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">{selectedEmployee.location}</span>
            </div>
          </div>

          {/* What rating */}
          <div className="mb-5">
            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              (A) What They Delivered
            </label>
            <div className="space-y-2">
              {ratingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setWhatRating(opt)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[13px] font-medium transition-all ${
                    whatRating === opt
                      ? opt === 'Exceeds expectations'
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : opt === 'Meets expectations'
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-red-300 bg-red-50 text-red-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`h-3 w-3 rounded-full border-2 ${
                    whatRating === opt
                      ? opt === 'Exceeds expectations'
                        ? 'border-green-500 bg-green-500'
                        : opt === 'Meets expectations'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-slate-300'
                  }`} />
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* How rating */}
          <div className="mb-6">
            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              (B) How They Delivered It
            </label>
            <div className="space-y-2">
              {ratingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setHowRating(opt)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[13px] font-medium transition-all ${
                    howRating === opt
                      ? opt === 'Exceeds expectations'
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : opt === 'Meets expectations'
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-red-300 bg-red-50 text-red-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`h-3 w-3 rounded-full border-2 ${
                    howRating === opt
                      ? opt === 'Exceeds expectations'
                        ? 'border-green-500 bg-green-500'
                        : opt === 'Meets expectations'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-slate-300'
                  }`} />
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!whatRating || !howRating}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={15} />
            Submit Rating
          </button>
        </div>

        {/* Right side - Employee Insights */}
        <div className="flex-1 min-w-0">
          <EmployeeInsights
            employee={selectedEmployee}
            historic={empHistoric}
            colleagueFeedback={empFeedback}
            managerFeedback={empManagerFeedback}
          />
        </div>
      </div>
    </div>
  );
}
