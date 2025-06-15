import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./components/layout/user.sidebar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar thực tế */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 bg-white shadow-lg ${
          sidebarOpen ? 'w-72' : 'w-20'
        }`}
        aria-label="Sidebar"
      >
        <UserSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </aside>

      {/* Main content with left margin for sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;