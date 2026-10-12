"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/app/providers";
import { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (form.phone && !/^0\d{9}$/.test(form.phone)) { setError("Số điện thoại cần gồm 10 chữ số và bắt đầu bằng 0."); return; }
    setBusy(true);
    try {
      await signUp({ ...form, fullName: form.fullName.trim(), email: form.email.trim() });
      router.push("/login?registered=1");
    } catch (reason) {
      setError(reason instanceof ApiError && reason.status === 409 ? "Email này đã được sử dụng." : (reason as Error).message);
    } finally { setBusy(false); }
  };

  return (
    <main className="auth-layout">
      <section className="auth-visual"><div><span className="eyebrow" style={{ color: "#d8f08d" }}>Tạo tài khoản miễn phí</span><h2>Thêm một đồng đội vào mọi trận đấu.</h2><p>Lưu lịch sử đặt sân và quay lại với những sân bạn yêu thích.</p></div></section>
      <section className="auth-form-side"><form className="auth-form" onSubmit={submit}>
        <span className="eyebrow">Bắt đầu chơi</span><h1>Tạo tài khoản</h1><p>Đăng ký để đặt sân và quản lý lịch chơi.</p>
        <div className="form-field"><label htmlFor="fullName">Họ và tên</label><input id="fullName" autoComplete="name" required value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Tên của bạn" /></div>
        <div className="form-field"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="ban@email.com" /></div>
        <div className="form-field"><label htmlFor="phone">Số điện thoại <span className="muted">(không bắt buộc)</span></label><input id="phone" type="tel" autoComplete="tel" inputMode="numeric" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="0912345678" /></div>
        <div className="form-field"><label htmlFor="password">Mật khẩu</label><input id="password" type="password" autoComplete="new-password" required minLength={6} value={form.password} onChange={(event) => update("password", event.target.value)} placeholder="Ít nhất 6 ký tự" /><small>Backend yêu cầu tối thiểu 6 ký tự.</small></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary form-submit" disabled={busy}>{busy ? "Đang tạo tài khoản..." : <>Tạo tài khoản <ArrowRight size={16} /></>}</button>
        <p className="auth-switch">Đã có tài khoản? <Link href="/login">Đăng nhập</Link></p>
      </form></section>
    </main>
  );
}