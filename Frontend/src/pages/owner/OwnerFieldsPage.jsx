import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PlusCircle,
  Edit,
  Trash2,
  MapPin,
  Star,
  Layers,
  Phone,
} from 'lucide-react';
import { ownerApi } from '../../api/ownerApi';
import { useToast } from '../../context/ToastContext';
import { formatVND } from '../../utils/format';
import { DEFAULT_FIELD_IMAGE, ActiveStatus, ActiveStatusBadge } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const OwnerFieldsPage = () => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();
  const [deletingField, setDeletingField] = useState(null);

  const {
    data: fields = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['owner-fields'],
    queryFn: () => ownerApi.getFields(),
  });

  const deleteMutation = useMutation({
    mutationFn: (fieldId) => ownerApi.deleteField(fieldId),
    onSuccess: () => {
      success('Xóa sân bóng thành công!');
      setDeletingField(null);
      queryClient.invalidateQueries({ queryKey: ['owner-fields'] });
      queryClient.invalidateQueries({ queryKey: ['owner-stats'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể xóa sân bóng này');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh sách sân bóng của tôi</h1>
          <p className="text-xs text-gray-500 mt-1">
            Quản lý thông tin sân bãi, giá thuê và tình trạng hoạt động
          </p>
        </div>
        <Link to="/owner/fields/new">
          <Button variant="primary" icon={PlusCircle}>
            Thêm sân bóng mới
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner message="Đang tải danh sách sân bóng của bạn..." />}

      {error && (
        <ErrorState
          title="Không thể tải danh sách sân bóng"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && fields.length === 0 && (
        <EmptyState
          icon={Layers}
          title="Chưa có sân bóng nào"
          description="Bạn chưa đăng sân bóng nào lên hệ thống. Hãy tạo sân bóng đầu tiên của bạn!"
          actionText="Thêm sân mới"
          onAction={() => window.location.assign('/owner/fields/new')}
        />
      )}

      {!isLoading && !error && fields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((f) => {
            const statusCfg = ActiveStatusBadge[f.status] || {
              label: f.status,
              variant: 'gray',
            };

            return (
              <div
                key={f.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-gray-100">
                    <img
                      src={f.imageUrl || DEFAULT_FIELD_IMAGE}
                      alt={f.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_FIELD_IMAGE;
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                    </div>
                    {f.typeName && (
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {f.typeName}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1">{f.name}</h3>

                    <div className="flex items-start gap-1.5 text-xs text-gray-500 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{f.address}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2">
                      <span className="font-semibold text-emerald-600">
                        {formatVND(f.pricePerHour)}/h
                      </span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{f.averageRating ? f.averageRating.toFixed(1) : 'Mới'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-end gap-2">
                  <Link to={`/owner/fields/${f.id}/edit`}>
                    <Button variant="secondary" size="sm" icon={Edit}>
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:border-red-200"
                    icon={Trash2}
                    onClick={() => setDeletingField(f)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingField}
        onClose={() => setDeletingField(null)}
        onConfirm={() => deleteMutation.mutate(deletingField.id)}
        title="Xác nhận xóa sân bóng"
        message={`Bạn có chắc chắn muốn xóa sân "${deletingField?.name}" không? Hành động này sẽ xóa các dữ liệu liên quan.`}
        confirmText="Xác nhận xóa"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
