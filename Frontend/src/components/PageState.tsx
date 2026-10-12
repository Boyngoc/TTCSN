import { AlertCircle, LoaderCircle, SearchX } from "lucide-react";

export function LoadingState({ label = "Đang tải dữ liệu" }: { label?: string }) {
  return <div className="page-state"><LoaderCircle className="spin" size={27} /><p>{label}</p></div>;
}

export function ErrorState({ message, retry }: { message: string; retry?: () => void }) {
  return <div className="page-state state-error"><AlertCircle size={28} /><p>{message}</p>{retry && <button className="button button-outline" onClick={retry}>Thử lại</button>}</div>;
}

export function EmptyState({ title = "Chưa có kết quả", detail = "Thử thay đổi bộ lọc hoặc quay lại sau." }: { title?: string; detail?: string }) {
  return <div className="page-state empty-state"><SearchX size={30} /><strong>{title}</strong><p>{detail}</p></div>;
}