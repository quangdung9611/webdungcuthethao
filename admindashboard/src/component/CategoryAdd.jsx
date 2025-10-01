import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/product.css";

function CategoryAdd() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Xử lý input text
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý file input (ảnh category)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Vui lòng chọn hình ảnh!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("HinhAnh", file);

    try {
      await axios.post("http://localhost:5000/api/category", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Thêm loại sản phẩm thành công!");
      navigate("/category");
    } catch (err) {
      console.error("Lỗi khi thêm loại sản phẩm:", err);
      alert("Thêm loại sản phẩm thất bại!");
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm Loại Sản Phẩm</h2>
      <form onSubmit={handleSubmit}>
        <label>Tên Loại</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên loại"
          required
        />

        <label>Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Nhập slug"
          required
        />

        <label>Hình ảnh</label>
        <input type="file" name="HinhAnh" onChange={handleFileChange} required />

        <button type="submit">Thêm loại sản phẩm</button>
      </form>
    </div>
  );
}

export default CategoryAdd;
