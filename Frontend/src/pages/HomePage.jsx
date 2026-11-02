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
  Users,
  CalendarCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [featuredFields, setFeaturedFields] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fieldsRes, typesRes] = await Promise.allSettled([
          fieldService.getFields({ size: 6 }),
          fieldService.getFieldTypes(),
        ]);

        if (fieldsRes.status === 'fulfilled') {
          setFeaturedFields(fieldsRes.value.data?.content || []);
        }
        if (typesRes.status === 'fulfilled') {
          setFieldTypes(typesRes.value.data || []);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu trang chủ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tìm Kiếm Sân</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Fast Stats */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-slate-800/80">
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
              <div className="text-xs text-slate-400 mt-0.5">Lượt thi đấu kết nối</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Chống trùng lịch (BR-03)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Field Types Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chọn Loại Sân Phù Hợp
          </h2>
          <p className="mt-1 text-slate-500 text-xs sm:text-sm">
            Dễ dàng lựa chọn theo số lượng thành viên trong đội bóng của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: 'Sân 5 Người (Mini)',
              desc: 'Kích thước 20m x 40m, phù hợp cho đá đối kháng tốc độ cao, giao lưu văn phòng và bạn bè cuối tuần.',
              badge: '5 vs 5',
              color: 'from-emerald-500 to-green-600',
            },
            {
              id: 2,
              title: 'Sân 7 Người (Tiêu chuẩn)',
              desc: 'Kích thước 30m x 50m, phù hợp giải phong trào bán chuyên, đội nhóm đông vui và không gian thoải mái.',
              badge: '7 vs 7',
              color: 'from-blue-600 to-emerald-600',
            },
            {
              id: 3,
              title: 'Sân 11 Người (Quốc tế)',
              desc: 'Mặt sân cỏ tự nhiên hoặc cỏ chuẩn FIFA, dành cho các trận giao hữu quy mô lớn và thi đấu chính thức.',
              badge: '11 vs 11',
              color: 'from-slate-800 to-slate-900',
            },
          ].map((type) => (
            <div
              key={type.id}
              onClick={() => navigate(`/fields?fieldTypeId=${type.id}`)}
              className="group cursor-pointer p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black text-white bg-gradient-to-r ${type.color}`}>
                    {type.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {type.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {type.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Khám phá cụm sân</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
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

      {/* 3 Steps Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-emerald-50/40 p-8 sm:p-12 rounded-3xl border border-slate-200/60">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-900">
            Đặt Sân Đơn Giản Trong 3 Bước
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quy trình giữ chỗ tự động, nhanh chóng và chuẩn xác tuyệt đối
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-emerald-600 font-black text-xl">
              1
            </div>
            <h3 className="font-bold text-base text-slate-800">Tìm & Lựa Chọn Sân</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Tra cứu theo vị trí gần bạn, mức giá và quy mô sân 5, 7, 11 người có hình ảnh thực tế.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-emerald-600 font-black text-xl">
              2
            </div>
            <h3 className="font-bold text-base text-slate-800">Kiểm Tra Giờ & Đặt</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Xem trực tiếp các khung giờ còn trống trong ngày và nhấn đặt lịch mà không sợ bị trùng.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-emerald-600 font-black text-xl">
              3
            </div>
            <h3 className="font-bold text-base text-slate-800">Nhận Sân & Tỏa Sáng</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Chủ sân xác nhận đơn, bạn chỉ việc cùng đồng đội ra sân thi đấu và thanh toán tại quầy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
