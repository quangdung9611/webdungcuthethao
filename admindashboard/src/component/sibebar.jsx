import React from "react";
// import "../CSS/sibebar.css";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/users">👥 Users</Link></li>
        <li><Link to="/products">📦 Products</Link></li>
        <li><Link to="/product-material">📦 Materials</Link></li>
        <li><Link to="/brand">Brand</Link></li>
        <li><Link to="/category"> Categories</Link></li>
        <li><Link to="/voucher">Voucher</Link></li>
        <li><Link to="/flash-sale">Flash Sales</Link></li>
        <li><Link to="/flash-sale-products">Flash Sales Products</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/news-category">News Category</Link></li>

        <li><Link to="/order">🛒 Orders</Link></li>
        <li>📊 Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
