import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';
import fieldService from '../services/fieldService';
import { 
  X, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Loader2,
  DollarSign
} from 'lucide-react';

const BookingModal = ({ field, isOpen, onClose, onSuccess }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Ngày hiện tại định dạng YYYY-MM-DD cho input min
  const today = new Date().toISOString().split('T')[0];

  const [bookingDate, setBookingDate] = useState(today);
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('19:30');
  
  // Trạng thái booked slots từ Backend cho ngày đã chọn
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Trạng thái submit
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Lấy các khung giờ đã bị đặt khi mở modal hoặc khi đổi ngày
  useEffect(() => {
    if (isOpen && field?.id && bookingDate) {
      fetchBookedSlots(field.id, bookingDate);
    }
  }, [isOpen, field?.id, bookingDate]);

  const fetchBookedSlots = async (fieldId, date) => {
    setLoadingSlots(true);
    try {
      const response = await fieldService.getBookedSlots(fieldId, { date });
      setBookedSlots(response.data || []);
    } catch (err) {
      console.warn('Không thể tải danh sách khung giờ đã đặt:', err);
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Tính toán thời lượng (giờ) và tạm tính tổng tiền
  const calculateDurationAndPrice = () => {
    if (!startTime || !endTime) return { durationHours: 0, estimatedPrice: 0 };

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startTotalMinutes = startH * 60 + startM;
    const endTotalMinutes = endH * 60 + endM;

    const diffMinutes = endTotalMinutes - startTotalMinutes;
    if (diffMinutes <= 0) return { durationHours: 0, estimatedPrice: 0 };

    const durationHours = diffMinutes / 60;
    const pricePerHour = Number(field?.pricePerHour) || 0;
    const estimatedPrice = Math.round(durationHours * pricePerHour);

    return { durationHours, estimatedPrice };
  };

  const { durationHours, estimatedPrice } = calculateDurationAndPrice();

  // Kiểm tra trùng lịch ở phía Client trước khi gửi
  const isTimeOverlap = () => {
    return bookedSlots.some((slot) => {
      // Logic overlap: start < slot.endTime && end > slot.startTime
      return startTime < slot.endTime && endTime > slot.startTime;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Nếu chưa đăng nhập, hướng dẫn người dùng sang login
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/fields/${field.id}` } });
      return;
    }

    if (durationHours <= 0) {
      setErrorMessage('Giờ kết thúc phải sau giờ bắt đầu ít nhất 30 phút.');
      return;
    }

    if (isTimeOverlap()) {
      setErrorMessage('Khung giờ bạn chọn đang trùng với một đơn đặt sân khác. Vui lòng chọn khung giờ trống!');
      return;
    }

    setSubmitting(true);
    try {
      const requestData = {
        fieldId: field.id,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
      };

      const response = await bookingService.createBooking(requestData);
      setSuccessData(response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      if (error.status === 409) {
        setErrorMessage('Rất tiếc! Khung giờ này vừa có người đặt hoặc đang giữ chỗ (409 Conflict). Vui lòng chọn giờ khác.');
      } else {
        setErrorMessage(error.message || 'Không thể tạo đơn đặt sân. Vui lòng thử lại.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 to-green-600 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Đặt Lịch Sân Bóng</h3>
            <p className="text-emerald-100 text-xs mt-0.5 line-clamp-1">{field?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {successData ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Đặt Sân Thành Công!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Đơn đặt sân mã <b>#{successData.id}</b> đã được gửi tới chủ sân ở trạng thái 
                <span className="inline-block ml-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                  {successData.status}
                </span>.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ngày đặt:</span>
                  <span className="font-semibold text-slate-800">{successData.bookingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Khung giờ:</span>
                  <span className="font-semibold text-slate-800">{successData.startTime} - {successData.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tổng tiền tạm tính:</span>
                  <span className="font-bold text-emerald-600 text-sm">{formatVND(successData.totalPrice)}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
                >
                  Xem Đơn Của Tôi
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Thông tin đơn giá sân */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-sm border border-slate-100">
                <span className="text-slate-600">Đơn giá thuê:</span>
                <span className="font-bold text-emerald-700">
                  {formatVND(field?.pricePerHour)} / giờ
                </span>
              </div>

              {/* Chọn Ngày đặt */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ngày đặt sân <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={today}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Danh sách các khung giờ đã bận trong ngày */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mb-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>Các khung giờ đã kín trong ngày ({bookingDate}):</span>
                </div>
                {loadingSlots ? (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" /> Đang kiểm tra lịch trống...
                  </p>
                ) : bookedSlots.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {bookedSlots.map((slot, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-red-100 text-red-700 font-medium text-[11px] rounded-md border border-red-200"
                      >
                        {slot.startTime} - {slot.endTime} (Đã đặt)
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-700 font-medium">
                    ✓ Hiện chưa có đơn đặt nào trong ngày này. Bạn có thể chọn giờ tùy ý!
                  </p>
                )}
              </div>

              {/* Chọn Giờ bắt đầu & Giờ kết thúc */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Giờ Bắt Đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    step="900"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Giờ Kết Thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    step="900"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Preview Thời lượng & Tổng tiền tạm tính */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Thời lượng đá:</span>
                  <span className="font-semibold text-slate-800">
                    {durationHours > 0 ? `${durationHours.toFixed(1)} giờ (${durationHours * 60} phút)` : 'Chưa hợp lệ'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-emerald-200/60">
                  <span className="font-bold text-slate-800 text-sm">Tạm tính:</span>
                  <span className="font-extrabold text-emerald-700 text-lg">
                    {formatVND(estimatedPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  * Giá chính xác do Backend tự động tính toán và lưu trong đơn theo quy định BR-04.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting || durationHours <= 0}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Sân'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
