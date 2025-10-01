import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsCategoryAdminAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Hàm xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm tự động tạo slug khi nhập name
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, "-") // khoảng trắng -> dấu "-"
      .replace(/[^a-z0-9\-]/g, ""); // loại ký tự đặc biệt
  };

  const handleNameBlur = () => {
    if (!formData.slug && formData.name) {
      setFormData({
        ...formData,
        slug: generateSlug(formData.name),
      });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.name) validationErrors.name = "Tên danh mục không được để trống";
    if (!formData.slug) validationErrors.slug = "Slug không được để trống";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/api/news-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("Response:", resData);

        // Reset form và điều hướng về trang danh sách
        setTimeout(() => {
          navigate("/news-category");
        }, 1000);

        setFormData({
          name: "",
          slug: "",
          description: "",
        });
        setErrors({});
      })
      .catch((err) => {
        console.error("Error when adding category:", err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="update-form-container">
      <h2>Thêm Danh Mục Tin Tức</h2>
      <form onSubmit={handleSubmit}>
        {/* Tên danh mục */}
        <label>Tên danh mục</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleNameBlur}
          placeholder="Nhập tên danh mục"
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Slug */}
        <label>Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug tự động hoặc tự nhập"
          required
        />
        {errors.slug && <p className="error">{errors.slug}</p>}

        {/* Mô tả */}
        <label>Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả danh mục"
          rows={4}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default NewsCategoryAdminAdd;
