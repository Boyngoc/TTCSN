import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Eye, Power, MapPin, Phone, Star } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { useToast } from '../../context/ToastContext';
import { formatVND } from '../../utils/format';
import { ActiveStatus, ActiveStatusBadge, DEFAULT_FIELD_IMAGE } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Pagination } from '../../components/common/Pagination';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const AdminFieldsPage = () => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const pageSize = 10;

  // Status toggle target
  const [statusTarget, setStatusTarget] = useState(null);

  const {
    data: fieldsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-fields', { page, keyword }],
    queryFn: () =>
      adminApi.getFields({
        page,
        size: pageSize,
        keyword: keyword || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ fieldId, status }) => adminApi.updateFieldStatus(fieldId, { status }),
    onSuccess: () => {
      success('Cập nhật trạng thái sân bóng thành công!');
      setStatusTarget(null);
      queryClient.invalidateQueries({ queryKey: ['admin-fields'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể cập nhật trạng thái sân bóng');
    },
  });

  const fields = fieldsData?.content || [];
  const totalPages = fieldsData?.totalPages || 1;

  const handleToggleStatus = (f) => {
    const nextStatus =
      f.status === ActiveStatus.ACTIVE ? ActiveStatus.INACTIVE : ActiveStatus.ACTIVE;
    setStatusTarget({ field: f, nextStatus });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý toàn bộ sân bóng</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Kiểm duyệt và quản lý trạng thái hiển thị của các sân bóng trên toàn hệ thống
        </p>
      </div>

      <div className="max-w-md">
        <Input
          icon={Search}
          placeholder="Tìm theo tên sân, địa chỉ, chủ sân..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
        />
      </div>

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
          description="Hãy thử tìm kiếm với từ khóa khác."
        />
      )}

      {!isLoading && !error && fields.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Sân bóng</th>
                  <th className="px-4 py-3">Loại sân</th>
                  <th className="px-4 py-3">Giá thuê/h</th>
                  <th className="px-4 py-3">Chủ sở hữu</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fields.map((f) => {
                  const statusCfg = ActiveStatusBadge[f.status] || {
                    label: f.status,
                    variant: 'gray',
                  };
                  const isActive = f.status === ActiveStatus.ACTIVE;

                  return (
                    <tr key={f.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 font-bold text-gray-900">#{f.id}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-gray-900">{f.name}</div>
                        <div className="text-[11px] text-gray-400 line-clamp-1">{f.address}</div>
                      </td>
                      <td className="px-4 py-3.5 font-medium">{f.typeName || 'Sân cỏ'}</td>
                      <td className="px-4 py-3.5 font-bold text-emerald-600">
                        {formatVND(f.pricePerHour)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-gray-800">{f.ownerFullName || 'N/A'}</div>
                        {f.phone && <div className="text-[11px] text-gray-400">{f.phone}</div>}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          className={
                            isActive
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }
                          icon={Power}
                          onClick={() => handleToggleStatus(f)}
                        >
                          {isActive ? 'Tạm dừng' : 'Kích hoạt'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      )}

      {/* Confirm Status Dialog */}
      <ConfirmDialog
        isOpen={!!statusTarget}
        onClose={() => setStatusTarget(null)}
        onConfirm={() =>
          updateStatusMutation.mutate({
            fieldId: statusTarget.field.id,
            status: statusTarget.nextStatus,
          })
        }
        title={
          statusTarget?.nextStatus === ActiveStatus.INACTIVE
            ? 'Tạm ngừng hoạt động sân bóng'
            : 'Kích hoạt hoạt động sân bóng'
        }
        message={`Bạn có chắc muốn chuyển trạng thái của sân "${statusTarget?.field?.name}" sang ${
          statusTarget?.nextStatus === ActiveStatus.INACTIVE ? 'INACTIVE (Tạm ngưng)' : 'ACTIVE (Hoạt động)'
        } không?`}
        variant={statusTarget?.nextStatus === ActiveStatus.INACTIVE ? 'danger' : 'primary'}
        confirmText={
          statusTarget?.nextStatus === ActiveStatus.INACTIVE ? 'Tạm ngưng sân' : 'Kích hoạt'
        }
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
};
