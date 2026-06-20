import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: { default: "Admin | So Productions", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-obsidian)" }}>
      <AdminSidebar />
      {/* 🛠️ This new wrapper dynamically manages the 240px margin on the client side */}
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </div>
  );
}




