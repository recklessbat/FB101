import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  UserCheck,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { currentUser, feedbackTips, bestPractices, existingTalentRatings } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  const tip = useMemo(() => feedbackTips[Math.floor(Math.random() * feedbackTips.length)], []);
  const practice = useMemo(() => bestPractices[Math.floor(Math.random() * bestPractices.length)], []);

  const pendingRatings = Object.values(existingTalentRatings).filter((r) => !r.submitted).length;

  const actions = [
    {
      title: 'Provide Colleague Feedback',
      description: 'Share feedback on peers, coworkers, or leaders to support their growth.',
      icon: MessageSquare,
      color: 'primary',
      path: '/colleague-feedback',
    },
    {
      title: 'Review Your Manager',
      description: 'Complete your upward feedback assessment on your direct manager.',
      icon: UserCheck,
      color: 'violet',
      path: '/manager-feedback',
    },
    {
      title: 'Complete Talent Ratings',
      description: `${pendingRatings} staff member${pendingRatings !== 1 ? 's' : ''} awaiting performance ratings.`,
      icon: BarChart3,
      color: 'amber',
      path: '/talent-ratings',
      badge: pendingRatings > 0 ? `${pendingRatings} pending` : null,
    },
  ];

  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-600',
      badge: 'bg-primary-100 text-primary-700',
      hover: 'hover:border-primary-200',
    },
    violet: {
      bg: 'bg-violet-50',
      icon: 'text-violet-600',
      badge: 'bg-violet-100 text-violet-700',
      hover: 'hover:border-violet-200',
    },
    amber: {
      bg: 'bg-amber-50',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
      hover: 'hover:border-amber-200',
    },
  };

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Welcome back, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="mt-2 text-base text-slate-500">
          It's performance season. Take a moment to provide thoughtful feedback and complete your reviews.
        </p>
      </div>

      {/* Action Cards */}
      <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          const colors = colorClasses[action.color];
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className={`group relative rounded-xl border border-slate-200 p-6 text-left transition-all ${colors.hover} hover:shadow-sm`}
            >
              <div className={`mb-4 inline-flex rounded-lg ${colors.bg} p-2.5`}>
                <Icon size={20} className={colors.icon} />
              </div>
              <h3 className="mb-1.5 text-[15px] font-semibold text-slate-800">
                {action.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500">
                {action.description}
              </p>
              {action.badge && (
                <span
                  className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colors.badge}`}
                >
                  {action.badge}
                </span>
              )}
              <ArrowRight
                size={16}
                className="absolute right-5 top-6 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500"
              />
            </button>
          );
        })}
      </div>

      {/* Manager Actions Highlight */}
      <div className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-1 text-[15px] font-semibold text-slate-800">
          Manager Action Items
        </h2>
        <p className="mb-4 text-[13px] text-slate-500">
          As a people leader, the following items require your attention.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate('/manager-feedback')}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:shadow"
          >
            <UserCheck size={15} className="text-violet-500" />
            Provide feedback on your manager
          </button>
          <button
            onClick={() => navigate('/talent-ratings')}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:shadow"
          >
            <BarChart3 size={15} className="text-amber-500" />
            Complete performance ratings for your staff
          </button>
        </div>
      </div>

      {/* Tips and Best Practices */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-500" />
            <h3 className="text-[13px] font-semibold text-slate-700">Feedback Tip</h3>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-600 italic">
            "{tip}"
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-primary-500" />
            <h3 className="text-[13px] font-semibold text-slate-700">
              Best Practice: {practice.title}
            </h3>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-600">
            {practice.description}
          </p>
        </div>
      </div>
    </div>
  );
}
