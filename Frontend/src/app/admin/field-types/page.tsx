"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";
import { api, statusLabel } from "@/lib/api";
import type { FieldType } from "@/lib/types";

function FieldTypesAdmin() {
  const [types, setTypes] = useState<FieldType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = () => { setLoading(true); api<FieldType[]>("/field-types").then(setTypes).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); };
  useEffect(load, []);
  return <AdminLayout><div className="admin-title-row"><div><span className="eyebrow">Cấu hình phân loại</span><h1>Loại sân</h1><p>Danh mục loại sân đang được sử dụng trên hệ thống.</p></div></div><div className="notice"><Info size={18} /><p>Backend hiện chỉ cung cấp API đọc loại sân (`GET /api/field-types`). Tạo, sửa và xóa loại sân chưa được hỗ trợ; danh mục này đang ở chế độ chỉ xem.</p></div>{loading ? <LoadingState label="Đang tải loại sân" /> : error ? <ErrorState message={error} retry={load} /> : types.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Mã</th><th>Tên loại sân</th><th>Mô tả</th><th>Trạng thái</th></tr></thead><tbody>{types.map((type) => <tr key={type.id}><td>#{type.id}</td><td className="table-primary">{type.name}</td><td>{type.description || "Chưa có mô tả"}</td><td><span className={`badge badge-${type.status}`}>{statusLabel(type.status)}</span></td></tr>)}</tbody></table></div> : <EmptyState title="Chưa có loại sân" />}</AdminLayout>;
}

export default function AdminFieldTypesPage() { return <FieldTypesAdmin />; }