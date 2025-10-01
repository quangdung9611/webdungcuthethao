// Brand.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/user.css"; // CSS chung cho bảng

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách thương hiệu từ API
  const fetchBrands = () => {
    fetch("http://localhost:5000/api/brand")
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error("Lỗi khi lấy dữ liệu:", err));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Xóa thương hiệu
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
      fetch(`http://localhost:5000/api/brand/${id}`, { method: "DELETE" })
        .then(res => {
          if (res.ok) {
            // alert("Xóa thương hiệu thành công!");
            fetchBrands(); // reload danh sách
          } else {
            console.error("Lỗi khi xóa:", res.statusText);
            alert("Có lỗi khi xóa thương hiệu.");
          }
        })
        .catch(err => {
          console.error("Lỗi khi xóa:", err);
          //   alert("Lỗi kết nối máy chủ.");
        });
    }
  };

  return (
    <div className="user-list">
      <div className="top-actions">
        <button className="edit-btn" onClick={() => navigate("/brand/add")}>
          Thêm
        </button>
      </div>

      <h2>Danh sách Thương Hiệu</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Thương Hiệu</th>
            <th>Slug</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <tr key={brand.brand_id}>
                <td>{brand.brand_id}</td>
                <td>{brand.name}</td>
                <td>{brand.slug}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/brand/update/${brand.brand_id}`)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(brand.brand_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có thương hiệu nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Brand;
