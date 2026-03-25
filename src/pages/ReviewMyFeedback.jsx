import { FileText, MessageSquare } from 'lucide-react';
import { currentUser, existingColleagueFeedback } from '../data/mockData';

export default function ReviewMyFeedback() {
  // Feedback visible to the current user (as colleague)
  const myFeedback = existingColleagueFeedback.filter(
    (f) => f.toId === currentUser.id && (f.visibleTo === 'colleague' || f.visibleTo === 'both')
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <FileText size={18} className="text-primary-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Review My Feedback</h1>
        </div>
        <p className="text-sm text-slate-500">
          Feedback provided to you by your colleagues that has been made visible to you.
        </p>
      </div>

      {myFeedback.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center">
          <MessageSquare size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="text-[14px] font-medium text-slate-400">No feedback available yet</p>
          <p className="mt-1 text-[12px] text-slate-400">
            Feedback shared with you will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myFeedback.map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-slate-200 p-6 transition-all hover:shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-[12px] font-semibold text-primary-700">
                    {f.fromName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-slate-700">{f.fromName}</div>
                    <div className="text-[11px] text-slate-400">Colleague feedback</div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{f.date}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-600">{f.feedback}</p>
              {f.themes && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {f.themes.strengths?.map((t, i) => (
                    <span key={`s-${i}`} className="rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600">
                      {t}
                    </span>
                  ))}
                  {f.themes.development?.map((t, i) => (
                    <span key={`d-${i}`} className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
