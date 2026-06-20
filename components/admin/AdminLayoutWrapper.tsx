"use client";

import { usePathname } from "next/navigation";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div style={{ 
      marginLeft: isLoginPage ? "0px" : "240px", 
      flex: 1, 
      minHeight: "100vh",
      transition: "margin-left 0.2s ease" 
    }}>
      {children}
    </div>
  );
}