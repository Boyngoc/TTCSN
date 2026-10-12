"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";
import { api, formatDate, formatPrice, statusLabel } from "@/lib/api";
import type { Booking, BookingStatus, PageResponse } from "@/lib/types";

function BookingsAdmin() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("ALL");
  const [result, setResult] = useState<PageResponse<Booking> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = (current = page) => { setLoading(true); api<PageResponse<Booking>>(`/admin/bookings?page=${current}&size=10`).then(setResult).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); };
  useEffect(() => { load(page); }, [page]);
  const bookings = (result?.content || []).filter((item) => filter === "ALL" || item.status === filter);
  return <AdminLayout><div className="admin-title-row"><div><span className="eyebrow">Theo dõi hoạt động</span><h1>Lượt đặt sân</h1><p>Danh sách lượt đặt từ backend. Bộ lọc trạng thái áp dụng trên trang hiện tại.</p></div><div className="inline-select"><span>Trạng thái</span><select className="select-compact" value={filter} onChange={(event) => setFilter(event.target.value)}><option value="ALL">Tất cả</option>{(["PENDING", "CONFIRMED", "CANCELLED", "REJECTED", "COMPLETED"] as BookingStatus[]).map((status) => <option value={status} key={status}>{statusLabel(status)}</option>)}</select></div></div>
    {loading ? <LoadingState label="Đang tải lượt đặt" /> : error ? <ErrorState message={error} retry={() => load()} /> : result?.content.length ? <><div className="results-head"><span><strong>{result.totalElements}</strong> lượt đặt</span><span>Trang {page + 1} / {Math.max(result.totalPages, 1)}</span></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Mã đặt</th><th>Người chơi</th><th>Sân</th><th>Ngày / giờ</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead><tbody>{bookings.map((item) => <tr key={item.id}><td>#{item.id}</td><td className="table-primary">{item.userFullName}<span className="table-secondary">ID {item.userId}</span></td><td>{item.fieldName}</td><td>{formatDate(item.bookingDate)}<span className="table-secondary">{item.startTime} – {item.endTime}</span></td><td>{formatPrice(item.totalPrice)}</td><td><span className={`badge badge-${item.status}`}>{statusLabel(item.status)}</span></td></tr>)}</tbody></table>{!bookings.length && <p className="muted" style={{ padding: 20, fontSize: 12 }}>Không có lượt đặt ở trạng thái này trong trang hiện tại.</p>}</div><div className="pagination"><button disabled={page <= 0} onClick={() => setPage((current) => current - 1)}>Trước</button><span>{page + 1} / {Math.max(result.totalPages, 1)}</span><button disabled={page + 1 >= result.totalPages} onClick={() => setPage((current) => current + 1)}>Tiếp</button></div></> : <EmptyState title="Chưa có lượt đặt" />}
  </AdminLayout>;
}

export default function AdminBookingsPage() { return <BookingsAdmin />; }