"use client";

import { useEffect, useState } from "react";
import { Check, UserRound } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth, useToast } from "@/app/providers";
import { AuthGate } from "@/components/AuthGate";
import { ErrorState, LoadingState } from "@/components/PageState";

function ProfileForm() {
  const { user, refreshProfile } = useAuth();
  const { notify } = useToast();
  const [form, setForm] = useState({ fullName: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api<typeof user>("/users/me").then((profile) => setForm({ fullName: profile?.fullName || "", phone: profile?.phone || "" })).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.phone && !/^0\d{9}$/.test(form.phone)) { setError("Số điện thoại cần gồm 10 chữ số và bắt đầu bằng 0."); return; }
    setBusy(true); setError("");
    try { await api("/users/me", { method: "PUT", body: { fullName: form.fullName.trim(), phone: form.phone || null } }); await refreshProfile(); notify("Hồ sơ đã được cập nhật.", "success"); }
    catch (reason) { setError((reason as Error).message); }
    finally { setBusy(false); }
  };

  if (loading) return <LoadingState label="Đang tải hồ sơ" />;
  if (error && !user) return <ErrorState message={error} />;
  return <div className="page-wrap"><section className="page-intro"><span className="eyebrow">Tài khoản của bạn</span><h1 className="page-title">Hồ sơ cá nhân</h1><p className="section-copy">Cập nhật thông tin liên hệ của bạn.</p></section><div className="profile-layout"><aside className="profile-card"><div className="profile-avatar">{user?.fullName.slice(0, 1).toLocaleUpperCase("vi-VN")}</div><h2>{user?.fullName}</h2><p>{user?.email}</p><span className="badge">{user?.role === "ADMIN" ? "Quản trị viên" : user?.role === "OWNER" ? "Chủ sân" : "Người chơi"}</span></aside><section className="content-panel"><h2>Thông tin cá nhân</h2><form className="profile-form" onSubmit={submit}><div className="form-field"><label htmlFor="profile-name">Họ và tên</label><input id="profile-name" required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></div><div className="form-field"><label htmlFor="profile-email">Email</label><input id="profile-email" disabled value={user?.email || ""} /><small>Email không thể thay đổi qua API hồ sơ.</small></div><div className="form-field"><label htmlFor="profile-phone">Số điện thoại</label><input id="profile-phone" type="tel" inputMode="numeric" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="0912345678" /><small>Để trống nếu chưa muốn thêm số điện thoại.</small></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" disabled={busy}>{busy ? "Đang lưu..." : <><Check size={16} /> Lưu thay đổi</>}</button><p className="muted" style={{ fontSize: 11, marginTop: 18 }}><UserRound size={14} style={{ verticalAlign: "-3px", marginRight: 5 }} />Đổi mật khẩu hiện chưa được hỗ trợ bởi API backend.</p></form></section></div></div>;
}

export default function ProfilePage() { return <AuthGate><ProfileForm /></AuthGate>; }