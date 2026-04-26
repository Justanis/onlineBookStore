import { Outlet } from "react-router-dom";
import AppSidebar from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
