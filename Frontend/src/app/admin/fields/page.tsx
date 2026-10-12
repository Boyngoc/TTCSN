"use client";

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";
import { useToast } from "@/app/providers";
import { api, formatPrice, statusLabel } from "@/lib/api";
import type { ActiveStatus, Field, FieldType, PageResponse } from "@/lib/types";

function FieldsAdmin() {
  const { notify } = useToast();
  const [result, setResult] = useState<PageResponse<Field> | null>(null);
  const [types, setTypes] = useState<FieldType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ fieldTypeId: "", name: "", address: "", description: "", pricePerHour: "", imageUrl: "" });

  const load = () => {
    setLoading(true); setError("");
    Promise.all([api<PageResponse<Field>>("/admin/fields?page=0&size=50"), api<FieldType[]>("/field-types")])
      .then(([fields, fieldTypes]) => { setResult(fields); setTypes(fieldTypes); })
      .catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);
  const setStatus = async (field: Field, status: ActiveStatus) => {
    try {
      const updated = await api<Field>(`/admin/fields/${field.id}/status`, { method: "PUT", body: { status } });
      setResult((current) => current ? { ...current, content: current.content.map((item) => item.id === field.id ? updated : item) } : current);
      notify("Đã cập nhật trạng thái sân.", "success");
    } catch (reason) { notify((reason as Error).message, "error"); }
  };
  const create = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true);
    try {
      await api<Field>("/fields", { method: "POST", body: { ...form, fieldTypeId: Number(form.fieldTypeId), pricePerHour: Number(form.pricePerHour), imageUrl: form.imageUrl || null } });
      notify("Đã tạo sân mới.", "success"); setShowForm(false); setForm({ fieldTypeId: "", name: "", address: "", description: "", pricePerHour: "", imageUrl: "" }); load();
    } catch (reason) { notify((reason as Error).message, "error"); }
    finally { setBusy(false); }
  };

  return <AdminLayout><div className="admin-title-row"><div><span className="eyebrow">Danh mục cơ sở</span><h1>Quản lý sân bóng</h1><p>Tạo sân mới và bật/tạm ngưng nhận đặt chỗ.</p></div><button className="button button-primary button-small" onClick={() => setShowForm(!showForm)}><Plus size={15} /> Thêm sân</button></div>
    {showForm && <form className="content-panel create-field-form" onSubmit={create}><h2>Thông tin sân mới</h2><div className="form-grid"><div className="form-field"><label>Tên sân</label><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div><div className="form-field"><label>Loại sân</label><select required value={form.fieldTypeId} onChange={(event) => setForm({ ...form, fieldTypeId: event.target.value })}><option value="">Chọn loại sân</option>{types.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}</select></div><div className="form-field"><label>Địa chỉ</label><input required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></div><div className="form-field"><label>Giá thuê / giờ</label><input required type="number" min="1" step="1000" value={form.pricePerHour} onChange={(event) => setForm({ ...form, pricePerHour: event.target.value })} /></div><div className="form-field form-grid-wide"><label>Mô tả</label><textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></div><div className="form-field form-grid-wide"><label>URL hình ảnh <span className="muted">(không bắt buộc)</span></label><input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></div></div><button className="button button-primary" disabled={busy}>{busy ? "Đang tạo..." : <><Check size={16} /> Tạo sân</>}</button></form>}
    {loading ? <LoadingState label="Đang tải danh sách sân" /> : error ? <ErrorState message={error} retry={load} /> : result?.content.length ? <><div className="results-head" style={{ marginTop: 18 }}><span><strong>{result.totalElements}</strong> sân</span><span>Chủ sở hữu và trạng thái</span></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Sân</th><th>Loại</th><th>Chủ sân</th><th>Giá / giờ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{result.content.map((field) => <tr key={field.id}><td><span className="table-primary">{field.name}</span><span className="table-secondary">{field.address}</span></td><td>{field.fieldType?.name}</td><td>{field.owner?.fullName}</td><td>{formatPrice(field.pricePerHour)}</td><td><span className={`badge badge-${field.status}`}>{statusLabel(field.status)}</span></td><td><button className="button button-outline button-small" onClick={() => setStatus(field, field.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")}>{field.status === "ACTIVE" ? "Tạm ngưng" : "Kích hoạt"}</button></td></tr>)}</tbody></table></div></> : <EmptyState title="Chưa có sân bóng" detail="Tạo sân đầu tiên để bắt đầu nhận đặt chỗ." />}
  </AdminLayout>;
}

export default function AdminFieldsPage() { return <FieldsAdmin />; }