import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format.js'

export default function FieldCard({ field }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <Link to={`/fields/${field.id}`} className="block">
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-pitch-700 via-pitch-600 to-emerald-400">
          {field.imageUrl && <img src={field.imageUrl} alt={field.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
          {!field.imageUrl && <div className="pitch-lines flex h-full items-center justify-center"><span className="rounded-full border border-white/50 bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">Sân bóng</span></div>}
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${field.status === 'ACTIVE' ? 'bg-white text-pitch-700' : 'bg-slate-900/75 text-white'}`}>{field.status === 'ACTIVE' ? 'Nhận đặt sân' : 'Tạm ngưng'}</span>
          {field.fieldType?.name && <span className="absolute bottom-4 left-4 rounded-full bg-slate-950/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{field.fieldType.name}</span>}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900">{field.name}</h3>
            <ArrowUpRight className="mt-1 shrink-0 text-slate-400 transition group-hover:text-pitch-600" size={19} />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={15} />{field.address}</p>
          <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
            <div><span className="text-xl font-black text-pitch-700">{formatPrice(field.pricePerHour)}</span><span className="ml-1 text-xs text-slate-500">/ giờ</span></div>
            {field.averageRating != null && <span className="flex items-center gap-1 text-sm font-bold text-amber-600"><Star size={15} fill="currentColor" />{Number(field.averageRating).toFixed(1)}</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}
