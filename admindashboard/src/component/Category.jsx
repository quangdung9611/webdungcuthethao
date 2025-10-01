// Category.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/user.css"; // CSS chung cho bảng

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách loại sản phẩm từ API
  const fetchCategories = () => {
    fetch("http://localhost:5000/api/category")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Lỗi khi lấy dữ liệu:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Xóa loại sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa loại sản phẩm này?")) {
      fetch(`http://localhost:5000/api/category/${id}`, { method: "DELETE" })
        .then(res => {
          if (res.ok) {
            alert("Xóa thành công!");
            fetchCategories(); // reload danh sách
          } else {
            console.error("Lỗi khi xóa:", res.statusText);
            alert("Có lỗi khi xóa loại sản phẩm.");
          }
        })
        .catch(err => {
          console.error("Lỗi khi xóa:", err);
          alert("Lỗi kết nối máy chủ.");
        });
    }
  };

  return (
    <div className="user-list">
      <div className="top-actions">
        <button className="edit-btn" onClick={() => navigate("/category/add")}>
          Thêm
        </button>
      </div>

      <h2>Danh sách Loại Sản Phẩm</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>

            <th>Slug</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map(category => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>{category.name}</td>

                <td>{category.slug}</td>
                <td>
                  {category.HinhAnh && (
                    <img
                      src={`http://localhost:5000/images/${category.HinhAnh}`}
                      alt={category.name}
                      className="product-image"
                    />
                  )}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/category/update/${category.category_id}`)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(category.category_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có loại sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
