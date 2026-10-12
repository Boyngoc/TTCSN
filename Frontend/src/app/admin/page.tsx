"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarCheck, CircleDollarSign, MapPinned, UsersRound } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";
import { api, formatDate, formatPrice, statusLabel } from "@/lib/api";
import type { Booking, PageResponse, Statistics } from "@/lib/types";

function Dashboard() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = () => {
    setLoading(true);
    Promise.all([api<Statistics>("/admin/statistics"), api<PageResponse<Booking>>("/admin/bookings?page=0&size=6")])
      .then(([summary, recent]) => { setStats(summary); setBookings(recent.content); })
      .catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  return <AdminLayout><div className="admin-title-row"><div><span className="eyebrow">Không gian điều hành</span><h1>Tổng quan</h1><p>Tình hình hoạt động của hệ thống đặt sân.</p></div><Link href="/admin/statistics" className="button button-outline button-small">Báo cáo <ArrowUpRight size={15} /></Link></div>
    {loading ? <LoadingState label="Đang tải thống kê" /> : error ? <ErrorState message={error} retry={load} /> : stats && <>
      <div className="metric-grid"><Metric icon={<UsersRound size={17} />} label="Người chơi" value={stats.totalUsers} /><Metric icon={<UsersRound size={17} />} label="Chủ sân" value={stats.totalOwners} /><Metric icon={<MapPinned size={17} />} label="Sân bóng" value={stats.totalFields} /><Metric icon={<CalendarCheck size={17} />} label="Tổng lượt đặt" value={stats.totalBookings} /></div>
      <div className="content-panel"><div className="field-admin-top"><h2 style={{ margin: 0 }}>Trạng thái đặt sân</h2><Link className="text-link" href="/admin/bookings">Tất cả lượt đặt <ArrowUpRight size={14} /></Link></div><div className="status-summary">{Object.entries(stats.bookingsByStatus || {}).map(([status, count]) => <div className="status-summary-row" key={status}><span>{statusLabel(status)}</span><div className="status-bar-track"><span style={{ width: `${stats.totalBookings ? Math.max(2, (Number(count) / stats.totalBookings) * 100) : 0}%` }} /></div><strong>{count}</strong></div>)}</div></div>
      <div className="content-panel"><div className="field-admin-top"><h2 style={{ margin: 0 }}>Lượt đặt gần đây</h2><Link className="text-link" href="/admin/bookings">Mở danh sách <ArrowUpRight size={14} /></Link></div>{bookings.length ? <div className="data-table-wrap" style={{ border: 0 }}><table className="data-table"><thead><tr><th>Mã</th><th>Sân</th><th>Người đặt</th><th>Ngày chơi</th><th>Giá trị</th><th>Trạng thái</th></tr></thead><tbody>{bookings.map((item) => <tr key={item.id}><td>#{item.id}</td><td className="table-primary">{item.fieldName}</td><td>{item.userFullName}</td><td>{formatDate(item.bookingDate)}</td><td>{formatPrice(item.totalPrice)}</td><td><span className={`badge badge-${item.status}`}>{statusLabel(item.status)}</span></td></tr>)}</tbody></table></div> : <EmptyState title="Chưa có lượt đặt" />}</div>
    </>}
  </AdminLayout>;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="metric-card"><span className="metric-icon">{icon}</span><span>{label}</span><strong>{new Intl.NumberFormat("vi-VN").format(value)}</strong></div>;
}

export default function AdminDashboardPage() { return <Dashboard />; }