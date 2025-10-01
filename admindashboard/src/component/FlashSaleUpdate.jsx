import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../CSS/admin.css";

export default function FlashSaleUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [status, setStatus] = useState("scheduled");

  // Lấy dữ liệu flash sale ban đầu
  useEffect(() => {
    fetch(`http://localhost:5000/api/flash-sale/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
        setDescription(data.description || "");
        setDiscountType(data.discount_type || "percent");
        setDiscountValue(data.discount_value || "");
        setStartAt(data.start_at ? data.start_at.slice(0, 16) : "");
        setEndAt(data.end_at ? data.end_at.slice(0, 16) : "");
        setStatus(data.status || "scheduled");
      })
      .catch(err => {
        console.error(err);
        alert("Không thể tải flash sale.");
        navigate("/flash-sale");
      });
  }, [id, navigate]);

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/flash-sale/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
      },
      body: JSON.stringify({
        name,
        description,
        discount_type: discountType,
        discount_value: discountValue,
        start_at: startAt,
        end_at: endAt,
        status
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Cập nhật thất bại!");
        return res.json();
      })
      .then(() => {
        navigate("/flash-sale"); // quay lại danh sách flash sale
      })
      .catch(err => {
        console.error(err);
        alert("Có lỗi xảy ra khi cập nhật flash sale.");
      });
  };

  return (
    <div className="update-form-container">
      <h2>Cập nhật Flash Sale</h2>

      <div>
        <label>Tên flash sale:</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <label>Mô tả:</label>
        <textarea value={description} name="description" onChange={e => setDescription(e.target.value)} />
      </div>

      <div>
        <label>Loại giảm giá:</label>
        <select value={discountType} name="discount_type" onChange={e => setDiscountType(e.target.value)}>
          <option value="percent">Phần trăm (%)</option>
          <option value="fixed">Giá cố định</option>
        </select>
      </div>

      <div>
        <label>Giá trị giảm:</label>
        <input type="number" name="discount_value" value={discountValue} onChange={e => setDiscountValue(e.target.value)} />
      </div>

      <div>
        <label>Bắt đầu:</label>
        <input type="datetime-local" name="start_at" value={startAt} onChange={e => setStartAt(e.target.value)} />
      </div>

      <div>
        <label>Kết thúc:</label>
        <input type="datetime-local" name="end_at" value={endAt} onChange={e => setEndAt(e.target.value)} />
      </div>

      <div>
        <label>Trạng thái:</label>
        <select value={status} name="status" onChange={e => setStatus(e.target.value)}>
          <option value="scheduled">Scheduled</option>
          <option value="active">Active</option>
          <option value="ended">Ended</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button onClick={handleUpdate}>Lưu</button>
    </div>
  );
}
