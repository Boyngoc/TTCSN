import React from 'react';

export default function PageHeading({ eyebrow, title, description }) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>
      )}
    </header>
  );
}
