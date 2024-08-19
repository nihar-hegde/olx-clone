import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./shared/Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
