import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ownerService from '../services/ownerService';
import fieldService from '../services/fieldService';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  MapPin, 
  Phone, 
  DollarSign, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Loader2,
  Tag,
  Eye,
  Power
} from 'lucide-react';

const OwnerFieldsPage = () => {
  const [fields, setFields] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // State Modal (Thêm / Sửa)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' hoặc 'edit'
  const [currentFieldId, setCurrentFieldId] = useState(null);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form State
  const initialForm = {
    name: '',
    fieldTypeId: 1,
    address: '',
    pricePerHour: '',
    phone: '',
    mapLink: '',
    imageUrl: '',
    description: '',
    status: 'ACTIVE',
  };
  const [formData, setFormData] = useState(initialForm);

  // State Modal Xác nhận Xóa
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Tải dữ liệu ban đầu
  const fetchOwnerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [fieldsRes, typesRes] = await Promise.all([
        ownerService.getOwnerFields(0, 50),
        fieldService.getFieldTypes(),
      ]);

      if (fieldsRes?.data) {
        setFields(fieldsRes.data.content || []);
      }
      if (typesRes?.data) {
        setFieldTypes(typesRes.data || []);
      }
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách sân bóng của bạn.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerData();
  }, []);

  // Xử lý mở Modal Tạo mới
  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData(initialForm);
    setModalError('');
    setIsModalOpen(true);
  };

  // Xử lý mở Modal Chỉnh sửa
  const handleOpenEdit = (field) => {
    setModalMode('edit');
    setCurrentFieldId(field.id);
    setFormData({
      name: field.name || '',
      fieldTypeId: field.fieldType?.id || 1,
      address: field.address || '',
      pricePerHour: field.pricePerHour || '',
      phone: field.phone || '',
      mapLink: field.mapLink || '',
      imageUrl: field.imageUrl || '',
      description: field.description || '',
      status: field.status || 'ACTIVE',
    });
    setModalError('');
    setIsModalOpen(true);
  };

  // Submit Form Tạo / Sửa
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setModalError('');

    if (!formData.name.trim()) {
      setModalError('Vui lòng nhập tên sân bóng.');
      return;
    }
    if (!formData.address.trim()) {
      setModalError('Vui lòng nhập địa chỉ sân bóng.');
      return;
    }
    if (!formData.pricePerHour || Number(formData.pricePerHour) <= 0) {
      setModalError('Giá thuê theo giờ phải lớn hơn 0 VNĐ.');
      return;
    }

    setModalSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        fieldTypeId: Number(formData.fieldTypeId),
        address: formData.address.trim(),
        pricePerHour: Number(formData.pricePerHour),
        phone: formData.phone.trim(),
        mapLink: formData.mapLink.trim(),
        imageUrl: formData.imageUrl.trim() || undefined,
        description: formData.description.trim(),
        status: formData.status,
      };

      if (modalMode === 'create') {
        const res = await ownerService.createOwnerField(payload);
        showToast(res.message || 'Thêm sân bóng mới thành công!');
      } else {
        const res = await ownerService.updateOwnerField(currentFieldId, payload);
        showToast(res.message || 'Cập nhật thông tin sân bóng thành công!');
      }

      setIsModalOpen(false);
      fetchOwnerData();
    } catch (err) {
      setModalError(err.message || 'Có lỗi xảy ra khi lưu thông tin sân.');
    } finally {
      setModalSubmitting(false);
    }
  };

  // Xử lý Xóa sân
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const res = await ownerService.deleteOwnerField(deleteId);
      showToast(res.message || 'Đã xóa sân bóng thành công!');
      setDeleteId(null);
      fetchOwnerData();
    } catch (err) {
      showToast(err.message || 'Không thể xóa sân (Sân đã có lịch đặt, hãy chuyển sang tạm ngưng).', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Format tiền tệ
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Lọc sân theo từ khóa tìm kiếm
  const filteredFields = fields.filter((f) => {
    if (!searchKeyword.trim()) return true;
    const kw = searchKeyword.toLowerCase();
    return f.name?.toLowerCase().includes(kw) || f.address?.toLowerCase().includes(kw);
  });

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

      {/* Header Dashboard Chủ sân */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            Cổng Chủ Sân (Owner Portal)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quản Lý Sân Bóng Của Tôi
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Theo dõi danh sách các sân bóng, thêm sân mới hoặc chỉnh sửa giá thuê và thông tin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/owner/bookings"
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            Duyệt đơn đặt sân &rarr;
          </Link>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm Sân Mới
          </button>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số sân</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{fields.length}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang hoạt động</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {fields.filter((f) => f.status === 'ACTIVE').length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
            <Power className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tạm dừng hoạt động</p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {fields.filter((f) => f.status !== 'ACTIVE').length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên sân, địa chỉ..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Hiển thị <strong>{filteredFields.length}</strong> sân
        </span>
      </div>

      {/* Nội dung danh sách sân */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Đang tải danh sách sân bóng của bạn...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-3xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <p className="text-sm font-bold text-red-800">{error}</p>
          <button
            onClick={fetchOwnerData}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      ) : filteredFields.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-4">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">Chưa có sân bóng nào</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Bạn chưa đăng ký sân bóng nào hoặc không tìm thấy sân phù hợp với từ khóa tìm kiếm.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            + Đăng ký sân đầu tiên ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              {/* Ảnh sân & Badge */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={field.imageUrl || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80'}
                  alt={field.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {field.fieldType?.name || 'Sân bóng'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm ${
                      field.status === 'ACTIVE'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-600 text-white'
                    }`}
                  >
                    {field.status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng'}
                  </span>
                </div>
              </div>

              {/* Thông tin sân */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {field.name}
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{field.address}</span>
                  </div>
                  {field.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{field.phone}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Đơn giá</span>
                    <span className="text-base font-extrabold text-emerald-600">
                      {formatVND(field.pricePerHour)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium"> /giờ</span>
                  </div>

                  {/* Nút hành động */}
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/fields/${field.id}`}
                      target="_blank"
                      title="Xem trang công khai"
                      className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleOpenEdit(field)}
                      title="Chỉnh sửa thông tin"
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(field.id)}
                      title="Xóa sân"
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Thêm / Chỉnh Sửa Sân */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  {modalMode === 'create' ? <Plus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {modalMode === 'create' ? 'Thêm Sân Bóng Mới' : 'Cập Nhật Sân Bóng'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error in modal */}
            {modalError && (
              <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tên sân */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên Sân Bóng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Sân Bóng Chảo Lửa Tân Bình"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Loại sân */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Loại Sân <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.fieldTypeId}
                    onChange={(e) => setFormData({ ...formData, fieldTypeId: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    {fieldTypes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Giá theo giờ */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Giá Thuê / Giờ (VNĐ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="10000"
                    step="10000"
                    placeholder="Ví dụ: 350000"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Địa chỉ */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Địa Chỉ Chi Tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/TP"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số Điện Thoại Liên Hệ</label>
                  <input
                    type="text"
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Trạng thái (chỉ hiện khi edit) */}
                {modalMode === 'edit' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Trạng Thái Hoạt Động</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="ACTIVE">Đang hoạt động (ACTIVE)</option>
                      <option value="INACTIVE">Tạm dừng nhận khách (INACTIVE)</option>
                    </select>
                  </div>
                )}

                {/* URL Ảnh */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đường Dẫn Hình Ảnh (URL)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/anh-san-bong.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Link Google Maps */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đường Dẫn Google Maps</label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/?q=..."
                    value={formData.mapLink}
                    onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Mô tả */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mô Tả & Tiện Ích Sân</label>
                  <textarea
                    rows="3"
                    placeholder="Mặt cỏ FIFA, dàn đèn LED, khu vực thay đồ, wifi, bãi xe ô tô..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 disabled:opacity-60"
                >
                  {modalSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {modalMode === 'create' ? 'Tạo Sân Bóng' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa Sân */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Xác Nhận Xóa Sân Bóng</h3>
              <p className="text-xs text-slate-500">
                Bạn có chắc chắn muốn xóa sân này? Nếu sân đã có lịch đặt trước đó, bạn nên chuyển trạng thái sang Tạm Ngưng (INACTIVE).
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/20 disabled:opacity-60 flex items-center gap-2"
              >
                {deleteLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Xóa Vĩnh Viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerFieldsPage;

