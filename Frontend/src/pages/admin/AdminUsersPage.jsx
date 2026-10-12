import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, UserCheck, UserX, Shield, Phone, Mail } from 'lucide-react';
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

export const AdminUsersPage = () => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const pageSize = 10;

  // Status toggle target: { user, nextStatus }
  const [statusTarget, setStatusTarget] = useState(null);

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-users', { page, keyword }],
    queryFn: () =>
      adminApi.getUsers({
        page,
        size: pageSize,
        keyword: keyword || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }) => adminApi.updateUserStatus(userId, { status }),
    onSuccess: () => {
      success('Cập nhật trạng thái người dùng thành công!');
      setStatusTarget(null);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể cập nhật trạng thái người dùng');
    },
  });

  const users = usersData?.content || [];
  const totalPages = usersData?.totalPages || 1;

  const handleToggleStatus = (u) => {
    const nextStatus =
      u.status === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;
    setStatusTarget({ user: u, nextStatus });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Danh sách tài khoản khách hàng đặt sân trong hệ thống
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md">
        <Input
          icon={Search}
          placeholder="Tìm theo tên, email, số điện thoại..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
        />
      </div>

      {isLoading && <LoadingSpinner message="Đang tải danh sách người dùng..." />}

      {error && (
        <ErrorState
          title="Không thể tải danh sách người dùng"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && users.length === 0 && (
        <EmptyState
          title="Không tìm thấy người dùng nào"
          description="Hãy thử tìm kiếm với từ khóa khác."
        />
      )}

      {!isLoading && !error && users.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Người dùng</th>
                  <th className="px-4 py-3">Liên hệ</th>
                  <th className="px-4 py-3">Vai trò</th>
                  <th className="px-4 py-3">Ngày tạo</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  const statusCfg = UserStatusBadge[u.status] || {
                    label: u.status,
                    variant: 'gray',
                  };
                  const isBlocked = u.status === UserStatus.BLOCKED;

                  return (
                    <tr key={u.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 font-bold text-gray-900">#{u.id}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-gray-900">{u.fullName}</div>
                        <div className="text-[11px] text-gray-400">{u.email}</div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-700">
                        {u.phone || 'Chưa có SĐT'}
                      </td>
                      <td className="px-4 py-3.5 font-medium">{u.role}</td>
                      <td className="px-4 py-3.5 text-gray-400">
                        {formatDateTime(u.createdAt)}
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
                          onClick={() => handleToggleStatus(u)}
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
            userId: statusTarget.user.id,
            status: statusTarget.nextStatus,
          })
        }
        title={
          statusTarget?.nextStatus === UserStatus.BLOCKED
            ? 'Khóa tài khoản người dùng'
            : 'Mở khóa tài khoản'
        }
        message={`Bạn có chắc muốn ${
          statusTarget?.nextStatus === UserStatus.BLOCKED ? 'khóa' : 'mở khóa'
        } tài khoản của "${statusTarget?.user?.fullName}" (${statusTarget?.user?.email}) không?`}
        variant={statusTarget?.nextStatus === UserStatus.BLOCKED ? 'danger' : 'primary'}
        confirmText={
          statusTarget?.nextStatus === UserStatus.BLOCKED ? 'Khóa tài khoản' : 'Mở khóa'
        }
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
};
