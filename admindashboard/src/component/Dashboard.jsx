import React, { useEffect, useState } from "react";
import "../CSS/Dashboard.css";
const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin_user");

    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      if (parsedAdmin.role === "admin") {
        setAdmin(parsedAdmin);
      } else {
        alert("Bạn không có quyền truy cập trang quản trị!");
        window.location.href = "http://localhost:3001/login";
      }
    } else {
      window.location.href = "http://localhost:3001/login";
    }
  }, []);

  if (!admin) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">
          Xin chào<span className="username">{admin.username}</span> 👋
        </h2>

        <div className="dashboard-info">
          <div className="info-item">
            <span className="label">📧 Email:</span>
            <span className="value">{admin.email}</span>
          </div>

          <div className="info-item">
            <span className="label">🔑 Vai trò:</span>
            <span
              className={`role-badge ${admin.role === "admin" ? "admin-role" : "user-role"
                }`}
            >
              {admin.role === "admin" ? "Quản trị viên" : "Người dùng"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
