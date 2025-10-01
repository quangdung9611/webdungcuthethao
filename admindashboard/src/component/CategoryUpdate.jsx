// CategoryUpdate.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS/productupdate.css";

export default function CategoryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    HinhAnh: "", // Tên file hiện tại
  });
  const [file, setFile] = useState(null); // File mới được chọn

  // Lấy dữ liệu category ban đầu
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/category/${id}`);
        const { name, slug, HinhAnh } = res.data;
        setFormData({ name, slug, HinhAnh });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        alert("Không thể tải dữ liệu loại sản phẩm.");
      }
    };
    fetchCategory();
  }, [id]);

  // Xử lý input text
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý file mới
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Cập nhật category
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);

    // Nếu có file mới thì gửi file, nếu không gửi tên file cũ
    if (file) {
      data.append("HinhAnh", file);
    } else {
      data.append("HinhAnh", formData.HinhAnh);
    }

    try {
      await axios.put(`http://localhost:5000/api/category/${id}`, data, {

      });
      alert("Cập nhật loại sản phẩm thành công!");
      navigate("/category");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err.response || err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="update-form-container">
      <h2>Cập nhật Loại Sản Phẩm</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Tên loại:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Slug:</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
        </div>

        <div>
          <label>Hình ảnh:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        {formData.HinhAnh && (
          <img
            src={`http://localhost:5000/images/${formData.HinhAnh}`}
            alt="Hình loại sản phẩm hiện tại"
            className="product-image"
          />
        )}

        <div>
          <button type="submit">Lưu</button>
        </div>
      </form>
    </div>
  );
}
