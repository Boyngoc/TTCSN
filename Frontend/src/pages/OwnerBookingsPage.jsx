import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ownerService from '../services/ownerService';
import { 
  ClipboardCheck, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Building2, 
  Search, 
  Filter, 
  DollarSign, 
  Loader2, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // State Dialog Duyệt / Từ chối
  const [actionConfirm, setActionConfirm] = useState(null); // { type: 'confirm'|'reject', booking: {...} }
  const [actionLoading, setActionLoading] = useState(false);

  // Phân trang
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ownerService.getOwnerBookings(page, 15, statusFilter);
      if (res?.data) {
        setBookings(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || 0);
      }
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách đơn đặt sân.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter]);

  // Xử lý xác nhận hoặc từ chối
  const handleExecuteAction = async () => {
    if (!actionConfirm) return;
    const { type, booking } = actionConfirm;
    setActionLoading(true);

    try {
      if (type === 'confirm') {
        const res = await ownerService.confirmBooking(booking.id);
        showToast(res.message || `Đã xác nhận đơn đặt #${booking.id}!`);
      } else {
        const res = await ownerService.rejectBooking(booking.id);
        showToast(res.message || `Đã từ chối đơn đặt #${booking.id}!`, 'error');
      }

      setActionConfirm(null);
      fetchBookings();
    } catch (err) {
      showToast(err.message || 'Thao tác không thành công. Vui lòng thử lại.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const formatVND = (price) => {
    if (!price) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Đếm nhanh số đơn PENDING
  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;

  // Lọc theo search keyword
  const filteredBookings = bookings.filter((b) => {
    if (!searchKeyword.trim()) return true;
    const kw = searchKeyword.toLowerCase();
    return (
      b.id?.toString().includes(kw) ||
      b.userFullName?.toLowerCase().includes(kw) ||
      b.fieldName?.toLowerCase().includes(kw) ||
      b.userPhone?.includes(kw)
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Chờ Chủ Sân Duyệt
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Đã Xác Nhận
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Đã Từ Chối
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            Khách Đã Hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold transition-all transform animate-bounce ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
            Quản Lý Đặt Sân
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Duyệt & Quản Lý Đơn Đặt Sân
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Xác nhận hoặc từ chối lịch đặt của khách hàng trên tất cả các sân của bạn theo thời gian thực.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/owner/fields"
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            Quản lý sân bóng &rarr;
          </Link>
        </div>
      </div>

      {/* Bộ lọc Tabs trạng thái */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'ALL', label: 'Tất cả đơn' },
          { key: 'PENDING', label: 'Chờ duyệt', highlight: pendingCount > 0 },
          { key: 'CONFIRMED', label: 'Đã xác nhận' },
          { key: 'REJECTED', label: 'Đã từ chối' },
          { key: 'CANCELLED', label: 'Đã hủy' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatusFilter(tab.key);
              setPage(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              statusFilter === tab.key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.key === 'PENDING' && pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tìm kiếm */}
      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn (#ID), tên khách, số điện thoại..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Tổng số: <strong>{filteredBookings.length}</strong> đơn
        </span>
      </div>

      {/* Danh sách Đơn Đặt Sân */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Đang tải danh sách đơn đặt sân...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-3xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
          <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Không có đơn đặt sân nào</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Không tìm thấy lượt đặt sân nào với bộ lọc hiện tại. Khi có khách đặt lịch, đơn mới sẽ hiển thị tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-sm transition-all hover:shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 ${
                b.status === 'PENDING'
                  ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20'
                  : 'border-slate-200/80'
              }`}
            >
              {/* Cột trái: Mã đơn, Sân & Khách */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    #{b.id}
                  </span>
                  {getStatusBadge(b.status)}
                </div>

                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {b.fieldName || 'Sân bóng'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
                    <div className="flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.userFullName || 'Khách vãng lai'}</span>
                    </div>
                    {b.userPhone && (
                      <a
                        href={`tel:${b.userPhone}`}
                        className="flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {b.userPhone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Cột giữa: Lịch đá & Giá tiền */}
              <div className="flex flex-wrap items-center gap-6 py-2 lg:py-0 border-y lg:border-y-0 border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Ngày thi đấu
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{b.bookingDate}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Khung giờ
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>
                      {b.startTime?.slice(0, 5)} - {b.endTime?.slice(0, 5)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Tổng tiền
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    {formatVND(b.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Cột phải: Thao tác Duyệt / Từ chối */}
              <div className="flex items-center gap-2 shrink-0">
                {b.status === 'PENDING' ? (
                  <>
                    <button
                      onClick={() => setActionConfirm({ type: 'reject', booking: b })}
                      className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4 text-red-600" />
                      Từ Chối
                    </button>
                    <button
                      onClick={() => setActionConfirm({ type: 'confirm', booking: b })}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Chấp Nhận Đơn
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Đã hoàn tất xử lý
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700">
            Trang {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal Xác nhận Duyệt / Từ chối */}
      {actionConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
                actionConfirm.type === 'confirm' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}
            >
              {actionConfirm.type === 'confirm' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                {actionConfirm.type === 'confirm'
                  ? 'Xác Nhận Nhận Lịch Đặt Sân?'
                  : 'Từ Chối Đơn Đặt Sân Này?'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đơn <strong>#{actionConfirm.booking.id}</strong> - Sân{' '}
                <strong>{actionConfirm.booking.fieldName}</strong> vào ngày{' '}
                <strong>{actionConfirm.booking.bookingDate}</strong> (
                {actionConfirm.booking.startTime?.slice(0, 5)} - {actionConfirm.booking.endTime?.slice(0, 5)}).
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setActionConfirm(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Đóng
              </button>
              <button
                onClick={handleExecuteAction}
                disabled={actionLoading}
                className={`px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-60 ${
                  actionConfirm.type === 'confirm'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                }`}
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {actionConfirm.type === 'confirm' ? 'Đồng Ý Nhận Đơn' : 'Xác Nhận Từ Chối'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerBookingsPage;

