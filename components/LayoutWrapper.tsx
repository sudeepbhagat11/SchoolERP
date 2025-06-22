"use client";

import { usePathname } from "next/navigation";
import { Appbar } from "@/components/appbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showAppbar = pathname !== "/signin";

  return (
    <div className="min-w-screen min-h-screen">
      {showAppbar && <Appbar />}
      {children}
    </div>
  );
}
