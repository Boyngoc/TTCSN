import type { Metadata } from "next";
import { AppProviders } from "@/app/providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "Sân Nhà | Đặt sân bóng dễ dàng",
  description: "Tìm và đặt sân bóng phù hợp với lịch chơi của bạn.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <AppProviders>
          <SiteHeader />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}