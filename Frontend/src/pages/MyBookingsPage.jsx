import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookingService from '../services/bookingService';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Ban, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trạng thái hủy đơn
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelMessage, setCancelMessage] = useState({ text: '', type: '' });

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getMyBookings(0, 20);
      setBookings(response.data?.content || []);
    } catch (err) {
      setError(err.message || 'Không thể tải lịch sử đặt sân.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm(`Bạn có chắc chắn muốn hủy đơn đặt sân #${bookingId}?`)) {
      return;
    }

    setCancellingId(bookingId);
    setCancelMessage({ text: '', type: '' });

    try {
      await bookingService.cancelBooking(bookingId);
      setCancelMessage({ text: `Đã hủy thành công đơn đặt sân #${bookingId}.`, type: 'success' });
      // Tải lại danh sách
      await fetchBookings();
    } catch (err) {
      setCancelMessage({ text: err.message || 'Không thể hủy đơn đặt sân.', type: 'error' });
    } finally {
      setCancellingId(null);
    }
  };

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" /> Chờ xác nhận
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" /> Đã xác nhận
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600" /> Đã hoàn thành
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold flex items-center gap-1">
            <Ban className="w-3 h-3 text-rose-600" /> Đã hủy
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3 text-slate-500" /> Bị từ chối
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Lịch Sử Đơn Đặt Sân Của Tôi
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Theo dõi trạng thái các lượt đặt sân, duyệt đơn từ chủ sân và thao tác hủy đơn
        </p>
      </div>

      {/* Cancel Message */}
      {cancelMessage.text && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            cancelMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {cancelMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-600" />
          )}
          <span>{cancelMessage.text}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Đang tải danh sách đơn đặt của bạn...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="font-bold text-red-800 text-base">Lỗi khi tải lịch sử đơn</h3>
          <p className="text-xs text-red-600">{error}</p>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            Thử Lại
          </button>
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';

            return (
              <div
                key={booking.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Booking Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">#{booking.id}</span>
                    <Link
                      to={`/fields/${booking.fieldId}`}
                      className="font-bold text-base sm:text-lg text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      {booking.fieldName}
                    </Link>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Ngày: <b>{booking.bookingDate}</b></span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>Giờ: <b>{booking.startTime} - {booking.endTime}</b></span>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>{formatVND(booking.totalPrice)}</span>
                    </div>
                  </div>

                  {booking.createdAt && (
                    <p className="text-[10px] text-slate-400">
                      Tạo lúc: {new Date(booking.createdAt).toLocaleString('vi-VN')}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <Link
                    to={`/fields/${booking.fieldId}`}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Xem Sân
                  </Link>

                  {canCancel && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 hover:border-transparent text-xs font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      {cancellingId === booking.id ? 'Đang hủy...' : 'Hủy Đơn'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-2xl border border-dashed border-slate-300 text-center space-y-4">
          <p className="text-slate-500 text-sm">Bạn chưa có lượt đặt sân nào.</p>
          <Link
            to="/fields"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow-md transition-all"
          >
            <span>Tìm Sân & Đặt Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
