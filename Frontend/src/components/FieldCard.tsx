import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import type { Field } from "@/lib/types";
import { formatPrice } from "@/lib/api";

const fallbackImage = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85";

export function FieldCard({ field }: { field: Field }) {
  return (
    <article className="field-card">
      <Link href={`/fields/${field.id}`} className="field-image-wrap" aria-label={`Xem ${field.name}`}>
        <div className="field-image" style={{ backgroundImage: `url("${field.imageUrl || fallbackImage}")` }} />
        <span className="field-type-tag">{field.fieldType?.name || "Sân bóng"}</span>
        <span className="field-image-arrow"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="field-card-body">
        <div className="field-card-title-row">
          <h3><Link href={`/fields/${field.id}`}>{field.name}</Link></h3>
          {field.averageRating != null && <span className="rating"><Star size={14} fill="currentColor" /> {field.averageRating.toFixed(1)}</span>}
        </div>
        <p className="field-address"><MapPin size={14} /> {field.address}</p>
        <div className="field-card-bottom">
          <p><strong>{formatPrice(field.pricePerHour)}</strong><span> / giờ</span></p>
          <span className={`status-dot ${field.status === "ACTIVE" ? "is-active" : "is-inactive"}`}>{field.status === "ACTIVE" ? "Đang mở" : "Tạm nghỉ"}</span>
        </div>
      </div>
    </article>
  );
}