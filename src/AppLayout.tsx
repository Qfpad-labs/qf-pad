import { Sidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";


export default function AppLayout() {
  return (
    <Sidebar>
      <Outlet />
      <Toaster />
    </Sidebar>
  );
}
