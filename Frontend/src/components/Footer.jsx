import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚽</span>
              <span className="font-extrabold text-xl text-white tracking-tight">FootBooking</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Hệ thống quản lý và đặt lịch sân bóng đá trực tuyến hàng đầu, kết nối cầu thủ đam mê với các cụm sân cỏ nhân tạo chất lượng cao.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Khám Phá</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/fields" className="hover:text-emerald-400 transition-colors">Tìm sân gần bạn</a></li>
              <li><a href="/fields?fieldTypeId=1" className="hover:text-emerald-400 transition-colors">Sân bóng đá 5 người</a></li>
              <li><a href="/fields?fieldTypeId=2" className="hover:text-emerald-400 transition-colors">Sân bóng đá 7 người</a></li>
              <li><a href="/fields?fieldTypeId=3" className="hover:text-emerald-400 transition-colors">Sân bóng đá 11 người</a></li>
            </ul>
          </div>

          {/* Policies & Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hỗ Trợ & Chính Sách</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-400">Quy tắc đặt & giữ chỗ 15p</span></li>
              <li><span className="text-slate-400">Chính sách hủy đơn linh hoạt</span></li>
              <li><span className="text-slate-400">Dành cho Chủ sân đối tác</span></li>
              <li><span className="text-slate-400">Điều khoản dịch vụ</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên Hệ</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Hotline: 1900 6868</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@footballbooking.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Hà Nội & TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Football Booking Service. Đồ án môn học TTCSN & SOA.</p>
          <p className="flex items-center gap-1">
            Phát triển bởi Đỗ Hoàng Linh & Nhóm sinh viên
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
