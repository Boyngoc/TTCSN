export default function PageHeading({ eyebrow, title, description, action }) {
  return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-pitch-600">{eyebrow}</p>}<h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-slate-500">{description}</p>}</div>{action}</div>
}
