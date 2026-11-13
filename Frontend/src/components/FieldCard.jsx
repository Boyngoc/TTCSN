import { ArrowRight, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import { formatPrice } from '../utils/format.js'

export default function FieldCard({ field }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <Link to={`/san/${field.id}`} className="relative block h-52 overflow-hidden bg-gradient-to-br from-pitch-700 via-pitch-600 to-emerald-400" aria-label={`Xem chi tiết ${field.name}`}>
        {field.imageUrl ? (
          <img src={field.imageUrl} alt={field.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="pitch-lines flex h-full items-center justify-center">
            <span className="rounded-full border border-white/50 bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">Sân bóng</span>
          </div>
        )}
        <div className="absolute left-4 top-4"><StatusBadge status={field.status} /></div>
        {field.fieldType?.name && <span className="absolute bottom-4 left-4 rounded-full bg-slate-950/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{field.fieldType.name}</span>}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
            <Link to={`/san/${field.id}`} className="transition hover:text-pitch-700">{field.name}</Link>
          </h3>
          {field.averageRating != null && (
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-amber-700">
              <Star size={15} fill="currentColor" />{Number(field.averageRating).toFixed(1)}
              {field.reviewCount != null && <span className="font-medium text-slate-400">({field.reviewCount})</span>}
            </span>
          )}
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-sm leading-5 text-slate-500">
          <MapPin size={15} className="mt-0.5 shrink-0 text-slate-400" />{field.address}
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <span className="text-lg font-extrabold text-pitch-700">{formatPrice(field.pricePerHour)}</span>
            <span className="ml-1 text-xs text-slate-500">/ giờ</span>
          </div>
          <Link to={`/san/${field.id}`} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-pitch-700 transition hover:bg-pitch-50">
            Xem chi tiết <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}
