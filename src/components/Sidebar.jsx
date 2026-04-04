import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  UserCheck,
  BarChart3,
  FileText,
  Users,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const workflows = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { type: 'divider', label: 'Workflows' },
  { label: 'Colleague Feedback', path: '/colleague-feedback', icon: MessageSquare },
  { label: 'Manager Feedback', path: '/manager-feedback', icon: UserCheck },
  { label: 'Performance Ratings', path: '/talent-ratings', icon: BarChart3 },
  { label: 'Solicit Team Feedback', path: '/solicit-feedback', icon: UserPlus },
  { type: 'divider', label: 'Reviews' },
  { label: 'Review My Feedback', path: '/review-my-feedback', icon: FileText },
  { label: "Review My Team's Feedback", path: '/review-team-feedback', icon: Users },
  { label: 'Review My Team Curve', path: '/team-curve', icon: BarChart3 },
];

export default function Sidebar({ open, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`sidebar-transition relative flex flex-col border-r border-slate-200 bg-slate-50 ${
        open ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4">
        {open && (
          <div className="animate-fade-in">
            <div className="text-sm font-semibold tracking-tight text-slate-800">
              Performance Hub
            </div>
            <div className="text-[11px] text-slate-400">Enterprise Management</div>
          </div>
        )}
        {!open && (
          <div className="mx-auto text-sm font-bold text-primary-600">PH</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {workflows.map((item, i) => {
          if (item.type === 'divider') {
            return open ? (
              <div
                key={i}
                className="mb-2 mt-6 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 first:mt-0"
              >
                {item.label}
              </div>
            ) : (
              <div key={i} className="my-3 border-t border-slate-200" />
            );
          }

          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`group mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              } ${!open ? 'justify-center' : ''}`}
              title={!open ? item.label : undefined}
            >
              <Icon
                size={18}
                className={active ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}
              />
              {open && <span className="animate-fade-in">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="flex h-12 items-center justify-center border-t border-slate-200 text-slate-400 transition-colors hover:text-slate-600"
      >
        {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
}
