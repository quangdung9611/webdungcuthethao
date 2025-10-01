import React, { useState, useEffect } from "react";
import api from "../api";

function FlashSaleProductAdd() {
  const [form, setForm] = useState({
    flash_sale_id: "",
    product_id: "",
    stock_limit: "",
  });

  const [flashSales, setFlashSales] = useState([]);
  const [products, setProducts] = useState([]);

  // Lấy danh sách flash sale
  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const res = await api.get("/flash-sale");
        setFlashSales(res.data);
      } catch (err) {
        console.error("Lỗi khi tải flash sales:", err.response?.data || err.message);
      }
    };
    fetchFlashSales();
  }, []);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi tải products:", err.response?.data || err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.flash_sale_id || !form.product_id) {
      // alert("Vui lòng chọn Flash Sale và Product!");
      return;
    }

    try {
      await api.post("/flash-sale-products", form);
      // alert("Thêm Flash Sale Product thành công!");
      window.location.href = "/flash-sale-products";
    } catch (err) {
      console.error(err.response?.data || err.message);
      // alert("Thêm Flash Sale Product thất bại.");
    }
  };

  return (
    <div className="update-form-container">
      <h2>Thêm Flash Sale Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Chọn Flash Sale */}
        <label>Chọn Flash Sale:</label>
        <select
          name="flash_sale_id"
          value={form.flash_sale_id}
          onChange={e => setForm({ ...form, flash_sale_id: e.target.value })}
        >
          {flashSales.map(fs => (
            <option key={fs.flash_sale_id} value={fs.flash_sale_id}>
              {fs.name} ({fs.status})
            </option>
          ))}
        </select>

        {/* Chọn Product */}
        <label>Chọn Product:</label>
        <select name="product_id" value={form.product_id} onChange={handleChange} required>
          <option value="">-- Chọn Product --</option>
          {products.map(p => (
            <option key={p.product_id} value={p.product_id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Giới hạn số lượng */}
        <label>Giới hạn số lượng (tùy chọn):</label>
        <input
          type="number"
          name="stock_limit"
          value={form.stock_limit}
          onChange={handleChange}
          placeholder="Nhập số lượng giới hạn"
        />

        <button type="submit">Thêm Flash Sale Product</button>
      </form>
    </div>
  );
}

export default FlashSaleProductAdd;
