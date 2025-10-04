import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS/productupdate.css"
export default function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "", // Tên file hiện tại
    category_id: "",
    brand_id: "",
    slug: "",
    description: "",
    stock: ""
  });
  const [file, setFile] = useState(null); // File mới được chọn

  // Lấy dữ liệu sản phẩm ban đầu
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const { name, price, image, category_id, brand_id, slug, description, stock } = res.data;
        setFormData({ name, price, image, category_id, brand_id, slug, description, stock });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        alert("Không thể tải dữ liệu sản phẩm.");
      }
    };
    fetchProduct();
  }, [id]);

  // Xử lý thay đổi input văn bản
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý file mới được chọn
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Gộp việc tải file và cập nhật thông tin vào một hàm duy nhất
  const handleUpdate = async () => {
    // Tạo FormData để gửi tất cả dữ liệu
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category_id", formData.category_id);
    data.append("brand_id", formData.brand_id);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("stock", formData.stock);
    // Dù có file mới hay không, vẫn gửi trường image để backend xử lý
    if (file) {
      data.append("image", file); // Gửi file mới
    } else {
      data.append("image", formData.image); // Gửi tên file cũ
    }
    // Sử dụng `axios.put` để gửi yêu cầu
    try {
      await axios.put(`http://localhost:5000/api/products/update/${id}`, data, {

      });
      // alert("Cập nhật thành công");
      navigate("/products");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      // alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="update-form-container">
      <h2>Cập nhật Sản Phẩm</h2>
      <div>
        <label>Tên:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Giá: {Number(formData.price).toLocaleString("vi-VN")} (preview)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <div>
        <label>Hình:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <input type="hidden" name="category_id" value={formData.category_id} />
      <input type="hidden" name="brand_id" value={formData.brand_id} />
      <input type="hidden" name="slug" value={formData.slug} />
      <input type="hidden" name="description" value={formData.description} />
      <input type="hidden" name="stock" value={formData.stock} />

      {formData.image && (
        <img
          src={`http://localhost:5000/images/${formData.image}`}
          alt="Hình sản phẩm hiện tại"
        />
      )}

      <div>
        <button onClick={handleUpdate}>Lưu</button>
      </div>
    </div>

  );
}