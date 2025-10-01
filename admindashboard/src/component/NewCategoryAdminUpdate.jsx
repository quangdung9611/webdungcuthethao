import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/productupdate.css"; // dùng chung CSS cũ

export default function NewsCategoryAdminUpdate() {
  const { id } = useParams(); // Lấy category_id từ URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Lấy dữ liệu danh mục ban đầu
  useEffect(() => {
    fetch(`http://localhost:5000/api/news-category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải dữ liệu danh mục");
        return res.json();
      })
      .then((data) => {
        setName(data.name || "");
        setSlug(data.slug || "");
        setDescription(data.description || "");
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể tải dữ liệu danh mục.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 2. Xử lý cập nhật danh mục
  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/news-category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
      body: JSON.stringify({ name, slug, description }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Cập nhật thất bại!");
        return res.json();
      })
      .then(() => {
        navigate("/admin/news-category"); // Quay lại danh sách danh mục
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  if (loading) return <p>Đang tải thông tin danh mục...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="update-form-container">
      <h2>Cập nhật Danh Mục Tin Tức</h2>

      <div>
        <label>Tên danh mục:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên danh mục"
        />
      </div>

      <div>
        <label>Slug:</label>
        <input
          type="text"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Nhập slug"
        />
      </div>

      <div>
        <label>Mô tả:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Nhập mô tả danh mục"
        />
      </div>

      <button onClick={handleUpdate}>Lưu</button>
    </div>
  );
}
