"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";
import { api, queryString } from "@/lib/api";
import type { Field, FieldType, PageResponse } from "@/lib/types";
import { FieldCard } from "@/components/FieldCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/PageState";

type Filters = { keyword: string; address: string; fieldType: string; minPrice: string; maxPrice: string };

async function fetchFields(filters: Filters, page: number) {
  const query = queryString({ ...filters, page, size: 9 });
  return api<PageResponse<Field>>(`/fields?${query}`);
}

export default function FieldsPage() {
  const [filters, setFilters] = useState<Filters>({ keyword: "", address: "", fieldType: "", minPrice: "", maxPrice: "" });
  const [types, setTypes] = useState<FieldType[]>([]);
  const [results, setResults] = useState<PageResponse<Field> | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (nextFilters: Filters, nextPage: number) => {
    setLoading(true);
    setError("");
    try { setResults(await fetchFields(nextFilters, nextPage)); }
    catch (reason) { setError((reason as Error).message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = { keyword: params.get("keyword") || "", address: params.get("address") || "", fieldType: params.get("fieldType") || "", minPrice: params.get("minPrice") || "", maxPrice: params.get("maxPrice") || "" };
    setFilters(initial);
    api<FieldType[]>("/field-types").then((list) => setTypes(list.filter((type) => type.status === "ACTIVE"))).catch(() => setTypes([]));
    load(initial, 0);
  }, []);

  const update = (key: keyof Filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => { event.preventDefault(); setPage(0); load(filters, 0); };
  const changePage = (next: number) => { setPage(next); load(filters, next); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="page-wrap">
      <section className="page-intro"><div className="page-intro-row"><div><span className="eyebrow">Sân bóng quanh bạn</span><h1 className="page-title">Tìm sân để vào trận</h1><p className="section-copy">Lọc theo khu vực, loại sân và mức giá. Sân còn mở sẽ sẵn sàng cho lịch chơi của bạn.</p></div></div></section>
      <div className="filter-layout">
        <form className="filter-sidebar" onSubmit={submit}>
          <h3><SlidersHorizontal size={17} style={{ verticalAlign: "-3px", marginRight: 7 }} /> Bộ lọc</h3>
          <div className="filter-group"><label htmlFor="keyword">Từ khóa</label><input id="keyword" placeholder="Tên sân..." value={filters.keyword} onChange={(event) => update("keyword", event.target.value)} /></div>
          <div className="filter-group"><label htmlFor="address">Khu vực</label><input id="address" placeholder="Địa chỉ" value={filters.address} onChange={(event) => update("address", event.target.value)} /></div>
          <div className="filter-group"><label htmlFor="type">Loại sân</label><select id="type" value={filters.fieldType} onChange={(event) => update("fieldType", event.target.value)}><option value="">Tất cả</option>{types.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}</select></div>
          <div className="filter-group"><label>Giá / giờ</label><div className="price-range"><input aria-label="Giá tối thiểu" type="number" min="0" placeholder="Từ" value={filters.minPrice} onChange={(event) => update("minPrice", event.target.value)} /><input aria-label="Giá tối đa" type="number" min="0" placeholder="Đến" value={filters.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} /></div></div>
          <button className="button button-dark" style={{ width: "100%", minHeight: 42 }}>Áp dụng bộ lọc</button>
        </form>
        <section>
          <div className="results-head"><span>{loading ? "Đang tải..." : <><strong>{results?.totalElements ?? 0}</strong> sân phù hợp</>}</span><span>Trang {page + 1}{results?.totalPages ? ` / ${results.totalPages}` : ""}</span></div>
          {loading ? <LoadingState label="Đang tìm sân" /> : error ? <ErrorState message={error} retry={() => load(filters, page)} /> : results?.content.length ? <>
            <div className="field-grid">{results.content.map((field) => <FieldCard field={field} key={field.id} />)}</div>
            <div className="pagination"><button aria-label="Trang trước" disabled={page <= 0} onClick={() => changePage(page - 1)}><ArrowLeft size={16} /></button><span>{results.page + 1} / {Math.max(results.totalPages, 1)}</span><button aria-label="Trang sau" disabled={page + 1 >= results.totalPages} onClick={() => changePage(page + 1)}><ArrowRight size={16} /></button></div>
          </> : <EmptyState title="Không tìm thấy sân phù hợp" detail="Hãy thử điều chỉnh khu vực, loại sân hoặc khoảng giá." />}
        </section>
      </div>
    </div>
  );
}