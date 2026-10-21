import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import fieldService from '../services/fieldService';
import BookingModal from '../components/BookingModal';
import { 
  MapPin, 
  Phone, 
  Calendar, 
  Star, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  ArrowLeft, 
  User, 
  MessageSquare,
  AlertCircle,
  Loader2,
  Tag
} from 'lucide-react';

const FieldDetailPage = () => {
  const { id } = useParams();

  const [field, setField] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State điều khiển mở BookingModal
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchFieldData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fieldRes, reviewRes] = await Promise.allSettled([
          fieldService.getFieldById(id),
          fieldService.getFieldReviews(id),
        ]);

        if (fieldRes.status === 'fulfilled') {
          setField(fieldRes.value.data);
        } else {
          throw new Error(fieldRes.reason?.message || 'Không tìm thấy thông tin sân bóng.');
        }

        if (reviewRes.status === 'fulfilled') {
          setReviews(reviewRes.value.data || []);
        }
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi khi tải thông tin sân bóng.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFieldData();
    }
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80';

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Đang tải thông tin chi tiết sân bóng...</p>
      </div>
    );
  }

  if (error || !field) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
        <h2 className="text-xl font-bold text-red-800">Không Thể Tìm Thấy Sân</h2>
        <p className="text-sm text-red-600">{error || 'Sân bóng không tồn tại hoặc đã bị ẩn.'}</p>
        <Link
          to="/fields"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách sân
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Back Link */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/fields" className="hover:text-emerald-600 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Danh sách sân
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-xs">{field.name}</span>
      </div>

      {/* Main Grid: Details (Left) + Booking Sticky Box (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image, Description, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 shadow-md border border-slate-200/80">
            <img
              src={field.imageUrl || defaultImage}
              alt={field.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
              className="w-full h-full object-cover"
            />
            {field.fieldType && (
              <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {field.fieldType.name}
              </div>
            )}
            {field.averageRating !== undefined && field.averageRating !== null && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{field.averageRating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal text-xs">({field.reviewCount} đánh giá)</span>
              </div>
            )}
          </div>

          {/* Field Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {field.name}
              </h1>
              <div className="flex items-start gap-2 mt-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{field.address}</span>
              </div>
            </div>

            {/* Quick Contacts & Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {field.phone && (
                <a
                  href={`tel:${field.phone}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Hotline: {field.phone}
                </a>
              )}

              {field.mapLink && (
                <a
                  href={field.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                  Xem trên Google Maps
                </a>
              )}

              {field.owner && (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs">
                  <User className="w-4 h-4 text-slate-400" />
                  Chủ sân: <span className="font-semibold text-slate-800">{field.owner.fullName}</span>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900">Mô Tả & Tiện Ích</h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {field.description || 'Chưa có thông tin mô tả chi tiết cho sân bóng này.'}
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg text-slate-900">Đánh Giá Từ Cầu Thủ</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {reviews.length} nhận xét
              </span>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                          {rev.userFullName?.charAt(0) || 'U'}
                        </div>
                        <span className="font-semibold text-xs text-slate-800">{rev.userFullName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-9">{rev.comment}</p>
                    {rev.createdAt && (
                      <p className="text-[10px] text-slate-400 pl-9">
                        Đánh giá ngày {new Date(rev.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-6">
                Chưa có đánh giá nào cho sân này. Hãy là người đầu tiên đặt sân và trải nghiệm!
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Booking Callout */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Đơn giá thuê</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-emerald-600">
                  {formatPrice(field.pricePerHour)}
                </span>
                <span className="text-xs text-slate-400">/ 1 giờ</span>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 border border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Mở cửa: 06:00 - 23:00 hàng ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Giữ chỗ ngay khi gửi đơn thành công</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Cho phép đặt trước nhiều ngày</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>ĐẶT LỊCH SÂN NGAY</span>
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Thao tác đặt lịch nhanh, thanh toán trực tiếp tại sân khi nhận sân.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        field={field}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={(booking) => {
          console.log('Đặt sân thành công:', booking);
        }}
      />
    </div>
  );
};

export default FieldDetailPage;
