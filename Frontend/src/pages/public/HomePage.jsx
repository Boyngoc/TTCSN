import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { fieldApi } from '../../api/fieldApi';
import { FieldCard } from '../../components/common/FieldCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    error: fieldsError,
    refetch,
  } = useQuery({
    queryKey: ['featured-fields'],
    queryFn: () => fieldApi.getFields({ page: 0, size: 6 }),
  });

  const { data: fieldTypes = [] } = useQuery({
    queryKey: ['field-types'],
    queryFn: () => fieldApi.getFieldTypes(),
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/fields?keyword=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/fields');
    }
  };

  const fields = fieldsData?.content || [];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Nền tảng đặt sân bóng đá số 1
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Tìm sân nhanh chóng, <br className="hidden sm:inline" />
            <span className="text-emerald-400">bắt trọn đam mê bóng đá</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Hàng trăm sân bóng nhân tạo chất lượng cao luôn sẵn sàng. Đặt sân trực tuyến tiện lợi, xác nhận nhanh chóng chỉ với vài thao tác.
          </p>

          {/* Search Bar Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 text-gray-900"
          >
            <div className="flex-1 flex items-center px-3 gap-2">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên sân, quận huyện hoặc địa chỉ..."
                className="w-full text-sm border-0 focus:outline-none focus:ring-0 placeholder-gray-400 py-2.5"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              Tìm kiếm
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Type Tags */}
          {fieldTypes.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-emerald-200/70">Phân loại sân:</span>
              {fieldTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => navigate(`/fields?fieldType=${t.id}`)}
                  className="px-3 py-1 rounded-full bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/40 transition-colors"
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Đặt sân 24/7 tức thì</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Chủ động chọn khung giờ phù hợp bất kỳ lúc nào, không cần gọi điện thủ công.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Minh bạch & Tin cậy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Thông tin giá cả công khai rõ ràng, đánh giá và nhận xét chân thực từ người chơi khác.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Quản lý lịch tiện lợi</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Theo dõi tình trạng đơn đặt, dễ dàng hủy đơn hoặc gửi phản hồi sau trận đấu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fields Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Sân bóng nổi bật</h2>
            <p className="text-sm text-gray-500 mt-1">Các sân bóng chất lượng cao được đánh giá tốt nhất</p>
          </div>
          <Link
            to="/fields"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {fieldsLoading && <LoadingSpinner message="Đang tải danh sách sân bóng nổi bật..." />}
        {fieldsError && (
          <ErrorState
            title="Không thể tải danh sách sân bóng"
            message={fieldsError.message}
            onRetry={refetch}
          />
        )}

        {!fieldsLoading && !fieldsError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
