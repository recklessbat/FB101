import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserPlus, Send, CheckCircle2, ArrowLeft, Search } from 'lucide-react';
import { currentUser, employees } from '../data/mockData';

export default function SolicitFeedback() {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('employee') || '';

  const directReports = employees.filter((e) => e.managerId === currentUser.id);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(preselectedId);
  const [colleagueSearch, setColleagueSearch] = useState('');
  const [selectedColleagueId, setSelectedColleagueId] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);
  const selectedColleague = employees.find((e) => e.id === selectedColleagueId);

  // Colleagues: everyone except the selected employee and currentUser
  const availableColleagues = employees.filter(
    (e) => e.id !== selectedEmployeeId && e.id !== currentUser.id
  );

  const filteredColleagues = colleagueSearch.trim()
    ? availableColleagues.filter((e) =>
        e.name.toLowerCase().includes(colleagueSearch.toLowerCase()) ||
        e.title.toLowerCase().includes(colleagueSearch.toLowerCase())
      )
    : [];

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('solicited_feedback') || '[]');
    existing.push({
      employeeId: selectedEmployeeId,
      colleagueId: selectedColleagueId,
      colleagueName: selectedColleague?.name || '',
      note,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    });
    localStorage.setItem('solicited_feedback', JSON.stringify(existing));
    setSubmitted(true);
  };

  const canSubmit = selectedEmployeeId && selectedColleagueId;

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-lg pt-8">
          <div className="mb-4 flex items-center gap-3">
            <CheckCircle2 size={24} className="text-green-500" />
            <h2 className="text-xl font-semibold text-slate-800">Feedback Request Sent</h2>
          </div>
          <p className="mb-6 text-[13px] text-slate-500">
            A feedback request for <span className="font-medium text-slate-700">{selectedEmployee?.name}</span> has been sent to{' '}
            <span className="font-medium text-slate-700">{selectedColleague?.name}</span>.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-primary-700"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="mb-4 inline-flex items-center gap-1 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <div className="mb-1 flex items-center gap-2">
          <UserPlus size={18} className="text-primary-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Solicit Team Feedback
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          Request feedback on one of your direct reports from a colleague.
        </p>
      </div>

      <div className="max-w-xl space-y-6">
        {/* Step 1: Select team member */}
        <div className="rounded-xl border border-slate-200 p-5">
          <div className="mb-3 text-[13px] font-semibold text-slate-700">
            1. Select Team Member
          </div>
          <select
            value={selectedEmployeeId}
            onChange={(e) => {
              setSelectedEmployeeId(e.target.value);
              setSelectedColleagueId('');
              setColleagueSearch('');
            }}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">Choose a direct report...</option>
            {directReports.map((dr) => (
              <option key={dr.id} value={dr.id}>
                {dr.name} - {dr.title}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Search for colleague */}
        <div className="rounded-xl border border-slate-200 p-5">
          <div className="mb-3 text-[13px] font-semibold text-slate-700">
            2. Select a Colleague to Provide Feedback
          </div>
          {selectedColleagueId ? (
            <div className="flex items-center justify-between rounded-lg border border-primary-200 bg-primary-50 px-3 py-2">
              <div>
                <div className="text-[13px] font-medium text-slate-800">{selectedColleague?.name}</div>
                <div className="text-[11px] text-slate-500">{selectedColleague?.title}</div>
              </div>
              <button
                onClick={() => {
                  setSelectedColleagueId('');
                  setColleagueSearch('');
                }}
                className="text-[12px] font-medium text-primary-600 hover:text-primary-700"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or title..."
                value={colleagueSearch}
                onChange={(e) => setColleagueSearch(e.target.value)}
                disabled={!selectedEmployeeId}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-[13px] text-slate-700 outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {filteredColleagues.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                  {filteredColleagues.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedColleagueId(c.id);
                        setColleagueSearch('');
                      }}
                      className="flex w-full flex-col px-3 py-2 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="text-[13px] font-medium text-slate-700">{c.name}</span>
                      <span className="text-[11px] text-slate-400">{c.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 3: Optional note */}
        <div className="rounded-xl border border-slate-200 p-5">
          <div className="mb-3 text-[13px] font-semibold text-slate-700">
            3. Context for Feedback Request <span className="font-normal text-slate-400">(optional)</span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Please focus on their collaboration skills during the recent project..."
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={14} />
          Send Feedback Request
        </button>
      </div>
    </div>
  );
}
