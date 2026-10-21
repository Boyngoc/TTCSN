import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fieldService from '../services/fieldService';
import FieldCard from '../components/FieldCard';
import { 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Sparkles,
  Users
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [featuredFields, setFeaturedFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopFields = async () => {
      try {
        const response = await fieldService.getFields({ size: 6 });
        setFeaturedFields(response.data?.content || []);
      } catch (error) {
        console.error('Lỗi khi tải sân nổi bật:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopFields();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/fields?keyword=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/fields');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Nền tảng đặt sân bóng đá công nghệ hàng đầu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Tìm Sân Nhanh Chóng, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
              Đam Mê Bùng Cháy
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Hàng trăm cụm sân cỏ nhân tạo 5, 7, 11 người với mặt cỏ tiêu chuẩn FIFA. Tra cứu lịch trống theo thời gian thực và đặt sân chỉ trong 30 giây!
          </p>

          {/* Quick Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-4 py-2.5 text-slate-800">
              <Search className="w-5 h-5 text-emerald-600 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Nhập tên sân, khu vực hoặc quận huyện..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Tìm Kiếm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Fast Stats */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-slate-800">
            <div>
              <div className="text-2xl font-black text-emerald-400">100+</div>
              <div className="text-xs text-slate-400 mt-0.5">Cụm sân đối tác</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">24/7</div>
              <div className="text-xs text-slate-400 mt-0.5">Đặt lịch trực tuyến</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">10.000+</div>
              <div className="text-xs text-slate-400 mt-0.5">Trận bóng kết nối</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Chống trùng lịch (BR-03)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trải Nghiệm Đặt Sân Tối Ưu
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Hệ thống giải quyết triệt để tình trạng gọi điện chờ đợi hoặc trùng sân giờ cao điểm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Xem Khung Giờ Trống</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Trực tiếp xem lịch bận/rảnh của sân trong ngày, lựa chọn khung giờ lý tưởng mà không sợ bị trùng lịch.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Đảm Bảo Khóa Sân</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Hệ thống Backend áp dụng khóa bi quan (Pessimistic Locking) bảo đảm đơn đặt của bạn được giữ chỗ chính xác tuyệt đối.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Đánh Giá Thực Tế</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nhận xét và chấm điểm thực tế từ các đội bóng đã trải nghiệm mặt sân, đèn chiếu sáng và chất lượng phục vụ.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Fields Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sân Bóng Nổi Bật
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Những cụm sân được cầu thủ đánh giá cao và đặt lịch nhiều nhất
            </p>
          </div>
          <Link
            to="/fields"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
          >
            <span>Xem tất cả sân</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : featuredFields.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">Chưa có sân bóng nào được kích hoạt.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
