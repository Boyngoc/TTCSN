"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/app/providers";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("registered") === "1") setNotice("Tài khoản đã được tạo. Đăng nhập để tiếp tục.");
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await signIn(email.trim(), password);
      router.push(user.role === "ADMIN" ? "/admin" : "/");
    } catch (reason) {
      setError(reason instanceof ApiError && reason.status === 401 ? "Email hoặc mật khẩu chưa chính xác." : (reason as Error).message);
    } finally { setBusy(false); }
  };

  return (
    <main className="auth-layout">
      <section className="auth-visual"><div><span className="eyebrow" style={{ color: "#d8f08d" }}>Gặp nhau trên sân</span><h2>Đội hình đủ rồi. Thiếu mỗi bạn.</h2><p>Đăng nhập để giữ lịch, theo dõi lượt đặt và hẹn trận tiếp theo.</p></div></section>
      <section className="auth-form-side"><form className="auth-form" onSubmit={submit}>
        <span className="eyebrow">Chào mừng trở lại</span><h1>Đăng nhập</h1><p>Dùng email và mật khẩu đã đăng ký.</p>
        {notice && <p className="success-note" role="status">{notice}</p>}
        <div className="form-field"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@email.com" /></div>
        <div className="form-field"><label htmlFor="password">Mật khẩu</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" /></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary form-submit" disabled={busy}>{busy ? "Đang đăng nhập..." : <>Vào sân <ArrowRight size={16} /></>}</button>
        <p className="auth-switch">Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link></p>
      </form></section>
    </main>
  );
}