import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, ArrowRight } from 'lucide-react';
import { formatVND } from '../../utils/format';
import { DEFAULT_FIELD_IMAGE } from '../../utils/status';

export const FieldCard = ({ field }) => {
  const {
    id,
    name,
    address,
    pricePerHour,
    imageUrl,
    averageRating,
    reviewCount,
    typeName,
    phone,
  } = field;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col h-full">
      {/* Field Image & Type Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl || DEFAULT_FIELD_IMAGE}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_FIELD_IMAGE;
          }}
        />
        {typeName && (
          <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {typeName}
          </span>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{averageRating ? averageRating.toFixed(1) : 'Mới'}</span>
          {reviewCount > 0 && <span className="text-gray-400">({reviewCount})</span>}
        </div>
      </div>

      {/* Field Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-base mb-1.5 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>

        <div className="flex items-start gap-1.5 text-xs text-gray-500 mb-2 line-clamp-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
          <span>{address}</span>
        </div>

        {phone && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span>{phone}</span>
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">Giá thuê</span>
            <span className="text-base font-bold text-emerald-600">
              {formatVND(pricePerHour)}
            </span>
            <span className="text-xs text-gray-400">/h</span>
          </div>

          <Link
            to={`/fields/${id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors group-hover:bg-emerald-600 group-hover:text-white"
          >
            Chi tiết
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
