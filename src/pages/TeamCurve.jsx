import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { currentUser, employees, existingTalentRatings, curveGuidance } from '../data/mockData';

const ratingLabels = ['Does not meet expectations', 'Meets expectations', 'Exceeds expectations'];
const barColors = { 'Exceeds expectations': '#22c55e', 'Meets expectations': '#5c7cfa', 'Does not meet expectations': '#ef4444' };

export default function TeamCurve() {
  const [activeTab, setActiveTab] = useState('what');
  const directReports = employees.filter((e) => e.managerId === currentUser.id);

  // Read live ratings from localStorage
  const ratingsState = useMemo(() => {
    try {
      const saved = localStorage.getItem('talent_ratings');
      return saved ? JSON.parse(saved) : { ...existingTalentRatings };
    } catch {
      return { ...existingTalentRatings };
    }
  });

  // Build distribution
  const buildDistribution = (dimension) => {
    const buckets = {};
    ratingLabels.forEach((r) => (buckets[r] = []));

    directReports.forEach((emp) => {
      const rating = ratingsState[emp.id];
      if (rating?.submitted && rating[dimension]) {
        const key = rating[dimension];
        if (buckets[key]) buckets[key].push(emp.name);
      }
    });

    const totalRated = Object.values(buckets).reduce((sum, arr) => sum + arr.length, 0);

    return ratingLabels.map((label) => {
      const count = buckets[label].length;
      const pct = totalRated > 0 ? Math.round((count / totalRated) * 100) : 0;
      const guidance = curveGuidance[dimension]?.[label] ?? null;
      return {
        rating: label,
        shortLabel: label === 'Does not meet expectations' ? 'Does Not Meet' : label === 'Meets expectations' ? 'Meets' : 'Exceeds',
        count,
        '% of Rated Staff': pct,
        guidancePct: guidance,
        employees: buckets[label],
      };
    });
  };

  const data = buildDistribution(activeTab);
  const totalRated = data.reduce((sum, d) => sum + d.count, 0);
  const totalStaff = directReports.length;
  const hasGuidance = activeTab === 'what';

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
        <p className="mb-1 text-[12px] font-semibold text-slate-700">{d.rating}</p>
        <p className="text-[12px] text-slate-500">{d.count} employee{d.count !== 1 ? 's' : ''} ({d['% of Rated Staff']}%)</p>
        {d.guidancePct !== null && (
          <p className="mt-1 text-[11px] text-slate-400">Guidance: {d.guidancePct}%</p>
        )}
        {d.employees.length > 0 && (
          <div className="mt-2 border-t border-slate-100 pt-2">
            {d.employees.map((name, i) => (
              <p key={i} className="text-[11px] text-slate-500">• {name}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <BarChart3 size={18} className="text-primary-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Review My Team Curve</h1>
        </div>
        <p className="text-sm text-slate-500">
          Review how your rating distribution aligns with organizational curve guidance.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 flex gap-4">
        <div className="rounded-xl border border-slate-200 px-5 py-3">
          <div className="text-[11px] text-slate-400">Total Staff</div>
          <div className="text-lg font-semibold text-slate-800">{totalStaff}</div>
        </div>
        <div className="rounded-xl border border-slate-200 px-5 py-3">
          <div className="text-[11px] text-slate-400">Rated</div>
          <div className="text-lg font-semibold text-green-600">{totalRated}</div>
        </div>
        <div className="rounded-xl border border-slate-200 px-5 py-3">
          <div className="text-[11px] text-slate-400">Pending</div>
          <div className="text-lg font-semibold text-amber-600">{totalStaff - totalRated}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab('what')}
          className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all ${
            activeTab === 'what'
              ? 'border-primary-300 bg-primary-50 text-primary-700'
              : 'border-slate-200 text-slate-500 hover:border-slate-300'
          }`}
        >
          What They Delivered
        </button>
        <button
          onClick={() => setActiveTab('how')}
          className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all ${
            activeTab === 'how'
              ? 'border-primary-300 bg-primary-50 text-primary-700'
              : 'border-slate-200 text-slate-500 hover:border-slate-300'
          }`}
        >
          How They Delivered It
        </button>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-slate-200 p-6">
        {hasGuidance && (
          <div className="mb-4 flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-slate-400" />
              Expected distribution
            </span>
          </div>
        )}

        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={data} barSize={80}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="shortLabel" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              label={{ value: '% of Rated Staff', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#94a3b8' } }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="% of Rated Staff" radius={[6, 6, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={barColors[entry.rating]} />
              ))}
            </Bar>
            {hasGuidance && data.map((entry, idx) => (
              entry.guidancePct !== null ? (
                <ReferenceLine
                  key={idx}
                  y={entry.guidancePct}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
              ) : null
            ))}
          </BarChart>
        </ResponsiveContainer>

        {/* Distribution table */}
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-100">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-slate-600">Rating</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600">Count</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600">Actual %</th>
                {hasGuidance && <th className="px-4 py-2.5 font-semibold text-slate-600">Guidance %</th>}
                {hasGuidance && <th className="px-4 py-2.5 font-semibold text-slate-600">Variance</th>}
                <th className="px-4 py-2.5 font-semibold text-slate-600">Employees</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                const variance = hasGuidance && row.guidancePct !== null
                  ? row['% of Rated Staff'] - row.guidancePct
                  : null;
                return (
                  <tr key={row.rating} className="border-t border-slate-100">
                    <td className="px-4 py-2.5 font-medium text-slate-700">
                      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: barColors[row.rating] }} />
                      {row.shortLabel}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">{row.count}</td>
                    <td className="px-4 py-2.5 text-slate-600">{row['% of Rated Staff']}%</td>
                    {hasGuidance && <td className="px-4 py-2.5 text-slate-400">{row.guidancePct !== null ? `${row.guidancePct}%` : '—'}</td>}
                    {hasGuidance && (
                      <td className={`px-4 py-2.5 font-medium ${
                        variance === null ? 'text-slate-400' :
                        Math.abs(variance) <= 5 ? 'text-green-600' :
                        variance > 0 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {variance !== null ? `${variance > 0 ? '+' : ''}${variance}pp` : '—'}
                      </td>
                    )}
                    <td className="px-4 py-2.5 text-slate-500">
                      {row.employees.length > 0 ? row.employees.join(', ') : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!hasGuidance && (
          <p className="mt-4 text-[12px] text-slate-400 italic">
            No anticipated distribution guidance is provided for the "How" dimension.
          </p>
        )}
      </div>
    </div>
  );
}
