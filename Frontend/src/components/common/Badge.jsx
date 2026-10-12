import React from 'react';

export const Badge = ({
  children,
  variant = 'gray',
  size = 'md',
  className = '',
}) => {
  const variants = {
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant] || variants.gray} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </span>
  );
};
