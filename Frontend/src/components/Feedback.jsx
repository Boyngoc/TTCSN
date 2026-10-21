import React from 'react';
import { AlertCircle, Inbox, RefreshCw } from 'lucide-react';

export const Loading = ({ label = 'Đang tải dữ liệu...' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
    <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-emerald-600" />
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export const ErrorMessage = ({ message = 'Đã có lỗi xảy ra, vui lòng thử lại.', onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center">
    <AlertCircle className="text-red-500" size={28} />
    <p className="max-w-md text-sm font-medium text-red-700">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-700"
      >
        <RefreshCw size={15} />
        Thử lại
      </button>
    )}
  </div>
);

export const EmptyState = ({ title = 'Không tìm thấy dữ liệu', children }) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <Inbox size={26} />
    </div>
    <h3 className="mb-1 text-base font-bold text-slate-900">{title}</h3>
    {children && <p className="max-w-sm text-sm leading-relaxed text-slate-500">{children}</p>}
  </div>
);
