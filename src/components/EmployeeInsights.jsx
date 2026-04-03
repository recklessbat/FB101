import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  User,
  TrendingUp,
  MessageSquare,
  Users,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  Plane,
  Clock,
  Tag,
  GitBranch,
  Target,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getTotalReports, careerTimelines, peerBenchmarks, employeeObjectives } from '../data/mockData';

const tabs = [
  { id: 'metadata', label: 'Profile', icon: User },
  { id: 'timeline', label: 'Timeline', icon: GitBranch },
  { id: 'history', label: 'History', icon: TrendingUp },
  { id: 'objectives', label: 'Objectives', icon: Target },
  { id: 'colleague', label: 'Colleague Feedback', icon: MessageSquare },
  { id: 'upward', label: 'Directs Feedback', icon: Users },
];

const ratingToNum = { 'Exceeds expectations': 3, 'Meets expectations': 2, 'Does not meet expectations': 1 };
const likertMap = { 'Strongly Disagree': 1, 'Disagree': 2, 'Neither Disagree, Nor Agree': 3, 'Agree': 4, 'Strongly Agree': 5 };

export default function EmployeeInsights({ employee, historic, colleagueFeedback, managerFeedback }) {
  const [activeTab, setActiveTab] = useState('metadata');

  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-[11px] font-medium transition-colors ${
                active
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="p-5">
        {activeTab === 'metadata' && <MetadataTab employee={employee} />}
        {activeTab === 'timeline' && <TimelineTab employee={employee} />}
        {activeTab === 'history' && <HistoryTab historic={historic} />}
        {activeTab === 'objectives' && <ObjectivesTab employee={employee} />}
        {activeTab === 'colleague' && <ColleagueFeedbackTab feedback={colleagueFeedback} />}
        {activeTab === 'upward' && <UpwardFeedbackTab data={managerFeedback} employee={employee} />}
      </div>
    </div>
  );
}

