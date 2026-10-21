import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, ArrowRight, Tag } from 'lucide-react';

const FieldCard = ({ field }) => {
  // Định dạng tiền tệ VND
  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Field Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={field.imageUrl || defaultImage}
          alt={field.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Field Type Badge */}
        {field.fieldType && (
          <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {field.fieldType.name}
          </div>
        )}

        {/* Rating Badge (nếu có) */}
        {field.averageRating !== undefined && field.averageRating !== null && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{field.averageRating.toFixed(1)}</span>
            {field.reviewCount !== undefined && (
              <span className="text-slate-400 font-normal">({field.reviewCount})</span>
            )}
          </div>
        )}

        {/* Giá tiền nổi bật ở góc dưới ảnh */}
        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg">
            <span className="text-emerald-400 font-extrabold text-base">
              {formatPrice(field.pricePerHour)}
            </span>
            <span className="text-xs text-slate-300 ml-1">/giờ</span>
          </div>
        </div>
      </div>

      {/* Field Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {field.name}
          </h3>

          <div className="flex items-start gap-1.5 mt-2 text-slate-500 text-sm">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2">{field.address || 'Đang cập nhật địa chỉ'}</p>
          </div>

          {field.description && (
            <p className="mt-2.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {field.description}
            </p>
          )}
        </div>

        {/* Footer Card: Hotline & Action Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          {field.phone ? (
            <a
              href={`tel:${field.phone}`}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>{field.phone}</span>
            </a>
          ) : (
            <span className="text-xs text-slate-400 italic">Sân chính chủ</span>
          )}

          <Link
            to={`/fields/${field.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl text-xs font-bold transition-all group-hover:shadow-md"
          >
            <span>Đặt Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
