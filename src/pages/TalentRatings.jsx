import { useState } from 'react';
import { BarChart3, CheckCircle2, Circle, ArrowLeft, Send, Users, User, AlertTriangle, Award, Shield } from 'lucide-react';
import {
  currentUser,
  employees,
  existingTalentRatings,
  historicRatings,
  existingColleagueFeedback,
  existingManagerFeedback,
  employeeFlags,
} from '../data/mockData';
import EmployeeInsights from '../components/EmployeeInsights';

const ratingOptions = ['', 'Exceeds expectations', 'Meets expectations', 'Does not meet expectations'];

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
  const [whatContext, setWhatContext] = useState('');
  const [howContext, setHowContext] = useState('');
  const [riskRating, setRiskRating] = useState('');
  const [riskContext, setRiskContext] = useState('');

  const selectEmployee = (emp) => {
    const existing = ratingsState[emp.id];
    setSelectedEmployee(emp);
    setWhatRating(existing?.what || '');
    setHowRating(existing?.how || '');
    setWhatContext(existing?.whatContext || '');
    setHowContext(existing?.howContext || '');
    setRiskRating(existing?.risk || '');
    setRiskContext(existing?.riskContext || '');
  };

  const handleSubmit = () => {
    const updated = {
      ...ratingsState,
      [selectedEmployee.id]: { what: whatRating, how: howRating, whatContext, howContext, risk: riskRating, riskContext, submitted: true },
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
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Performance Ratings</h1>
          </div>
          <p className="text-sm text-slate-500">
            Provide performance ratings for your direct reports across two dimensions.
          </p>
        </div>

        <div className="space-y-3">
          {directReports.map((emp) => {
            const rating = ratingsState[emp.id];
            const isSubmitted = rating?.submitted;
            const isManager = emp.directReports && emp.directReports.length > 0;
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
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium text-slate-800">{emp.name}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isManager
                        ? 'bg-violet-50 text-violet-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isManager ? <Users size={10} /> : <User size={10} />}
                      {isManager ? 'Manager' : 'Individual Contributor'}
                    </span>
                  </div>
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
  const flags = employeeFlags[selectedEmployee.id];
  const showRiskBox = flags?.materialRiskTaker || flags?.designatedEmployee;
  const hasAnyFlags = flags && (flags.promotionRadar || flags.materialRiskTaker || flags.designatedEmployee);

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setSelectedEmployee(null)}
        className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-slate-500 transition hover:text-slate-700"
      >
        <ArrowLeft size={15} /> Back to staff list
      </button>

      <div className="flex gap-8">
        {/* Left side - Rating assignment */}
        <div className="w-80 shrink-0 space-y-6">
          {/* Key Considerations */}
          {hasAnyFlags && (
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                Key Considerations
              </div>
              <div className="flex flex-wrap gap-2">
                {flags.promotionRadar && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                    <Award size={12} /> Promotion Radar Candidate
                  </span>
                )}
                {flags.materialRiskTaker && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                    <AlertTriangle size={12} /> Material Risk Taker
                  </span>
                )}
                {flags.designatedEmployee && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                    <Shield size={12} /> Designated Employee
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Employee header */}
          <div className="rounded-xl border border-slate-200 p-5">
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
          <div className="rounded-xl border border-slate-200 p-5">
            <label className="mb-3 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              (A) What They Delivered
            </label>
            <select
              value={whatRating}
              onChange={(e) => setWhatRating(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2.5 text-[13px] font-medium outline-none transition-colors focus:ring-2 focus:ring-primary-100 ${
                whatRating === 'Exceeds expectations'
                  ? 'border-green-300 bg-green-50 text-green-700'
                  : whatRating === 'Does not meet expectations'
                  ? 'border-red-300 bg-red-50 text-red-700'
                  : whatRating === 'Meets expectations'
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <option value="">Select a rating...</option>
              <option value="Exceeds expectations">Exceeds expectations</option>
              <option value="Meets expectations">Meets expectations</option>
              <option value="Does not meet expectations">Does not meet expectations</option>
            </select>
            <textarea
              value={whatContext}
              onChange={(e) => setWhatContext(e.target.value)}
              rows={3}
              placeholder="Contextualize what your employee delivered this year relative to objectives and goals..."
              className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* How rating */}
          <div className="rounded-xl border border-slate-200 p-5">
            <label className="mb-3 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              (B) How They Delivered It
            </label>
            <select
              value={howRating}
              onChange={(e) => setHowRating(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2.5 text-[13px] font-medium outline-none transition-colors focus:ring-2 focus:ring-primary-100 ${
                howRating === 'Exceeds expectations'
                  ? 'border-green-300 bg-green-50 text-green-700'
                  : howRating === 'Does not meet expectations'
                  ? 'border-red-300 bg-red-50 text-red-700'
                  : howRating === 'Meets expectations'
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <option value="">Select a rating...</option>
              <option value="Exceeds expectations">Exceeds expectations</option>
              <option value="Meets expectations">Meets expectations</option>
              <option value="Does not meet expectations">Does not meet expectations</option>
            </select>
            <textarea
              value={howContext}
              onChange={(e) => setHowContext(e.target.value)}
              rows={3}
              placeholder="Contextualize how your employee delivered their objectives relative to expectations..."
              className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Risk and Controls rating */}
          {showRiskBox && (
            <div className="rounded-xl border border-slate-200 p-5">
              <label className="mb-3 block text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                (C) Risk and Controls
              </label>
              <select
                value={riskRating}
                onChange={(e) => setRiskRating(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2.5 text-[13px] font-medium outline-none transition-colors focus:ring-2 focus:ring-primary-100 ${
                  riskRating === 'Exceeds expectations'
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : riskRating === 'Does not meet expectations'
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : riskRating === 'Meets expectations'
                    ? 'border-primary-300 bg-primary-50 text-primary-700'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <option value="">Select a rating...</option>
                <option value="Exceeds expectations">Exceeds expectations</option>
                <option value="Meets expectations">Meets expectations</option>
                <option value="Does not meet expectations">Does not meet expectations</option>
              </select>
              <textarea
                value={riskContext}
                onChange={(e) => setRiskContext(e.target.value)}
                rows={3}
                placeholder="Contextualize how your employee managed risk and controls..."
                className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
              />
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!whatRating || !howRating || (showRiskBox && !riskRating)}
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
