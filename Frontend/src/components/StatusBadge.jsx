import { statusLabel } from '../utils/format.js'

const toneByStatus = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  CONFIRMED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  COMPLETED: 'bg-green-50 text-green-700 ring-green-600/10',
  PENDING: 'bg-amber-50 text-amber-800 ring-amber-600/10',
  INACTIVE: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  CANCELLED: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  REJECTED: 'bg-red-50 text-red-700 ring-red-600/10',
  BLOCKED: 'bg-red-50 text-red-700 ring-red-600/10',
  ADMIN: 'bg-violet-50 text-violet-700 ring-violet-600/10',
  OWNER: 'bg-sky-50 text-sky-700 ring-sky-600/10',
  USER: 'bg-blue-50 text-blue-700 ring-blue-600/10',
}

export default function StatusBadge({ status, className = '' }) {
  const tone = toneByStatus[status] || 'bg-slate-100 text-slate-600 ring-slate-500/10'
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${tone} ${className}`}>
      {statusLabel(status)}
    </span>
  )
}
