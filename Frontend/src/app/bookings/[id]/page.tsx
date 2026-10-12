"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, MapPin, ReceiptText } from "lucide-react";
import { api, formatDate, formatPrice, statusLabel } from "@/lib/api";
import type { Booking } from "@/lib/types";
import { AuthGate } from "@/components/AuthGate";
import { useToast } from "@/app/providers";
import { ErrorState, LoadingState } from "@/components/PageState";

function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { notify } = useToast();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => { setLoading(true); api<Booking>(`/bookings/${id}`).then(setBooking).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); };
  useEffect(load, [id]);

  const cancel = async () => {
    if (!window.confirm("Bạn có chắc muốn hủy lượt đặt này?")) return;
    setBusy(true);
    try { setBooking(await api<Booking>(`/bookings/${id}/cancel`, { method: "POST" })); notify("Đã gửi yêu cầu hủy lượt đặt.", "success"); }
    catch (reason) { notify((reason as Error).message, "error"); }
    finally { setBusy(false); }
  };

  if (loading) return <LoadingState label="Đang tải chi tiết lượt đặt" />;
  if (error || !booking) return <ErrorState message={error || "Không tìm thấy lượt đặt."} retry={load} />;
  return <div className="page-wrap"><section className="page-intro"><Link href="/bookings" className="text-link"><ArrowLeft size={15} /> Tất cả lượt đặt</Link><div className="admin-title-row" style={{ marginTop: 14 }}><div><span className="eyebrow">Chi tiết lượt đặt #{booking.id}</span><h1 className="page-title">{booking.fieldName}</h1></div><span className={`badge badge-${booking.status}`}>{statusLabel(booking.status)}</span></div></section>
    <div className="content-panel" style={{ maxWidth: 760, marginBottom: 70 }}><h2>Thông tin trận đấu</h2><div className="stat-grid"><div className="stat-card"><span><CalendarDays size={14} /> Ngày chơi</span><strong style={{ fontSize: 16 }}>{formatDate(booking.bookingDate)}</strong></div><div className="stat-card"><span><Clock3 size={14} /> Thời gian</span><strong style={{ fontSize: 16 }}>{booking.startTime}–{booking.endTime}</strong></div><div className="stat-card"><span><ReceiptText size={14} /> Tổng tiền</span><strong style={{ fontSize: 16 }}>{formatPrice(booking.totalPrice)}</strong></div><div className="stat-card"><span><MapPin size={14} /> Mã lượt đặt</span><strong style={{ fontSize: 16 }}>#{booking.id}</strong></div></div><p className="muted" style={{ fontSize: 12, margin: "20px 0 0" }}>Tạo lúc {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(booking.createdAt))}</p><div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}><Link href={`/fields/${booking.fieldId}`} className="button button-outline">Xem sân <ArrowUpRightIcon /></Link>{["PENDING", "CONFIRMED"].includes(booking.status) && <button className="button button-danger" disabled={busy} onClick={cancel}>{busy ? "Đang xử lý..." : "Hủy lượt đặt"}</button>}</div></div>
  </div>;
}

function ArrowUpRightIcon() { return <span aria-hidden="true">↗</span>; }
export default function BookingDetailPage() { return <AuthGate><BookingDetail /></AuthGate>; }