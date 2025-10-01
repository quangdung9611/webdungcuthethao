import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/productupdate.css";

export default function NewsAdminUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category_id: "",
    status: "draft",
    published_at: "",
    image: "", // Tên file hiện tại
  });
  const [file, setFile] = useState(null); // File mới được chọn
  const [categories, setCategories] = useState([]);

  // 1. Lấy dữ liệu bài viết ban đầu
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/id/${id}`);
        const { title, slug, content, category_id, status, published_at, image } = res.data;
        setFormData({ title, slug, content, category_id, status, published_at, image });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        // alert("Không thể tải dữ liệu bài viết.");
        navigate("/news");
      }
    };
    fetchNews();
  }, [id, navigate]);

  // 2. Lấy danh sách danh mục news
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news-category");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý file mới được chọn
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Xử lý cập nhật
  const handleUpdate = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    data.append("category_id", formData.category_id);
    data.append("status", formData.status);
    data.append("published_at", formData.published_at || ""); // Thêm ngày xuất bản
    if (file) {
      data.append("image", file); // file mới
    } else {
      data.append("image", formData.image); // giữ tên file cũ
    }

    try {
      await axios.put(`http://localhost:5000/api/news/id/${id}`, data);
      navigate("/news");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Cập nhật Bài Viết</h2>

      <div>
        <label>Tiêu đề:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Slug:</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nội dung:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Danh mục:</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Trạng thái:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label>Ảnh đại diện:</label>
        <input type="file" onChange={handleFileChange} />

        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : formData.image ? (
          <img
            src={`http://localhost:5000/images/news/${formData.image}`}
            alt="Current"
            style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : null}
      </div>

      {/* ====== Ngày xuất bản ====== */}
      <div>
        <label>Ngày xuất bản:</label>
        <input
          type="date"
          name="published_at"
          value={formData.published_at ? formData.published_at.split("T")[0] : ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <button onClick={handleUpdate}>Lưu</button>
      </div>
    </div>

  );
}
