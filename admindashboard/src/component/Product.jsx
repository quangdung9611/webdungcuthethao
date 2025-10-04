import React, { useEffect, useState } from "react";
import "../CSS/user.css";

function Product() {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc
  const [categories, setCategories] = useState([]); // Danh sách loại sản phẩm
  const [brands, setBrands] = useState([]); // Danh sách Thương Hiệu

  const [selectedCategory, setSelectedCategory] = useState(""); // Loại đang chọn
  const [selectedBrand, setSelectedBrand] = useState(""); // Thương hiệu đang chọn

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 4; // 4 sản phẩm mỗi trang

  // ==== Lấy danh sách sản phẩm ====
  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Ban đầu hiển thị tất cả
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", err));
  };

  // ==== Lấy danh sách loại sản phẩm ====
  const fetchCategories = () => {
    fetch("http://localhost:5000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi khi lấy loại sản phẩm:", err));
  };

  // ==== Lấy danh sách thương hiệu ====
  const fetchBrands = () => {
    fetch("http://localhost:5000/api/brand")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Lỗi khi lấy thương hiệu:", err));
  };

  // Gọi API khi load trang
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  // ==== Lọc sản phẩm theo loại và thương hiệu ====
  const filterProducts = (categoryId, brandId) => {
    let filtered = products;

    if (categoryId) {
      filtered = filtered.filter(
        (product) => String(product.category_id) === String(categoryId)
      );
    }

    if (brandId) {
      filtered = filtered.filter(
        (product) => String(product.brand_id) === String(brandId)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Quay về trang đầu khi lọc
  };

  const handleFilterCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(categoryId, selectedBrand);
  };

  const handleFilterBrand = (brandId) => {
    setSelectedBrand(brandId);
    filterProducts(selectedCategory, brandId);
  };

  // ==== Xóa sản phẩm ====
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            fetchProducts(); // Cập nhật danh sách sau khi xóa
          } else {
            console.error("Lỗi khi xóa:", res.statusText);
          }
        })
        .catch((err) => console.error("Lỗi khi xóa:", err));
    }
  };

  // ==== Logic phân trang ====
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-list">
      <div className="header-actions">
        <button
          className="edit-btn"
          onClick={() => (window.location.href = `/products/create`)}
        >
          Thêm
        </button>

        {/* Bộ lọc loại sản phẩm */}
        <select
          value={selectedCategory}
          onChange={(e) => handleFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả loại sản phẩm</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Bộ lọc thương hiệu */}
        <select
          value={selectedBrand}
          onChange={(e) => handleFilterBrand(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả thương hiệu</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <h2>Danh sách Sản Phẩm</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            {/* <th>Loại</th>
            <th>Thương Hiệu</th> */}
            <th>Hình Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{Number(product.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                {/* <td>{product.category_name}</td>
                <td>{product.brand_name}</td> Hiển thị tên thương hiệu */}
                <td>
                  <img
                    src={`http://localhost:5000/images/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      (window.location.href = `/products/update/${product.product_id}`)
                    }
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ==== PHÂN TRANG ==== */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trang trước
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default Product;
