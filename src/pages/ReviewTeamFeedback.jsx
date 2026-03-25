import { useState } from 'react';
import { Users, MessageSquare, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import {
  currentUser,
  employees,
  existingColleagueFeedback,
  existingManagerFeedback,
} from '../data/mockData';

const scaleKeys = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
const scaleColors = { 'Strongly Disagree': '#ef4444', 'Disagree': '#f97316', 'Neutral': '#eab308', 'Agree': '#22c55e', 'Strongly Agree': '#16a34a' };

export default function ReviewTeamFeedback() {
  const directReports = employees.filter((e) => e.managerId === currentUser.id);
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <Users size={18} className="text-primary-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Review My Team's Feedback
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          View colleague feedback and upward feedback for your direct reports.
        </p>
      </div>

      <div className="space-y-4">
        {directReports.map((emp) => {
          const isExpanded = expandedId === emp.id;
          const collegFeedback = existingColleagueFeedback.filter(
            (f) => f.toId === emp.id && (f.visibleTo === 'manager' || f.visibleTo === 'both')
          );
          const upwardFeedback = existingManagerFeedback[emp.id] || null;

          return (
            <div key={emp.id} className="rounded-xl border border-slate-200 transition-all">
              <button
                onClick={() => toggle(emp.id)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-[13px] font-semibold text-primary-700">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-slate-800">{emp.name}</div>
                  <div className="text-[12px] text-slate-400">
                    {emp.title} · {collegFeedback.length} colleague feedback · {upwardFeedback ? `${upwardFeedback.respondents} upward responses` : 'No upward feedback'}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-slate-400" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="animate-fade-in border-t border-slate-100 p-5">
                  {/* Colleague Feedback */}
                  <div className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                      <MessageSquare size={14} className="text-primary-500" />
                      <h3 className="text-[13px] font-semibold text-slate-700">Colleague Feedback</h3>
                    </div>
                    {collegFeedback.length === 0 ? (
                      <p className="text-[12px] text-slate-400">No colleague feedback available.</p>
                    ) : (
                      <div className="space-y-3">
                        {collegFeedback.map((f) => (
                          <div key={f.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[12px] font-medium text-slate-500">{f.fromName}</span>
                              <span className="text-[11px] text-slate-400">{f.date}</span>
                            </div>
                            <p className="text-[13px] leading-relaxed text-slate-600">{f.feedback}</p>
                            {f.themes && (
                              <div className="mt-2.5 flex flex-wrap gap-1">
                                {f.themes.strengths?.map((t, i) => (
                                  <span key={`s-${i}`} className="rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">{t}</span>
                                ))}
                                {f.themes.development?.map((t, i) => (
                                  <span key={`d-${i}`} className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">{t}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Upward Feedback */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <UserCheck size={14} className="text-violet-500" />
                      <h3 className="text-[13px] font-semibold text-slate-700">Upward Feedback (Manager Assessment)</h3>
                    </div>
                    {!upwardFeedback ? (
                      <p className="text-[12px] text-slate-400">
                        {emp.directReports?.length > 0
                          ? 'No upward feedback submitted yet.'
                          : 'This employee does not manage staff.'}
                      </p>
                    ) : (
                      <div>
                        <div className="mb-3 text-[11px] text-slate-400">
                          n = {upwardFeedback.respondents} of {upwardFeedback.totalStaff} staff responded
                        </div>
                        <div className="space-y-3">
                          {upwardFeedback.questions.map((q, qi) => {
                            const total = Object.values(q.responses).reduce((a, b) => a + b, 0);
                            const agreeCount = (q.responses['Agree'] || 0) + (q.responses['Strongly Agree'] || 0);
                            const agreePct = total > 0 ? Math.round((agreeCount / total) * 100) : 0;

                            return (
                              <div key={qi}>
                                <div className="mb-1 flex items-center justify-between">
                                  <p className="text-[12px] text-slate-600">{q.text}</p>
                                  <span className="whitespace-nowrap text-[11px] font-semibold text-green-600">
                                    {agreePct}%
                                  </span>
                                </div>
                                <div className="flex h-4 overflow-hidden rounded-full">
                                  {scaleKeys.map((key) => {
                                    const count = q.responses[key] || 0;
                                    const pct = total > 0 ? (count / total) * 100 : 0;
                                    if (pct === 0) return null;
                                    return (
                                      <div
                                        key={key}
                                        style={{ width: `${pct}%`, backgroundColor: scaleColors[key] }}
                                        title={`${key}: ${count}`}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* NPS */}
                        <div className="mt-4 rounded-lg bg-slate-50 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] font-medium text-slate-600">NPS Score</span>
                            <span className="text-lg font-bold text-green-600">
                              +{Math.round(((upwardFeedback.nps.promoters - upwardFeedback.nps.detractors) / upwardFeedback.respondents) * 100)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
