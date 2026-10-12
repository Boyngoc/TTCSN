import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, UserCheck, UserX, Briefcase, Phone, Mail } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { useToast } from '../../context/ToastContext';
import { formatDateTime } from '../../utils/format';
import { UserStatus, UserStatusBadge } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Pagination } from '../../components/common/Pagination';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const AdminOwnersPage = () => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const pageSize = 10;

  // Status toggle target
  const [statusTarget, setStatusTarget] = useState(null);

  const {
    data: ownersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-owners', { page, keyword }],
    queryFn: () =>
      adminApi.getOwners({
        page,
        size: pageSize,
        keyword: keyword || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }) => adminApi.updateUserStatus(userId, { status }),
    onSuccess: () => {
      success('Cập nhật trạng thái chủ sân thành công!');
      setStatusTarget(null);
      queryClient.invalidateQueries({ queryKey: ['admin-owners'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể cập nhật trạng thái chủ sân');
    },
  });

  const owners = ownersData?.content || [];
  const totalPages = ownersData?.totalPages || 1;

  const handleToggleStatus = (o) => {
    const nextStatus =
      o.status === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;
    setStatusTarget({ owner: o, nextStatus });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đối tác chủ sân</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Danh sách các tài khoản chủ sân bóng đăng ký dịch vụ
        </p>
      </div>

      <div className="max-w-md">
        <Input
          icon={Search}
          placeholder="Tìm theo tên chủ sân, email, SĐT..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
        />
      </div>

      {isLoading && <LoadingSpinner message="Đang tải danh sách chủ sân..." />}

      {error && (
        <ErrorState
          title="Không thể tải danh sách chủ sân"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && owners.length === 0 && (
        <EmptyState
          title="Không tìm thấy chủ sân nào"
          description="Hãy thử tìm kiếm với từ khóa khác."
        />
      )}

      {!isLoading && !error && owners.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Chủ sân</th>
                  <th className="px-4 py-3">Liên hệ</th>
                  <th className="px-4 py-3">Ngày gia nhập</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {owners.map((o) => {
                  const statusCfg = UserStatusBadge[o.status] || {
                    label: o.status,
                    variant: 'gray',
                  };
                  const isBlocked = o.status === UserStatus.BLOCKED;

                  return (
                    <tr key={o.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 font-bold text-gray-900">#{o.id}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-gray-900">{o.fullName}</div>
                        <div className="text-[11px] text-gray-400">{o.email}</div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-700">
                        {o.phone || 'Chưa có SĐT'}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400">
                        {formatDateTime(o.createdAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          className={
                            isBlocked
                              ? 'text-emerald-600 hover:bg-emerald-50'
                              : 'text-red-600 hover:bg-red-50'
                          }
                          icon={isBlocked ? UserCheck : UserX}
                          onClick={() => handleToggleStatus(o)}
                        >
                          {isBlocked ? 'Mở khóa' : 'Khóa'}
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
            userId: statusTarget.owner.id,
            status: statusTarget.nextStatus,
          })
        }
        title={
          statusTarget?.nextStatus === UserStatus.BLOCKED
            ? 'Khóa tài khoản chủ sân'
            : 'Mở khóa tài khoản chủ sân'
        }
        message={`Bạn có chắc muốn ${
          statusTarget?.nextStatus === UserStatus.BLOCKED ? 'khóa' : 'mở khóa'
        } tài khoản của chủ sân "${statusTarget?.owner?.fullName}" (${statusTarget?.owner?.email}) không?`}
        variant={statusTarget?.nextStatus === UserStatus.BLOCKED ? 'danger' : 'primary'}
        confirmText={
          statusTarget?.nextStatus === UserStatus.BLOCKED ? 'Khóa chủ sân' : 'Mở khóa'
        }
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
};
