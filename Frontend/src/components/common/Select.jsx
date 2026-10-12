import React, { forwardRef } from 'react';

export const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Chọn một tùy chọn',
  className = '',
  id,
  required,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`block w-full rounded-lg border text-sm py-2 px-3 bg-white transition-colors
          ${error
            ? 'border-red-300 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'}
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
