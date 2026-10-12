"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { api, queryString } from "@/lib/api";
import type { Field, FieldType, PageResponse } from "@/lib/types";
import { FieldCard } from "@/components/FieldCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";

export default function HomePage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [types, setTypes] = useState<FieldType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");
  const [fieldType, setFieldType] = useState("");

  useEffect(() => {
    Promise.all([
      api<PageResponse<Field>>("/fields?page=0&size=3"),
      api<FieldType[]>("/field-types"),
    ]).then(([page, list]) => {
      setFields(page.content);
      setTypes(list.filter((item) => item.status === "ACTIVE"));
    }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = queryString({ keyword, address, fieldType });
    window.location.href = `/fields${params ? `?${params}` : ""}`;
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Bật mood. Ra sân.</span>
            <h1 className="display-title">Trận hay bắt đầu từ <em>một cú đặt.</em></h1>
            <p>Tìm sân bóng hợp đội, chọn khung giờ và giữ lịch chơi chỉ trong vài phút.</p>
            <div className="hero-actions">
              <Link href="/fields" className="button button-primary">Khám phá sân <ArrowUpRight size={17} /></Link>
              <Link href="/bookings" className="text-link">Lịch đặt của tôi <ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="Sân cỏ bóng đá">
            <div className="hero-photo" />
            <span className="hero-stamp">PLAY<br />TOGETHER</span>
            <div className="hero-note"><span className="hero-note-icon"><CalendarDays size={17} /></span><span><strong>Giờ đẹp, sân chất</strong><small>Đặt lịch theo kế hoạch của bạn</small></span></div>
          </div>
        </div>
      </section>
      <section className="search-strip">
        <form className="search-panel" onSubmit={search}>
          <label className="search-control"><MapPin size={18} /><input aria-label="Tên sân hoặc từ khóa" placeholder="Bạn muốn đá ở đâu?" value={keyword} onChange={(event) => setKeyword(event.target.value)} /></label>
          <label className="search-control"><MapPin size={18} /><input aria-label="Khu vực" placeholder="Khu vực / địa chỉ" value={address} onChange={(event) => setAddress(event.target.value)} /></label>
          <label className="search-control"><Sparkles size={18} /><select aria-label="Loại sân" value={fieldType} onChange={(event) => setFieldType(event.target.value)}><option value="">Tất cả loại sân</option>{types.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}</select></label>
          <button className="button button-dark">Tìm sân <ArrowRight size={16} /></button>
        </form>
      </section>
      <section className="trust-band">
        <div className="page-wrap trust-items">
          <div className="trust-item"><ShieldCheck className="trust-icon" size={20} /> Đặt sân trực tiếp, thông tin minh bạch</div>
          <div className="trust-item"><CalendarDays className="trust-icon" size={20} /> Quản lý lịch chơi trong một nơi</div>
          <div className="trust-item"><Sparkles className="trust-icon" size={20} /> Chọn sân phù hợp với đội của bạn</div>
        </div>
      </section>
      <section className="section page-wrap">
        <div className="section-heading">
          <div><span className="eyebrow">Sân đang được quan tâm</span><h2 className="section-title">Tìm điểm hẹn tiếp theo</h2><p className="section-copy">Chọn mặt sân, rủ đồng đội và dành chỗ cho trận đấu sắp tới.</p></div>
          <Link href="/fields" className="text-link">Xem tất cả sân <ArrowRight size={15} /></Link>
        </div>
        {loading ? <LoadingState label="Đang tìm sân phù hợp" /> : error ? <ErrorState message={error} retry={() => window.location.reload()} /> : fields.length ? <div className="field-grid">{fields.map((field) => <FieldCard field={field} key={field.id} />)}</div> : <EmptyState title="Chưa có sân để hiển thị" />}
      </section>
    </>
  );
}