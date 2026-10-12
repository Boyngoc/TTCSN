"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";
import { useToast } from "@/app/providers";
import { api, queryString, statusLabel } from "@/lib/api";
import type { PageResponse, User, UserStatus } from "@/lib/types";

type Category = "users" | "owners";
function UsersAdmin() {
  const { notify } = useToast();
  const [category, setCategory] = useState<Category>("users");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState<PageResponse<User> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = (group = category, currentPage = page) => {
    setLoading(true); setError("");
    api<PageResponse<User>>(`/admin/${group}?${queryString({ page: currentPage, size: 10 })}`).then(setResult).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  };
  useEffect(() => { load(category, page); }, [category, page]);
  const updateStatus = async (user: User, status: UserStatus) => {
    try {
      const changed = await api<User>(`/admin/users/${user.id}/status`, { method: "PUT", body: { status } });
      setResult((current) => current ? { ...current, content: current.content.map((item) => item.id === changed.id ? changed : item) } : current);
      notify("Đã cập nhật trạng thái tài khoản.", "success");
    } catch (reason) { notify((reason as Error).message, "error"); }
  };

  return <AdminLayout><div className="admin-title-row"><div><span className="eyebrow">Tài khoản hệ thống</span><h1>Người dùng</h1><p>Xem người chơi và chủ sân, cập nhật trạng thái truy cập.</p></div></div>
    <div className="admin-tabs"><button className={category === "users" ? "active" : ""} onClick={() => { setPage(0); setCategory("users"); }}>Người chơi</button><button className={category === "owners" ? "active" : ""} onClick={() => { setPage(0); setCategory("owners"); }}>Chủ sân</button></div>
    {loading ? <LoadingState label="Đang tải tài khoản" /> : error ? <ErrorState message={error} retry={() => load()} /> : result?.content.length ? <><div className="results-head" style={{ marginTop: 12 }}><span><strong>{result.totalElements}</strong> tài khoản</span><span>Trang {page + 1} / {Math.max(result.totalPages, 1)}</span></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Tài khoản</th><th>Liên hệ</th><th>Vai trò</th><th>Ngày tham gia</th><th>Trạng thái</th><th>Cập nhật</th></tr></thead><tbody>{result.content.map((user) => <tr key={user.id}><td><span className="table-primary">{user.fullName}</span><span className="table-secondary">#{user.id}</span></td><td>{user.email}<span className="table-secondary">{user.phone || "Chưa có số điện thoại"}</span></td><td>{user.role === "OWNER" ? "Chủ sân" : "Người chơi"}</td><td>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(user.createdAt))}</td><td><span className={`badge badge-${user.status}`}>{statusLabel(user.status)}</span></td><td><select aria-label={`Trạng thái ${user.fullName}`} className="select-compact" value={user.status} onChange={(event) => updateStatus(user, event.target.value as UserStatus)}><option value="ACTIVE">Hoạt động</option><option value="INACTIVE">Tạm ngưng</option><option value="BLOCKED">Khóa tài khoản</option></select></td></tr>)}</tbody></table></div><div className="pagination"><button disabled={page <= 0} onClick={() => setPage((current) => current - 1)}>Trước</button><span>{page + 1} / {Math.max(result.totalPages, 1)}</span><button disabled={page + 1 >= result.totalPages} onClick={() => setPage((current) => current + 1)}>Tiếp</button></div></> : <EmptyState title="Danh sách đang trống" />}
  </AdminLayout>;
}

export default function AdminUsersPage() { return <UsersAdmin />; }