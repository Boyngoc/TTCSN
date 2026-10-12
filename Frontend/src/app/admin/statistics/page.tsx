"use client";

import { useEffect, useState } from "react";
import { BarChart3, CalendarCheck, CircleDollarSign, MapPinned, UsersRound } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { ErrorState, LoadingState } from "@/components/PageState";
import { api, formatPrice, statusLabel } from "@/lib/api";
import type { Statistics } from "@/lib/types";

function StatisticsAdmin() {
  const [data, setData] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = () => { setLoading(true); api<Statistics>("/admin/statistics").then(setData).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); };
  useEffect(load, []);
  const rows = Object.entries(data?.bookingsByStatus || {}).sort(([a], [b]) => a.localeCompare(b));
  return <AdminLayout><div className="admin-title-row"><div><span className="eyebrow">Số liệu hệ thống</span><h1>Thống kê</h1><p>Tổng quan theo dữ liệu backend đang cung cấp.</p></div><BarChart3 size={25} color="var(--green)" /></div>{loading ? <LoadingState label="Đang tải báo cáo" /> : error ? <ErrorState message={error} retry={load} /> : data && <><div className="metric-grid"><Stat icon={<UsersRound size={17} />} label="Người chơi" value={data.totalUsers} /><Stat icon={<UsersRound size={17} />} label="Chủ sân" value={data.totalOwners} /><Stat icon={<MapPinned size={17} />} label="Sân bóng" value={data.totalFields} /><Stat icon={<CalendarCheck size={17} />} label="Tổng lượt đặt" value={data.totalBookings} /><Stat icon={<CircleDollarSign size={17} />} label="Doanh thu ghi nhận" value={formatPrice(data.totalRevenue)} /></div><section className="content-panel"><h2>Lượt đặt theo trạng thái</h2>{rows.length ? <div className="chart-wrap"><div className="bar-chart">{rows.map(([status, count]) => <div key={status} style={{ height: `${Math.max(5, data.totalBookings ? (Number(count) / data.totalBookings) * 100 : 0)}%` }} title={`${statusLabel(status)}: ${count}`}><span>{status.slice(0, 3)}</span></div>)}</div></div> : <p className="muted">Chưa có dữ liệu trạng thái.</p>}<div className="data-table-wrap" style={{ marginTop: 28 }}><table className="data-table"><thead><tr><th>Trạng thái</th><th>Số lượt</th><th>Tỷ trọng trên tổng lượt</th></tr></thead><tbody>{rows.map(([status, count]) => <tr key={status}><td><span className={`badge badge-${status}`}>{statusLabel(status)}</span></td><td>{count}</td><td>{data.totalBookings ? `${((Number(count) / data.totalBookings) * 100).toFixed(1)}%` : "0%"}</td></tr>)}</tbody></table></div></section><p className="muted" style={{ fontSize: 11, marginTop: 12 }}>Backend chỉ trả doanh thu tổng và lượt đặt theo trạng thái; chưa có chuỗi doanh thu theo ngày/tháng hoặc các chỉ số lấp đầy.</p></>}</AdminLayout>;
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) { return <div className="metric-card"><span className="metric-icon">{icon}</span><span>{label}</span><strong style={{ fontSize: typeof value === "string" ? 19 : undefined }}>{value}</strong></div>; }
export default function AdminStatisticsPage() { return <StatisticsAdmin />; }