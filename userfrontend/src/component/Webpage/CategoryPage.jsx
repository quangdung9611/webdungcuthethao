// CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/category/${slug}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Lỗi khi fetch dữ liệu:", err));
  }, [slug]);

  return (
    <div>
      <h1>Danh mục: {slug}</h1>
      <div className="product-container">
        <div className="card-container">
          {products.length > 0 ? (
            products.map(item => (
              <Link
                key={item.product_id}
                to={`/product/${item.slug}`}
                className="product-link"
              >
                <div key={item.product_id} className="product-card">
                  <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>Giá: {item.price.toLocaleString()} VND</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Không có sản phẩm nào</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
