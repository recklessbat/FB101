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
} from 'lucide-react';
import { getTotalReports, careerTimelines } from '../data/mockData';

const tabs = [
  { id: 'metadata', label: 'Profile', icon: User },
  { id: 'timeline', label: 'Timeline', icon: GitBranch },
  { id: 'history', label: 'History', icon: TrendingUp },
  { id: 'colleague', label: 'Colleague Feedback', icon: MessageSquare },
  { id: 'upward', label: 'Directs Feedback', icon: Users },
];

const ratingToNum = { 'Exceeds expectations': 3, 'Meets expectations': 2, 'Does not meet expectations': 1 };

export default function EmployeeInsights({ employee, historic, colleagueFeedback, managerFeedback }) {
  const [activeTab, setActiveTab] = useState('metadata');

  return (
    <div className="rounded-xl border border-slate-200">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-[12px] font-medium transition-colors ${
                active
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {activeTab === 'metadata' && <MetadataTab employee={employee} />}
        {activeTab === 'timeline' && <TimelineTab employee={employee} />}
        {activeTab === 'history' && <HistoryTab historic={historic} />}
        {activeTab === 'colleague' && <ColleagueFeedbackTab feedback={colleagueFeedback} />}
        {activeTab === 'upward' && <UpwardFeedbackTab data={managerFeedback} />}
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
    { icon: Plane, label: 'Mobility This Year', value: employee.mobility ? 'Yes' : 'No' },
    { icon: Globe, label: 'International Relocation', value: employee.internationalRelocation ? 'Yes' : 'No' },
    { icon: Clock, label: 'Leave of Absence', value: employee.leaveOfAbsence ? 'Yes' : 'No' },
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
    return (
      <div className="py-8 text-center text-[13px] text-slate-400">
        No career timeline data available for this employee.
      </div>
    );
  }

  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

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
                {/* Dot on the line */}
                <div className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ${style.color} ring-2 ring-white`} />
                <div className="text-[11px] text-slate-400">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white ${style.color}`}>
                    {style.label}
                  </span>
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
    return (
      <div className="py-8 text-center text-[13px] text-slate-400">
        No historical data available for this employee.
      </div>
    );
  }

  const chartData = historic.years.map((year, i) => ({
    year,
    'What (Delivered)': historic.what[i] ? ratingToNum[historic.what[i]] : 0,
    'How (Delivered)': historic.how[i] ? ratingToNum[historic.how[i]] : 0,
  }));

  const compData = historic.years
    .map((year, i) => {
      if (!historic.salary[i]) return null;
      return {
        year,
        Salary: historic.salary[i],
        'Incentive Comp': historic.bonus?.[i] || 0,
      };
    })
    .filter(Boolean);

  const ratingLabel = (val) => {
    if (val === 3) return 'Exceeds';
    if (val === 2) return 'Meets';
    if (val === 1) return 'Does not meet';
    return '';
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h3 className="mb-3 text-[13px] font-semibold text-slate-700">Historic Talent Ratings</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis
              domain={[0, 3]}
              ticks={[1, 2, 3]}
              tickFormatter={ratingLabel}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              width={70}
            />
            <Tooltip
              formatter={(val) => ratingLabel(val)}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="What (Delivered)" fill="#5c7cfa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="How (Delivered)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="mb-3 text-[13px] font-semibold text-slate-700">Historic Compensation</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={compData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip
              formatter={(val, name) => [`$${val.toLocaleString()}`, name]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Salary" stackId="comp" fill="#5c7cfa" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Incentive Comp" stackId="comp" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ColleagueFeedbackTab({ feedback }) {
  if (!feedback || feedback.length === 0) {
    return (
      <div className="py-8 text-center text-[13px] text-slate-400">
        No colleague feedback available for this employee.
      </div>
    );
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
      {/* Themes */}
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

      {/* Feedback list */}
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

function UpwardFeedbackTab({ data }) {
  if (!data) {
    return (
      <div className="py-8 text-center text-[13px] text-slate-400">
        No directs feedback available. This employee may not manage staff.
      </div>
    );
  }

  const { respondents, totalStaff, questions, nps } = data;
  const npsScore = Math.round(((nps.promoters - nps.detractors) / respondents) * 100);

  const scaleKeys = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  const scaleColors = { 'Strongly Disagree': '#ef4444', 'Disagree': '#f97316', 'Neutral': '#eab308', 'Agree': '#22c55e', 'Strongly Agree': '#16a34a' };

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-slate-700">Directs Upward Feedback</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
          n = {respondents} of {totalStaff} staff
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((q, qi) => {
          const total = Object.values(q.responses).reduce((a, b) => a + b, 0);
          const agreeCount = (q.responses['Agree'] || 0) + (q.responses['Strongly Agree'] || 0);
          const agreePct = total > 0 ? Math.round((agreeCount / total) * 100) : 0;

          return (
            <div key={qi}>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[12px] font-medium text-slate-600">{q.text}</p>
                <span className="whitespace-nowrap text-[11px] font-semibold text-green-600">{agreePct}% Agree / Strongly Agree</span>
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

      {/* Legend */}
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
          <div className={`text-2xl font-bold ${npsScore >= 50 ? 'text-green-600' : npsScore >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
            {npsScore > 0 ? '+' : ''}{npsScore}
          </div>
        </div>
      </div>
    </div>
  );
}
