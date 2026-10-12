"use client";

import { useEffect, useState } from "react";
import { Check, CircleX, Plus } from "lucide-react";
import { OwnerLayout } from "@/components/OwnerLayout";
import { useToast } from "@/app/providers";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";
import { api, formatDate, formatPrice, statusLabel } from "@/lib/api";
import type { ActiveStatus, Booking, Field, FieldType, PageResponse } from "@/lib/types";

function OwnerDashboard() {
  const { notify } = useToast();
  const [fields, setFields] = useState<Field[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [types, setTypes] = useState<FieldType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fieldTypeId: "", name: "", address: "", description: "", pricePerHour: "", imageUrl: "" });

  const load = () => {
    setLoading(true); setError("");
    Promise.all([api<PageResponse<Field>>("/owner/fields?page=0&size=50"), api<PageResponse<Booking>>("/owner/bookings?page=0&size=50"), api<FieldType[]>("/field-types")])
      .then(([myFields, myBookings, fieldTypes]) => { setFields(myFields.content); setBookings(myBookings.content); setTypes(fieldTypes.filter((item) => item.status === "ACTIVE")); })
      .catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const createField = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api<Field>("/owner/fields", { method: "POST", body: { ...form, fieldTypeId: Number(form.fieldTypeId), pricePerHour: Number(form.pricePerHour), imageUrl: form.imageUrl || null } });
      notify("Đã thêm sân của bạn.", "success"); setShowForm(false); load();
    } catch (reason) { notify((reason as Error).message, "error"); }
  };

  const updateFieldStatus = async (field: Field, status: ActiveStatus) => {
    try {
      const updated = await api<Field>(`/owner/fields/${field.id}`, { method: "PUT", body: { fieldTypeId: field.fieldType.id, name: field.name, address: field.address, description: field.description, pricePerHour: field.pricePerHour, imageUrl: field.imageUrl, status } });
      setFields((items) => items.map((item) => item.id === field.id ? updated : item)); notify("Đã cập nhật trạng thái sân.", "success");
    } catch (reason) { notify((reason as Error).message, "error"); }
  };

  const respond = async (booking: Booking, action: "confirm" | "reject") => {
    try {
      const updated = await api<Booking>(`/owner/bookings/${booking.id}/${action}`, { method: "POST" });
      setBookings((items) => items.map((item) => item.id === booking.id ? updated : item));
      notify(action === "confirm" ? "Đã xác nhận lượt đặt." : "Đã từ chối lượt đặt.", "success");
    } catch (reason) { notify((reason as Error).message, "error"); }
  };

  if (loading) return <div className="page-wrap"><LoadingState label="Đang tải khu vực chủ sân" /></div>;
  if (error) return <div className="page-wrap"><ErrorState message={error} retry={load} /></div>;
  return <div className="page-wrap owner-main"><div className="admin-title-row"><div><span className="eyebrow">Dành cho chủ sân</span><h1>Quản lý sân</h1><p>Cập nhật sân của bạn và xử lý yêu cầu đặt chỗ.</p></div><button className="button button-primary button-small" onClick={() => setShowForm(!showForm)}><Plus size={15} /> Thêm sân</button></div>
    <div className="metric-grid"><div className="metric-card"><span>Sân của tôi</span><strong>{fields.length}</strong></div><div className="metric-card"><span>Chờ xác nhận</span><strong>{bookings.filter((item) => item.status === "PENDING").length}</strong></div><div className="metric-card"><span>Tổng lượt đặt</span><strong>{bookings.length}</strong></div><div className="metric-card"><span>Doanh thu</span><small>Backend chưa có thống kê riêng theo chủ sân.</small></div></div>
    {showForm && <form className="content-panel create-field-form" onSubmit={createField}><h2>Thêm sân mới</h2><div className="form-grid"><div className="form-field"><label>Tên sân</label><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div><div className="form-field"><label>Loại sân</label><select required value={form.fieldTypeId} onChange={(event) => setForm({ ...form, fieldTypeId: event.target.value })}><option value="">Chọn loại sân</option>{types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}</select></div><div className="form-field"><label>Địa chỉ</label><input required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></div><div className="form-field"><label>Giá / giờ</label><input type="number" required min="1" value={form.pricePerHour} onChange={(event) => setForm({ ...form, pricePerHour: event.target.value })} /></div><div className="form-field form-grid-wide"><label>Mô tả</label><textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></div><div className="form-field form-grid-wide"><label>URL hình ảnh</label><input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></div></div><button className="button button-primary"><Check size={15} /> Tạo sân</button></form>}
    <section className="content-panel"><div className="field-admin-top"><h2 style={{ margin: 0 }}>Sân của tôi</h2><span className="muted" style={{ fontSize: 11 }}>{fields.length} sân</span></div>{fields.length ? <div className="data-table-wrap" style={{ border: 0 }}><table className="data-table"><thead><tr><th>Sân</th><th>Loại</th><th>Giá / giờ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{fields.map((field) => <tr key={field.id}><td className="table-primary">{field.name}<span className="table-secondary">{field.address}</span></td><td>{field.fieldType.name}</td><td>{formatPrice(field.pricePerHour)}</td><td><span className={`badge badge-${field.status}`}>{statusLabel(field.status)}</span></td><td><button className="button button-outline button-small" onClick={() => updateFieldStatus(field, field.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")}>{field.status === "ACTIVE" ? "Tạm ngưng" : "Kích hoạt"}</button></td></tr>)}</tbody></table></div> : <EmptyState title="Chưa có sân" detail="Thêm sân đầu tiên để nhận yêu cầu đặt chỗ." />}</section>
    <section className="content-panel"><div className="field-admin-top"><h2 style={{ margin: 0 }}>Yêu cầu đặt sân</h2><span className="muted" style={{ fontSize: 11 }}>Xác nhận hoặc từ chối lượt đặt</span></div>{bookings.length ? <div className="data-table-wrap" style={{ border: 0 }}><table className="data-table"><thead><tr><th>Người đặt</th><th>Sân</th><th>Ngày / giờ</th><th>Giá</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td className="table-primary">{booking.userFullName}<span className="table-secondary">#{booking.id}</span></td><td>{booking.fieldName}</td><td>{formatDate(booking.bookingDate)}<span className="table-secondary">{booking.startTime} – {booking.endTime}</span></td><td>{formatPrice(booking.totalPrice)}</td><td><span className={`badge badge-${booking.status}`}>{statusLabel(booking.status)}</span></td><td>{booking.status === "PENDING" ? <div style={{ display: "flex", gap: 6 }}><button className="button button-primary button-small" aria-label="Xác nhận" onClick={() => respond(booking, "confirm")}><Check size={14} /></button><button className="button button-danger button-small" aria-label="Từ chối" onClick={() => respond(booking, "reject")}><CircleX size={14} /></button></div> : "—"}</td></tr>)}</tbody></table></div> : <EmptyState title="Chưa có yêu cầu đặt sân" />}</section>
  </div>;
}

export default function OwnerPage() { return <OwnerLayout><OwnerDashboard /></OwnerLayout>; }