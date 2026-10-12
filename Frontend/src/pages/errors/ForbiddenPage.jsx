import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center font-extrabold text-4xl mb-6 shadow-inner">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        Truy cập bị từ chối (403)
      </h1>
      <p className="text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
        Bạn không có quyền hạn cần thiết để truy cập vào tài nguyên hoặc trang quản trị này.
      </p>
      <div className="flex gap-3">
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};
