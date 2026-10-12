import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-inner">
        <div>
          <Link href="/" className="brand"><span className="brand-mark"><span /></span><span>SÂN NHÀ<span className="brand-period">.</span></span></Link>
          <p>Cuộc hẹn trên sân cỏ bắt đầu từ một cú chạm. Tìm sân hợp gu, đặt lịch gọn gàng.</p>
        </div>
        <nav className="footer-links" aria-label="Liên kết cuối trang">
          <Link href="/fields">Khám phá sân</Link>
          <Link href="/bookings">Lịch đặt của tôi</Link>
          <Link href="/profile">Tài khoản</Link>
        </nav>
      </div>
      <div className="page-wrap" style={{ borderTop: "1px solid rgba(255,255,255,.14)", marginTop: 30, paddingTop: 17, color: "#aebeb2", fontSize: 10 }}>© {new Date().getFullYear()} Sân Nhà · Football Booking</div>
    </footer>
  );
}