function MetadataTab({ employee }) {
  const totalReports = getTotalReports(employee.id);
  const directCount = employee.directReports?.length || 0;

  const items = [
    { icon: MapPin, label: 'Location', value: employee.location },
    { icon: Calendar, label: 'Tenure', value: employee.tenure },
    { icon: Briefcase, label: 'Grade / Level', value: employee.grade },
    { icon: Users, label: 'Direct Reports', value: directCount },
    { icon: Users, label: 'Total Reports', value: totalReports },
    { icon: Plane, label: 'Mobility This Year (2026)', value: employee.mobility ? 'Yes' : 'No' },
    { icon: Globe, label: 'International Relocation This Year', value: employee.internationalRelocation ? 'Yes' : 'No' },
    { icon: Clock, label: 'Leave of Absence This Year', value: employee.leaveOfAbsence ? 'Yes' : 'No' },
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="mb-4 text-[13px] font-semibold text-slate-700">Employee Metadata</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <Icon size={14} className="mt-0.5 text-slate-400" />
            <div>
              <div className="text-[11px] text-slate-400">{label}</div>
              <div className="text-[13px] font-medium text-slate-700">{String(value)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineTab({ employee }) {
  const events = careerTimelines[employee.id];
  if (!events || events.length === 0) {
    return <div className="py-8 text-center text-[13px] text-slate-400">No career timeline data available for this employee.</div>;
  }

  const sorted = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  const typeStyles = {
    joined: { color: 'bg-green-500', label: 'Joined' },
    promotion: { color: 'bg-primary-500', label: 'Promotion' },
    role_change: { color: 'bg-violet-500', label: 'Role Change' },
    relocation: { color: 'bg-amber-500', label: 'Relocation' },
    manager_change: { color: 'bg-slate-500', label: 'Manager Change' },
    mobility: { color: 'bg-cyan-500', label: 'Mobility' },
    leave: { color: 'bg-red-400', label: 'Leave' },
    return: { color: 'bg-green-400', label: 'Return' },
  };

  return (
    <div className="animate-fade-in">
      <h3 className="mb-4 text-[13px] font-semibold text-slate-700">Career Journey</h3>
      <div className="max-h-80 overflow-y-auto pr-1">
        <div className="relative ml-3 border-l-2 border-slate-200 pl-6">
          {sorted.map((event, i) => {
            const style = typeStyles[event.type] || { color: 'bg-slate-400', label: event.type };
            return (
              <div key={i} className="relative mb-6 last:mb-0">
                <div className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ${style.color} ring-2 ring-white`} />
                <div className="text-[11px] text-slate-400">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white ${style.color}`}>{style.label}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{event.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ historic }) {
  if (!historic) {
    return <div className="py-8 text-center text-[13px] text-slate-400">No historical data available for this employee.</div>;
  }

  const chartData = historic.years.map((year, i) => ({
    year,
    'What (Delivered)': historic.what[i] ? ratingToNum[historic.what[i]] : 0,
    'How (Delivered)': historic.how[i] ? ratingToNum[historic.how[i]] : 0,
  }));

  const compData = historic.years
    .map((year, i) => {
      if (!historic.salary[i]) return null;
      const salary = historic.salary[i];
      const bonus = historic.bonus?.[i] || 0;
      const total = salary + bonus;
      return { year, Salary: salary, 'Incentive Comp': bonus, total };
    })
    .filter(Boolean);

  // Compute YoY changes
  const yoyData = compData.map((d, i) => {
    if (i === 0) return { ...d, salaryYoY: null, bonusYoY: null, totalYoY: null };
    const prev = compData[i - 1];
    return {
      ...d,
      salaryYoY: prev.Salary ? (((d.Salary - prev.Salary) / prev.Salary) * 100).toFixed(1) : null,
      bonusYoY: prev['Incentive Comp'] ? (((d['Incentive Comp'] - prev['Incentive Comp']) / prev['Incentive Comp']) * 100).toFixed(1) : null,
      totalYoY: prev.total ? (((d.total - prev.total) / prev.total) * 100).toFixed(1) : null,
    };
  });

  const ratingLabel = (val) => {
    if (val === 3) return 'Exceeds';
    if (val === 2) return 'Meets';
    if (val === 1) return 'Does not meet';
    return '';
  };

  const CompLabel = ({ x, y, width, index }) => {
    const d = yoyData[index];
    if (!d || d.totalYoY === null) return null;
    const pct = parseFloat(d.totalYoY);
    return (
      <text x={x + width / 2} y={y - 8} textAnchor="middle" fontSize={10} fill={pct >= 0 ? '#16a34a' : '#dc2626'} fontWeight={600}>
        {pct >= 0 ? '+' : ''}{d.totalYoY}%
      </text>
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h3 className="mb-3 text-[13px] font-semibold text-slate-700">Historic Talent Ratings</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={ratingLabel} tick={{ fontSize: 10, fill: '#94a3b8' }} width={70} />
            <Tooltip formatter={(val) => ratingLabel(val)} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Bar dataKey="What (Delivered)" fill="#5c7cfa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="How (Delivered)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="mb-3 text-[13px] font-semibold text-slate-700">Historic Compensation</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={yoyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={50} />
            <Tooltip formatter={(val, name) => [`$${val.toLocaleString()}`, name]} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Salary" stackId="comp" fill="#5c7cfa" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Incentive Comp" stackId="comp" fill="#22c55e" radius={[4, 4, 0, 0]} label={<CompLabel />} />
          </BarChart>
        </ResponsiveContainer>
        {/* YoY detail table */}
        {yoyData.some((d) => d.totalYoY !== null) && (
          <div className="mt-3 overflow-hidden rounded-lg border border-slate-100">
            <table className="w-full text-[11px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold text-slate-500">Year</th>
                  <th className="px-3 py-1.5 text-right font-semibold text-slate-500">Base YoY</th>
                  <th className="px-3 py-1.5 text-right font-semibold text-slate-500">Incentive YoY</th>
                  <th className="px-3 py-1.5 text-right font-semibold text-slate-500">Total YoY</th>
                </tr>
              </thead>
              <tbody>
                {yoyData.map((d) => (
                  <tr key={d.year} className="border-t border-slate-100">
                    <td className="px-3 py-1.5 text-slate-600">{d.year}</td>
                    <td className="px-3 py-1.5 text-right text-slate-600">{d.salaryYoY !== null ? `${d.salaryYoY > 0 ? '+' : ''}${d.salaryYoY}%` : '—'}</td>
                    <td className="px-3 py-1.5 text-right text-slate-600">{d.bonusYoY !== null ? `${d.bonusYoY > 0 ? '+' : ''}${d.bonusYoY}%` : '—'}</td>
                    <td className="px-3 py-1.5 text-right font-medium text-slate-700">{d.totalYoY !== null ? `${d.totalYoY > 0 ? '+' : ''}${d.totalYoY}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ObjectivesTab({ employee }) {
  const data = employeeObjectives[employee.id];
  const [expandedId, setExpandedId] = useState(null);

  if (!data || data.objectives.length === 0) {
    return <div className="py-8 text-center text-[13px] text-slate-400">No objectives data available for this employee.</div>;
  }

  return (
    <div className="animate-fade-in">
      <h3 className="mb-4 text-[13px] font-semibold text-slate-700">Objectives</h3>
      <div className="space-y-3">
        {data.objectives.map((obj) => {
          const expanded = expandedId === obj.id;
          return (
            <div key={obj.id} className="rounded-lg border border-slate-100">
              <button
                onClick={() => setExpandedId(expanded ? null : obj.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <Target size={14} className="shrink-0 text-primary-500" />
                <span className="flex-1 text-[13px] font-medium text-slate-700">{obj.title}</span>
                {expanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
              </button>
              {expanded && (
                <div className="animate-fade-in border-t border-slate-100 px-4 pb-4 pt-3">
                  <p className="mb-3 text-[12px] text-slate-500">{obj.description}</p>

                  <div className="mb-3 rounded-lg bg-slate-50 p-3">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-violet-600">Mid-Year Check-in</p>
                    <p className="text-[12px] leading-relaxed text-slate-600">{obj.midYearFeedback}</p>
                  </div>

                  {obj.alignedFeedback && obj.alignedFeedback.length > 0 && (
                    <div className="rounded-lg bg-primary-50/50 p-3">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary-600">Objective-Aligned Feedback</p>
                      {obj.alignedFeedback.map((af, i) => (
                        <div key={i} className="mb-1.5 last:mb-0">
                          <span className="text-[11px] font-medium text-slate-500">{af.fromName}: </span>
                          <span className="text-[12px] text-slate-600 italic">"{af.excerpt}"</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ColleagueFeedbackTab({ feedback }) {
  if (!feedback || feedback.length === 0) {
    return <div className="py-8 text-center text-[13px] text-slate-400">No colleague feedback available for this employee.</div>;
  }

  const allStrengths = [];
  const allDevelopment = [];
  feedback.forEach((f) => {
    if (f.themes?.strengths) allStrengths.push(...f.themes.strengths);
    if (f.themes?.development) allDevelopment.push(...f.themes.development);
  });
  const uniqueStrengths = [...new Set(allStrengths)].slice(0, 4);
  const uniqueDevelopment = [...new Set(allDevelopment)].slice(0, 3);

  return (
    <div className="animate-fade-in">
      <div className="mb-5 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <Tag size={13} className="text-primary-500" />
          <h4 className="text-[12px] font-semibold text-slate-600">Key Themes</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-600">Strengths</p>
            <div className="flex flex-wrap gap-1">
              {uniqueStrengths.map((t, i) => (
                <span key={i} className="rounded-md bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">Development Areas</p>
            <div className="flex flex-wrap gap-1">
              {uniqueDevelopment.map((t, i) => (
                <span key={i} className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
        {feedback.map((f) => (
          <div key={f.id} className="rounded-lg border border-slate-100 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] font-medium text-slate-500">{f.fromName}</span>
              <span className="text-[11px] text-slate-400">{f.date}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-600">{f.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpwardFeedbackTab({ data, employee }) {
  if (!data) {
    return <div className="py-8 text-center text-[13px] text-slate-400">No directs feedback available. This employee may not manage staff.</div>;
  }

  const { respondents, totalStaff, questions, nps } = data;
  const npsScore = Math.round(((nps.promoters - nps.detractors) / respondents) * 100);

  const scaleKeys = ['Strongly Disagree', 'Disagree', 'Neither Disagree, Nor Agree', 'Agree', 'Strongly Agree'];
  const scaleColors = { 'Strongly Disagree': '#ef4444', 'Disagree': '#f97316', 'Neither Disagree, Nor Agree': '#eab308', 'Agree': '#22c55e', 'Strongly Agree': '#16a34a' };

  // Compute average scores per question
  const questionAvgs = questions.map((q) => {
    let sum = 0;
    let count = 0;
    scaleKeys.forEach((key) => {
      const c = q.responses[key] || 0;
      if (c > 0) {
        sum += likertMap[key] * c;
        count += c;
      }
    });
    return count > 0 ? (sum / count) : null;
  });

  // Overall manager score
  const validAvgs = questionAvgs.filter((a) => a !== null);
  const overallScore = validAvgs.length > 0 ? (validAvgs.reduce((s, a) => s + a, 0) / validAvgs.length) : null;

  // Peer benchmarks
  const peerKey = employee ? `${employee.grade}|${employee.lob}` : null;
  const peer = peerKey ? peerBenchmarks[peerKey] : null;

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-slate-700">Directs Upward Feedback</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
          n = {respondents} of {totalStaff} staff
        </span>
      </div>

      {/* Overall Manager Score */}
      {overallScore !== null && (
        <div className="mb-5 rounded-lg border border-slate-100 bg-primary-50/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-slate-700">Overall Manager Score</p>
              <p className="text-[11px] text-slate-400">Average across all competencies</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-700">{overallScore.toFixed(1)}</span>
              <span className="text-sm text-slate-400"> / 5</span>
              {peer && (
                <div className="text-[10px] text-slate-400">Peer avg: {peer.overallScore.toFixed(1)}</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, qi) => {
          const total = Object.values(q.responses).reduce((a, b) => a + b, 0);
          const avg = questionAvgs[qi];
          const peerAvg = peer?.questions[qi]?.avgScore;

          return (
            <div key={qi}>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[12px] font-medium text-slate-600">{q.text}</p>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {avg !== null && <span className="text-[12px] font-bold text-primary-700">{avg.toFixed(1)}</span>}
                  {peerAvg && <span className="text-[10px] text-slate-400">Peer: {peerAvg.toFixed(1)}</span>}
                </div>
              </div>
              <div className="flex h-5 overflow-hidden rounded-full">
                {scaleKeys.map((key) => {
                  const count = q.responses[key] || 0;
                  const pct = total > 0 ? (count / total) * 100 : 0;
                  if (pct === 0) return null;
                  return (
                    <div
                      key={key}
                      style={{ width: `${pct}%`, backgroundColor: scaleColors[key] }}
                      className="transition-all"
                      title={`${key}: ${count} (${Math.round(pct)}%)`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {scaleKeys.map((key) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: scaleColors[key] }} />
            <span className="text-[10px] text-slate-400">{key}</span>
          </div>
        ))}
      </div>

      {/* NPS */}
      <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-slate-600">Manager NPS Score</p>
            <p className="text-[11px] text-slate-400">
              {nps.promoters} promoter{nps.promoters !== 1 ? 's' : ''} · {nps.passives} passive · {nps.detractors} detractor{nps.detractors !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${npsScore >= 50 ? 'text-green-600' : npsScore >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
              {npsScore > 0 ? '+' : ''}{npsScore}
            </div>
            {peer && (
              <div className="text-[10px] text-slate-400">Peer NPS: {peer.npsScore > 0 ? '+' : ''}{peer.npsScore}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
