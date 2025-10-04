import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/product.css";

function ProductAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_id: "",
    brand_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  // Fetch category và brand
  useEffect(() => {
    axios.get("http://localhost:5000/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:5000/api/brand")
      .then((res) => setBrands(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.slug || !formData.category_id || !formData.brand_id || !file) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append("image", file);

    try {
      await axios.post("http://localhost:5000/api/products/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Thêm sản phẩm thành công!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Lỗi server khi tạo sản phẩm");
    }
  };

  return (
    <div className="form-container">
      <h2>THÊM SẢN PHẨM MỚI</h2>
      <form onSubmit={handleSubmit}>
        <label>Danh mục *</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">-- Chọn danh mục --</option>
          {categories.map(c => <option key={c.category_id} value={c.category_id}>{c.name}</option>)}
        </select>

        <label>Thương hiệu *</label>
        <select name="brand_id" value={formData.brand_id} onChange={handleChange} required>
          <option value="">-- Chọn thương hiệu --</option>
          {brands.map(b => <option key={b.brand_id} value={b.brand_id}>{b.name}</option>)}
        </select>

        <label>Tên sản phẩm *:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Slug sản phẩm *:</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />

        <label>Mô tả:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />

        <label>Giá *: {" "}
          {formData.price !== "" &&
            Number(formData.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Số lượng tồn *:</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

        <label>Hình ảnh chính *:</label>
        <input type="file" onChange={handleFileChange} required />

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div >
  );
}

export default ProductAdd;
