import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ import api.js
import "../CSS/user.css";

function FlashSaleProduct() {
  const [flashProducts, setFlashProducts] = useState([]);

  // Lấy danh sách flash sale product
  const fetchFlashProducts = async () => {
    try {
      const res = await api.get("/flash-sale-products");

      setFlashProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi tải flash sale products:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchFlashProducts();
  }, []);

  // Xóa flash sale product
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi flash sale?")) {
      try {
        await api.delete(`/flash-sale-products/${id}`);
        // alert("Xóa thành công!");
        fetchFlashProducts();
      } catch (err) {
        console.error("Lỗi khi xóa:", err.response?.data || err.message);
        // alert("Có lỗi xảy ra khi xóa sản phẩm.");
      }
    }
  };

  return (
    <div className="user-list">
      <button
        className="edit-btn"
        onClick={() => (window.location.href = "/flash-sale-products/add")}
      >
        Thêm
      </button>

      <h2>Danh sách Flash Sale Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Flash Sale ID</th>
            <th>Product ID</th>

            <th>Stock Limit</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {flashProducts.length > 0 ? (
            flashProducts.map((fp) => (
              <tr key={fp.id}>
                <td>{fp.id}</td>
                <td>{fp.flash_sale_id}</td>
                <td>{fp.product_id}</td>
                <td>{fp.stock_limit}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      (window.location.href = `/flash-sale-products/update/${fp.id}`)
                    }
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(fp.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có sản phẩm nào trong flash sale.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FlashSaleProduct;
