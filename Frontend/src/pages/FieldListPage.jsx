import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import fieldService from '../services/fieldService';
import FieldCard from '../components/FieldCard';
import { 
  Search, 
  MapPin, 
  Filter, 
  RotateCcw, 
  Tag, 
  DollarSign, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

const FieldListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Danh mục loại sân từ backend
  const [fieldTypes, setFieldTypes] = useState([]);

  // Dữ liệu sân và phân trang
  const [fields, setFields] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 9,
    totalElements: 0,
    totalPages: 0,
  });

  // State các trường lọc
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [address, setAddress] = useState(searchParams.get('address') || '');
  const [fieldTypeId, setFieldTypeId] = useState(searchParams.get('fieldTypeId') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  // Trạng thái gọi API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tải danh sách loại sân 1 lần lúc mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fieldService.getFieldTypes();
        setFieldTypes(res.data || []);
      } catch (err) {
        console.warn('Không thể tải danh sách loại sân:', err);
      }
    };
    fetchTypes();
  }, []);

  // Gọi API lấy danh sách sân mỗi khi query params trên URL thay đổi
  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = {
          keyword: searchParams.get('keyword') || undefined,
          address: searchParams.get('address') || undefined,
          fieldTypeId: searchParams.get('fieldTypeId') || undefined,
          minPrice: searchParams.get('minPrice') || undefined,
          maxPrice: searchParams.get('maxPrice') || undefined,
          page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
          size: 9,
        };

        const response = await fieldService.getFields(queryParams);
        const data = response.data;
        if (data) {
          setFields(data.content || []);
          setPageInfo({
            page: data.page,
            size: data.size,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        }
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách sân bóng. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, [searchParams]);

  // Submit bộ lọc: Cập nhật URL search params
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newParams = {};
    if (keyword.trim()) newParams.keyword = keyword.trim();
    if (address.trim()) newParams.address = address.trim();
    if (fieldTypeId) newParams.fieldTypeId = fieldTypeId;
    if (minPrice) newParams.minPrice = minPrice;
    if (maxPrice) newParams.maxPrice = maxPrice;
    newParams.page = 0; // Reset về trang đầu tiên khi áp dụng lọc

    setSearchParams(newParams);
  };

  // Reset bộ lọc
  const handleResetFilter = () => {
    setKeyword('');
    setAddress('');
    setFieldTypeId('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  // Chuyển trang
  const handlePageChange = (newPage) => {
    const current = Object.fromEntries(searchParams.entries());
    current.page = newPage;
    setSearchParams(current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Danh Sách Sân Bóng Đá
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Khám phá các cụm sân chất lượng, lọc theo khu vực, loại sân và mức giá phù hợp
        </p>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <form onSubmit={handleFilterSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Lọc theo từ khóa */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Từ khóa
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tên sân hoặc tiện ích..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Lọc theo địa chỉ */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Địa chỉ / Khu vực
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Quận, huyện, tên đường..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Lọc theo Loại sân */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Loại Sân
              </label>
              <div className="relative">
                <select
                  value={fieldTypeId}
                  onChange={(e) => setFieldTypeId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 appearance-none"
                >
                  <option value="">Tất cả loại sân</option>
                  {fieldTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <Tag className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Giá tối thiểu */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Giá từ (VNĐ/h)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="50000"
                  placeholder="Ví dụ: 200000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Giá tối đa */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Giá đến (VNĐ/h)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="50000"
                  placeholder="Ví dụ: 600000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetFilter}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Áp Dụng Lọc</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Hiển thị <b>{fields.length}</b> trên tổng số <b>{pageInfo.totalElements}</b> sân bóng
        </span>
      </div>

      {/* Main Content: Loading, Error or Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-88 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="font-bold text-red-800 text-base">Không thể tải dữ liệu sân</h3>
          <p className="text-xs text-red-600 max-w-md mx-auto">{error}</p>
          <button
            onClick={() => setSearchParams({ ...Object.fromEntries(searchParams.entries()) })}
            className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            Thử Lại
          </button>
        </div>
      ) : fields.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <p className="text-slate-500 text-sm">Không tìm thấy sân bóng nào phù hợp với bộ lọc.</p>
          <button
            onClick={handleResetFilter}
            className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-xs rounded-xl transition-colors"
          >
            Xóa bộ lọc & Xem tất cả
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {pageInfo.totalPages > 1 && (
        <div className="pt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(pageInfo.page - 1)}
            disabled={pageInfo.page === 0}
            className="p-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: pageInfo.totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                pageInfo.page === idx
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(pageInfo.page + 1)}
            disabled={pageInfo.page >= pageInfo.totalPages - 1}
            className="p-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldListPage;
