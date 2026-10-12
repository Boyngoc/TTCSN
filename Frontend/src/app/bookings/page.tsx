"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { api, formatDate, formatPrice, statusLabel } from "@/lib/api";
import type { Booking, PageResponse } from "@/lib/types";
import { AuthGate } from "@/components/AuthGate";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";

function BookingList() {
  const [result, setResult] = useState<PageResponse<Booking> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = () => {
    setLoading(true);
    api<PageResponse<Booking>>("/bookings/my?page=0&size=50").then(setResult).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  return <div className="page-wrap"><section className="page-intro"><span className="eyebrow">Sắp xếp lịch chơi</span><h1 className="page-title">Lịch đặt của tôi</h1><p className="section-copy">Theo dõi các lượt đặt và trạng thái xác nhận từ chủ sân.</p></section>
    {loading ? <LoadingState label="Đang tải lịch đặt" /> : error ? <ErrorState message={error} retry={load} /> : result?.content.length ? <section className="data-table-wrap" style={{ marginBottom: 65 }}><table className="data-table"><thead><tr><th>Sân bóng</th><th>Ngày chơi</th><th>Thời gian</th><th>Tổng tiền</th><th>Trạng thái</th><th></th></tr></thead><tbody>{result.content.map((booking) => <tr key={booking.id}><td><span className="table-primary">{booking.fieldName}</span><span className="table-secondary">Mã đặt #{booking.id}</span></td><td>{formatDate(booking.bookingDate)}</td><td>{booking.startTime} – {booking.endTime}</td><td>{formatPrice(booking.totalPrice)}</td><td><span className={`badge badge-${booking.status}`}>{statusLabel(booking.status)}</span></td><td><Link className="text-link" href={`/bookings/${booking.id}`} aria-label={`Xem lượt đặt ${booking.id}`}><ArrowUpRight size={16} /></Link></td></tr>)}</tbody></table></section> : <EmptyState title="Bạn chưa có lượt đặt nào" detail="Tìm sân và lên lịch cho trận đấu đầu tiên của bạn." />}
  </div>;
}

export default function BookingsPage() { return <AuthGate><BookingList /></AuthGate>; }