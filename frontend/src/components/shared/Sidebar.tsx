import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-semibold p-4">Dashboard</h2>
      <nav className="flex flex-col space-y-2 p-4">
        <NavLink
          to="/add-product"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 p-2 rounded"
              : "hover:bg-gray-700 p-2 rounded"
          }
        >
          Add Product
        </NavLink>
        <NavLink
          to="/purchased-products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 p-2 rounded"
              : "hover:bg-gray-700 p-2 rounded"
          }
        >
          Purchased Products
        </NavLink>
        <NavLink
          to="/posted-products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 p-2 rounded"
              : "hover:bg-gray-700 p-2 rounded"
          }
        >
          Posted Products
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
