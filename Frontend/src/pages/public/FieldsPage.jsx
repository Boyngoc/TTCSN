import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { fieldApi } from '../../api/fieldApi';
import { FieldCard } from '../../components/common/FieldCard';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Pagination } from '../../components/common/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const FieldsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local filter states
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [fieldType, setFieldType] = useState(searchParams.get('fieldType') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'id');
  const [sortDir, setSortDir] = useState(searchParams.get('sortDir') || 'desc');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 0);
  const pageSize = 9;

  // Sync state with URL params
  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
    setFieldType(searchParams.get('fieldType') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSortBy(searchParams.get('sortBy') || 'id');
    setSortDir(searchParams.get('sortDir') || 'desc');
    setPage(Number(searchParams.get('page')) || 0);
  }, [searchParams]);

  // Query Field Types
  const { data: fieldTypes = [] } = useQuery({
    queryKey: ['field-types'],
    queryFn: () => fieldApi.getFieldTypes(),
  });

  // Query Fields
  const {
    data: fieldsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fields', { keyword, fieldType, minPrice, maxPrice, sortBy, sortDir, page, size: pageSize }],
    queryFn: () =>
      fieldApi.getFields({
        keyword: keyword || undefined,
        fieldType: fieldType ? Number(fieldType) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy,
        sortDir,
        page,
        size: pageSize,
      }),
  });

  const handleApplyFilter = (e) => {
    if (e) e.preventDefault();
    const params = {};
    if (keyword) params.keyword = keyword;
    if (fieldType) params.fieldType = fieldType;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sortBy) params.sortBy = sortBy;
    if (sortDir) params.sortDir = sortDir;
    params.page = 0; // reset to first page on new filter
    setSearchParams(params);
  };

  const handleResetFilter = () => {
    setKeyword('');
    setFieldType('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('id');
    setSortDir('desc');
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = newPage;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fields = fieldsData?.content || [];
  const totalPages = fieldsData?.totalPages || 1;
  const totalElements = fieldsData?.totalElements || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Danh sách sân bóng
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tìm kiếm và lọc sân bóng phù hợp nhất với nhu cầu của đội bạn
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <form onSubmit={handleApplyFilter} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Từ khóa tìm kiếm"
              icon={Search}
              placeholder="Tên sân, địa chỉ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <Select
              label="Loại sân"
              placeholder="Tất cả các loại sân"
              options={fieldTypes.map((t) => ({ value: t.id.toString(), label: t.name }))}
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            />

            <Input
              label="Giá tối thiểu (VNĐ)"
              type="number"
              placeholder="Từ 100,000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <Input
              label="Giá tối đa (VNĐ)"
              type="number"
              placeholder="Đến 1,000,000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500">Sắp xếp:</span>
              <select
                value={`${sortBy}-${sortDir}`}
                onChange={(e) => {
                  const [by, dir] = e.target.value.split('-');
                  setSortBy(by);
                  setSortDir(dir);
                }}
                className="text-xs rounded-lg border border-gray-200 py-1.5 px-2.5 bg-white text-gray-700 focus:outline-none focus:ring-emerald-500"
              >
                <option value="id-desc">Mới nhất</option>
                <option value="pricePerHour-asc">Giá: Thấp đến cao</option>
                <option value="pricePerHour-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A - Z</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilter}
                icon={RotateCcw}
              >
                Đặt lại
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Filter}
              >
                Lọc kết quả
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Tìm thấy <strong className="text-gray-900 font-semibold">{totalElements}</strong> sân bóng</span>
      </div>

      {/* Main Content Grid */}
      {isLoading && <LoadingSpinner message="Đang tải danh sách sân bóng..." />}

      {error && (
        <ErrorState
          title="Không thể tải danh sách sân bóng"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && fields.length === 0 && (
        <EmptyState
          title="Không tìm thấy sân bóng nào"
          description="Hãy thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc để xem nhiều kết quả hơn."
          actionText="Bỏ lọc"
          onAction={handleResetFilter}
        />
      )}

      {!isLoading && !error && fields.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
