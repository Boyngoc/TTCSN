import { AlertCircle, LoaderCircle } from 'lucide-react'

export function Loading({ label = 'Đang tải dữ liệu...' }) {
  return <div className="flex items-center justify-center gap-3 py-16 text-sm font-medium text-slate-500"><LoaderCircle className="animate-spin text-pitch-600" size={20} />{label}</div>
}

export function ErrorMessage({ message, onRetry }) {
  return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800"><div className="flex items-start gap-3"><AlertCircle className="mt-0.5 shrink-0" size={19} /><p className="text-sm">{message}</p></div>{onRetry && <button className="mt-3 text-sm font-bold underline" onClick={onRetry}>Thử tải lại</button>}</div>
}

export function EmptyState({ title = 'Chưa có dữ liệu', children }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-bold text-slate-800">{title}</p>{children && <p className="mt-2 text-sm text-slate-500">{children}</p>}</div>
}

export function Notice({ children, kind = 'success' }) {
  const classes = kind === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-pitch-100 bg-pitch-50 text-pitch-700'
  return <div className={`rounded-xl border px-4 py-3 text-sm ${classes}`} role="status">{children}</div>
}
