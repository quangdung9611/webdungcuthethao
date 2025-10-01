import React, { useEffect, useState } from "react";
// import "../CSS/header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cập nhật admin mỗi khi location (URL) thay đổi
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin_user");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    } else {
      setAdmin(null);
    }
  }, [location]);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <div className="header">
      <h1 className="header-title">Dashboard Admin</h1>
      <div className="header-actions">
        <li>
          {admin ? (
            <>
              <span className="welcome-text">Xin chào, {admin.username} 👋</span>
              <button className="logout-btn" onClick={handleLogout}>Đăng Xuất</button>

            </>
          ) : (
            <Link to="/login" className="login-link">
              Đăng Nhập
            </Link>
          )}
        </li>
      </div>
    </div>
  );
};

export default Header;
