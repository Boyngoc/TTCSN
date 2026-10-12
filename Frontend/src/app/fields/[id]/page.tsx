"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CalendarDays, MapPin, Star } from "lucide-react";
import { api, formatDate, formatPrice } from "@/lib/api";
import type { Booking, Field, PageResponse, Review } from "@/lib/types";
import { useAuth, useToast } from "@/app/providers";
import { LoadingState, ErrorState, EmptyState } from "@/components/PageState";

const fallbackImage = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1500&q=90";

export default function FieldDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { notify } = useToast();
  const [field, setField] = useState<Field | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [eligibleBookings, setEligibleBookings] = useState<Booking[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("19:00");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadReviews = async () => {
    const result = await api<PageResponse<Review>>(`/fields/${params.id}/reviews?page=0&size=20`);
    setReviews(result.content);
  };

  useEffect(() => {
    Promise.all([
      api<Field>(`/fields/${params.id}`),
      api<PageResponse<Review>>(`/fields/${params.id}/reviews?page=0&size=20`),
    ]).then(([detail, reviewPage]) => {
      setField(detail);
      setReviews(reviewPage.content);
    }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (!user) { setEligibleBookings([]); return; }
    api<PageResponse<Booking>>("/bookings/my?page=0&size=50").then((result) => {
      setEligibleBookings(result.content.filter((item) => item.fieldId === Number(params.id) && ["CONFIRMED", "COMPLETED"].includes(item.status)));
    }).catch(() => setEligibleBookings([]));
  }, [user, params.id]);

  const book = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) { router.push("/login"); return; }
    if (endTime <= startTime) { notify("Giờ kết thúc phải sau giờ bắt đầu.", "error"); return; }
    setBusy(true);
    try {
      const result = await api<Booking>("/bookings", { method: "POST", body: { fieldId: Number(params.id), bookingDate: date, startTime, endTime } });
      notify("Đặt sân thành công. Đang chuyển tới thông tin lượt đặt.", "success");
      router.push(`/bookings/${result.id}`);
    } catch (reason) {
      const failure = reason as Error & { status?: number };
      notify(failure.status === 409 ? "Khung giờ này vừa được đặt. Hãy chọn giờ khác." : failure.message, "error");
    } finally { setBusy(false); }
  };

  const reviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api<Review>("/reviews", { method: "POST", body: { bookingId: Number(bookingId), rating: Number(rating), comment: comment.trim() || null } });
      notify("Cảm ơn bạn đã chia sẻ đánh giá.", "success");
      setComment("");
      await loadReviews();
    } catch (reason) { notify((reason as Error).message, "error"); }
  };

  if (loading) return <div className="page-wrap"><LoadingState label="Đang tải thông tin sân" /></div>;
  if (error || !field) return <div className="page-wrap"><ErrorState message={error || "Không tìm thấy sân."} retry={() => window.location.reload()} /></div>;
  const minDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  return (
    <div className="page-wrap">
      <div className="detail-layout">
        <div>
          <div className="detail-image" style={{ backgroundImage: `url("${field.imageUrl || fallbackImage}")` }} />
          <div className="detail-info">
            <span className="eyebrow">{field.fieldType?.name || "Sân bóng"}</span><h1>{field.name}</h1>
            <div className="detail-meta"><span><MapPin size={15} />{field.address}</span><span><Star size={15} fill="currentColor" color="#bd7a1e" />{field.averageRating != null ? `${field.averageRating.toFixed(1)} (${field.reviewCount || 0} đánh giá)` : "Chưa có đánh giá"}</span><span className={`status-dot ${field.status === "ACTIVE" ? "is-active" : "is-inactive"}`}>{field.status === "ACTIVE" ? "Đang mở đặt sân" : "Tạm ngưng đặt sân"}</span></div>
            <section style={{ padding: "25px 0 22px" }}><h2 className="section-title" style={{ fontSize: 21 }}>Về sân này</h2><p className="muted" style={{ whiteSpace: "pre-line" }}>{field.description || "Thông tin mô tả sân chưa được cập nhật."}</p><p className="muted" style={{ fontSize: 12 }}>Chủ sân: {field.owner?.fullName || "Đang cập nhật"}</p></section>
          </div>
          <section className="content-panel"><h2>Đánh giá từ người chơi</h2>
            {reviews.length ? <div className="review-list">{reviews.map((review) => <article className="review-row" key={review.id}><div className="review-head"><strong>{review.userFullName}</strong><span className="review-stars">{Array.from({ length: review.rating }, (_, index) => <Star key={index} size={13} fill="currentColor" />)}</span></div><p>{review.comment || "Người chơi chưa để lại nhận xét."}</p><small className="muted">{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(review.createdAt))}</small></article>)}</div> : <EmptyState title="Chưa có đánh giá" detail="Trở thành người đầu tiên chia sẻ trải nghiệm sân này." />}
          </section>
          {user && eligibleBookings.length > 0 && <form className="content-panel" style={{ marginTop: 18 }} onSubmit={reviewSubmit}><h2>Chia sẻ trải nghiệm</h2><div className="form-field"><label htmlFor="review-booking">Lượt đặt hợp lệ</label><select className="input-control" id="review-booking" required value={bookingId} onChange={(event) => setBookingId(event.target.value)}><option value="">Chọn lượt đặt</option>{eligibleBookings.map((item) => <option value={item.id} key={item.id}>#{item.id} · {formatDate(item.bookingDate)} · {statusLabel(item.status)}</option>)}</select></div><div className="form-field"><label htmlFor="rating">Điểm đánh giá</label><select className="input-control" id="rating" value={rating} onChange={(event) => setRating(event.target.value)}>{[5, 4, 3, 2, 1].map((score) => <option value={score} key={score}>{score} sao</option>)}</select></div><div className="form-field"><label htmlFor="comment">Nhận xét</label><textarea id="comment" rows={3} maxLength={1000} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Chia sẻ điều bạn thích về sân..." /></div><button className="button button-dark">Gửi đánh giá</button></form>}
          {user && eligibleBookings.length === 0 && <p className="muted" style={{ fontSize: 12, marginTop: 13 }}>Bạn có thể đánh giá khi lượt đặt được chủ sân xác nhận hoặc đã hoàn thành.</p>}
        </div>
        <form className="booking-panel" onSubmit={book}>
          <h2>Đặt sân này</h2><p className="booking-price"><strong>{formatPrice(field.pricePerHour)}</strong> / giờ</p>
          {field.status !== "ACTIVE" && <p className="form-error">Sân đang tạm ngưng nhận đặt chỗ.</p>}
          <div className="form-field"><label htmlFor="date"><CalendarDays size={14} style={{ verticalAlign: "-2px", marginRight: 5 }} />Ngày chơi</label><input id="date" type="date" required min={minDate} value={date} onChange={(event) => setDate(event.target.value)} /></div>
          <div className="form-field"><label htmlFor="start">Giờ bắt đầu</label><input id="start" type="time" required value={startTime} onChange={(event) => setStartTime(event.target.value)} /></div>
          <div className="form-field"><label htmlFor="end">Giờ kết thúc</label><input id="end" type="time" required value={endTime} onChange={(event) => setEndTime(event.target.value)} /></div>
          <div className="booking-summary"><span>Giá cuối cùng</span><strong>Backend sẽ tính</strong></div>
          <p className="muted" style={{ fontSize: 11 }}>Lịch trống không được cung cấp qua API; hệ thống sẽ xác nhận giờ còn chỗ khi bạn đặt.</p>
          <button className="button button-primary" style={{ width: "100%" }} disabled={busy || field.status !== "ACTIVE"}>{busy ? "Đang gửi yêu cầu..." : user ? "Gửi yêu cầu đặt sân" : "Đăng nhập để đặt sân"}</button>
          {!user && <p className="muted" style={{ fontSize: 11, textAlign: "center", margin: "12px 0 0" }}>Bạn cần đăng nhập trước khi đặt sân.</p>}
          <Link href="/fields" className="text-link" style={{ justifyContent: "center", width: "100%", marginTop: 16 }}>Quay lại danh sách</Link>
        </form>
      </div>
    </div>
  );
}