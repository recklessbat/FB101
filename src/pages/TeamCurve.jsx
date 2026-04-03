import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { currentUser, employees, existingTalentRatings, curveGuidance } from '../data/mockData';

const ratingLabels = ['Does not meet expectations', 'Meets expectations', 'Exceeds expectations'];
const barColors = { 'Exceeds expectations': '#22c55e', 'Meets expectations': '#5c7cfa', 'Does not meet expectations': '#ef4444' };

const GuidanceMarks = ({ data, formattedGraphicalItems }) => {
  if (!formattedGraphicalItems?.length) return null;
  const bars = formattedGraphicalItems[0]?.props?.data || [];
  const firstItem = formattedGraphicalItems[0];

  return (
    <g>
      {bars.map((bar, idx) => {
        const entry = data[idx];
        if (!entry || entry.guidancePct === null) return null;
        const x = bar.x;
        const width = bar.width;
        const areaTop = bar.background?.y ?? 0;
        const areaHeight = bar.background?.height ?? 300;
        const yPos = areaTop + areaHeight - (entry.guidancePct / 100) * areaHeight;

        const markColor = entry.rating === 'Exceeds expectations' ? '#86efac'
          : entry.rating === 'Meets expectations' ? '#93b4fd'
          : '#fca5a5';

        return (
          <line
            key={idx}
            x1={x}
            y1={yPos}
            x2={x + width}
            y2={yPos}
            stroke={markColor}
            strokeWidth={3}
            strokeDasharray="6 3"
          />
        );
      })}
    </g>
  );
};

export default function TeamCurve() {
  const [activeTab, setActiveTab] = useState('what');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterManager, setFilterManager] = useState('');

  const directReports = employees.filter((e) => e.managerId === currentUser.id);

  // Derive unique filter values from all employees
  const uniqueLocations = useMemo(() => [...new Set(employees.map(e => e.location))].sort(), []);
  const uniqueGrades = useMemo(() => [...new Set(employees.map(e => e.grade))].sort(), []);
  const uniqueManagers = useMemo(() => {
    const managerIds = [...new Set(employees.map(e => e.managerId).filter(Boolean))];
    return managerIds.map(id => {
      const mgr = employees.find(e => e.id === id);
      return mgr ? { id: mgr.id, name: mgr.name } : { id, name: id };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter directReports
  const filteredReports = useMemo(() => {
    return directReports.filter(emp => {
      if (filterLocation && emp.location !== filterLocation) return false;
      if (filterGrade && emp.grade !== filterGrade) return false;
      if (filterManager && emp.managerId !== filterManager) return false;
      return true;
    });
  }, [directReports, filterLocation, filterGrade, filterManager]);

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
  const buildDistribution = (dimension, reportsList) => {
    const buckets = {};
    ratingLabels.forEach((r) => (buckets[r] = []));

    reportsList.forEach((emp) => {
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

  const data = buildDistribution(activeTab, filteredReports);
  const totalRated = data.reduce((sum, d) => sum + d.count, 0);
  const totalStaff = filteredReports.length;
  const hasGuidance = activeTab === 'what';

  // 9-box matrix helpers
  const matrixLabels = ['Does not meet expectations', 'Meets expectations', 'Exceeds expectations'];
  const matrixCells = useMemo(() => {
    const grid = {};
    matrixLabels.forEach(what => {
      matrixLabels.forEach(how => {
        grid[`${what}|${how}`] = [];
      });
    });
    filteredReports.forEach(emp => {
      const rating = ratingsState[emp.id];
      if (rating?.submitted && rating.what && rating.how) {
        const key = `${rating.what}|${rating.how}`;
        if (grid[key]) grid[key].push(emp.name);
      }
    });
    return grid;
  }, [filteredReports, ratingsState]);

  const getCellColor = (whatIdx, howIdx) => {
    const sum = whatIdx + howIdx; // 0=bottom-left, 4=top-right
    if (sum >= 3) return '#22c55e'; // green
    if (sum >= 1 && sum <= 2) return '#5c7cfa'; // blue
    return '#ef4444'; // red
  };

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
        <button
          onClick={() => setActiveTab('matrix')}
          className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all ${
            activeTab === 'matrix'
              ? 'border-primary-300 bg-primary-50 text-primary-700'
              : 'border-slate-200 text-slate-500 hover:border-slate-300'
          }`}
        >
          What &times; How Matrix
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-[13px] text-slate-600 focus:border-primary-300 focus:outline-none"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-[13px] text-slate-600 focus:border-primary-300 focus:outline-none"
        >
          <option value="">All Grades</option>
          {uniqueGrades.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={filterManager}
          onChange={(e) => setFilterManager(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-[13px] text-slate-600 focus:border-primary-300 focus:outline-none"
        >
          <option value="">All Manager Trees</option>
          {uniqueManagers.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* 9-box Matrix view */}
      {activeTab === 'matrix' && (
        <div className="rounded-xl border border-slate-200 p-6">
          <div className="flex">
            {/* Y-axis label */}
            <div className="flex flex-col items-center justify-center mr-3">
              <span className="text-[12px] font-semibold text-slate-500" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                What
              </span>
            </div>
            <div>
              {/* Grid: rows from top (Exceeds) to bottom (DNM) */}
              {[...matrixLabels].reverse().map((whatLabel, rowIdx) => {
                const whatIdx = 2 - rowIdx; // Exceeds=2, Meets=1, DNM=0
                return (
                  <div key={whatLabel} className="flex items-center">
                    <div className="w-20 text-right pr-3 text-[11px] text-slate-500">
                      {whatLabel === 'Does not meet expectations' ? 'Does Not Meet' : whatLabel === 'Meets expectations' ? 'Meets' : 'Exceeds'}
                    </div>
                    <div className="flex">
                      {matrixLabels.map((howLabel, howIdx) => {
                        const key = `${whatLabel}|${howLabel}`;
                        const emps = matrixCells[key] || [];
                        const count = emps.length;
                        const circleSize = count === 0 ? 16 : Math.min(16 + count * 12, 70);
                        const color = getCellColor(whatIdx, howIdx);
                        return (
                          <div
                            key={howLabel}
                            className="relative flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50"
                            style={{ width: 100, height: 100, margin: 2 }}
                            title={emps.length > 0 ? emps.join(', ') : 'No employees'}
                          >
                            <div
                              className="flex items-center justify-center rounded-full text-white text-[12px] font-semibold"
                              style={{
                                width: circleSize,
                                height: circleSize,
                                backgroundColor: color,
                                opacity: count === 0 ? 0.25 : 0.85,
                              }}
                            >
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {/* X-axis labels */}
              <div className="flex items-center mt-1">
                <div className="w-20" />
                <div className="flex">
                  {matrixLabels.map((howLabel) => (
                    <div key={howLabel} className="text-center text-[11px] text-slate-500" style={{ width: 104 }}>
                      {howLabel === 'Does not meet expectations' ? 'Does Not Meet' : howLabel === 'Meets expectations' ? 'Meets' : 'Exceeds'}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center mt-1">
                <div className="w-20" />
                <div className="text-center text-[12px] font-semibold text-slate-500" style={{ width: 312 }}>
                  How
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {(activeTab === 'what' || activeTab === 'how') && (
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
              <Bar dataKey="% of Rated Staff" radius={[6, 6, 0, 0]} background={{ fill: 'transparent' }}>
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={barColors[entry.rating]} />
                ))}
              </Bar>
              {hasGuidance && <Customized component={<GuidanceMarks data={data} />} />}
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
      )}
    </div>
  );
}
