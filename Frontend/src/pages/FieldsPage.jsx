import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FieldCard from '../components/FieldCard.jsx'
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { useFieldTypes, useFields } from '../hooks/useApi.js'

const emptyFilters = { keyword: '', address: '', fieldType: '', minPrice: '', maxPrice: '' }

export default function FieldsPage() {
  const [searchParams] = useSearchParams()
  const initialFilters = { ...emptyFilters, keyword: searchParams.get('keyword') || '' }
  const [filters, setFilters] = useState(initialFilters)
  const [applied, setApplied] = useState(initialFilters)
  const [page, setPage] = useState(0)
  const [filterError, setFilterError] = useState('')
  const types = useFieldTypes()
  const fields = useFields({ ...applied, page, size: 9 })

  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    if (filters.minPrice && filters.maxPrice && Number(filters.minPrice) > Number(filters.maxPrice)) {
      setFilterError('Giá tối thiểu không thể lớn hơn giá tối đa.')
      return
    }
    setFilterError('')
    setPage(0)
    setApplied(filters)
  }

  const clearFilters = () => {
    setFilters(emptyFilters)
    setApplied(emptyFilters)
    setPage(0)
    setFilterError('')
  }

  return (
    <div className="page-wrap">
      <PageHeading
        eyebrow="Danh sách sân"
        title="Tìm sân phù hợp"
        description="Lọc sân theo thông tin thực tế từ hệ thống. Giá được hiển thị theo từng sân."
      />

      <form onSubmit={submit} className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-pitch-50 text-pitch-700"><SlidersHorizontal size={17} /></span>
            Bộ lọc sân bóng
          </div>
          <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
            <X size={14} /> Xóa bộ lọc
          </button>
        </div>
        {types.isError && <p className="mb-3 text-sm text-red-700" role="alert">Không tải được danh mục loại sân: {types.error?.response?.data?.message || 'hãy thử tải lại trang.'}</p>}
        {filterError && <p className="mb-3 text-sm text-red-700" role="alert">{filterError}</p>}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <label className="field-label lg:col-span-2">Từ khóa<input className="input-control" placeholder="Tên sân..." value={filters.keyword} onChange={(event) => update('keyword', event.target.value)} /></label>
          <label className="field-label lg:col-span-2">Khu vực<input className="input-control" placeholder="Quận, thành phố..." value={filters.address} onChange={(event) => update('address', event.target.value)} /></label>
          <label className="field-label">Loại sân<select className="input-control" value={filters.fieldType} onChange={(event) => update('fieldType', event.target.value)}><option value="">Tất cả</option>{types.data?.map((type) => <option key={type.id} value={type.id} disabled={type.status !== 'ACTIVE'}>{type.name}{type.status !== 'ACTIVE' ? ' (Tạm ngưng)' : ''}</option>)}</select></label>
          <div className="grid grid-cols-2 gap-2">
            <label className="field-label">Giá từ<input className="input-control" type="number" min="0" placeholder="0" value={filters.minPrice} onChange={(event) => update('minPrice', event.target.value)} /></label>
            <label className="field-label">Đến<input className="input-control" type="number" min="0" placeholder="—" value={filters.maxPrice} onChange={(event) => update('maxPrice', event.target.value)} /></label>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="btn-primary w-full sm:w-auto" type="submit"><Search size={17} /> Áp dụng bộ lọc</button>
        </div>
      </form>

      {fields.isLoading ? <Loading label="Đang tải danh sách sân..." /> : fields.isError ? (
        <ErrorMessage message={fields.error?.response?.data?.message || 'Không tải được danh sách sân.'} onRetry={fields.refetch} />
      ) : fields.data?.content?.length ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <span><strong className="text-slate-800">{fields.data.totalElements}</strong> sân phù hợp</span>
            <span>Trang {fields.data.page + 1} / {Math.max(fields.data.totalPages, 1)}</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fields.data.content.map((field) => <FieldCard key={field.id} field={field} />)}
          </div>
          {fields.data.totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button type="button" className="btn-secondary" disabled={page <= 0} onClick={() => setPage((current) => current - 1)}>Trang trước</button>
              <span className="text-sm text-slate-500">Trang {fields.data.page + 1} / {fields.data.totalPages}</span>
              <button type="button" className="btn-secondary" disabled={page + 1 >= fields.data.totalPages} onClick={() => setPage((current) => current + 1)}>Trang sau</button>
            </div>
          )}
        </>
      ) : (
        <EmptyState title="Chưa tìm thấy sân phù hợp">Thử thay đổi từ khóa hoặc bộ lọc.</EmptyState>
      )}
    </div>
  )
}
