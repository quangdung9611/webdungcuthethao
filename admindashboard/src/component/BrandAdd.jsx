import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/product.css";

function BrandAdd() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const navigate = useNavigate();

  // Xử lý input text
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/brand", formData);
      //   alert("Thêm thương hiệu thành công!");
      navigate("/brand");
    } catch (err) {
      console.error("Lỗi khi thêm thương hiệu:", err);
      //   alert("Thêm thương hiệu thất bại!");
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm Thương Hiệu</h2>
      <form onSubmit={handleSubmit}>
        <label>Tên Thương Hiệu</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên thương hiệu"
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

        <button type="submit">Thêm thương hiệu</button>
      </form>
    </div>
  );
}

export default BrandAdd;
