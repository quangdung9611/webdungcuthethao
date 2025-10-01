import React, { useEffect, useState } from "react";
import "../CSS/user.css";

const NewsCategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================= LẤY DANH SÁCH DANH MỤC =======================
  const fetchCategories = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/news-category")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Lỗi khi lấy danh mục:", err);
        setError("Không thể tải danh mục");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ======================= XÓA DANH MỤC =======================
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;

    fetch(`http://localhost:5000/api/news-category/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Xóa thất bại");
        fetchCategories(); // Tải lại danh sách
      })
      .catch((err) => {
        console.error("Lỗi khi xóa danh mục:", err);
        alert("Xóa thất bại!");
      });
  };

  if (loading) return <p>Đang tải danh mục...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list">
      <button
        className="edit-btn"
        onClick={() => (window.location.href = "/news-category/add/")}
      >
        Thêm
      </button>

      <h2>Danh sách Danh Mục Tin Tức</h2>

      <table className="table-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Slug</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  {category.created_at
                    ? new Date(category.created_at).toLocaleDateString()
                    : "Chưa có"}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      (window.location.href = `/news-category/update/${category.category_id}`)
                    }
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
              <td colSpan="5">Chưa có danh mục nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsCategoryAdmin;
