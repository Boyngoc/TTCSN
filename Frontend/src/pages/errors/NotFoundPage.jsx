import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-4xl mb-6 shadow-inner">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        Không tìm thấy trang
      </h1>
      <p className="text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
        Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
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
