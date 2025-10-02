import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../CSS/trangchu.css";

const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [products, setProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]); // danh sách flash sale đang active
  const [timer, setTimer] = useState({}); // countdown cho từng sản phẩm

  // ===== Lấy danh sách sản phẩm theo danh mục =====
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/category/${slug}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching category products:", err));
  }, [slug]);

  // ===== Lấy flash sale active =====
  useEffect(() => {
    fetch("http://localhost:5000/api/flash-sale/active")
      .then((res) => res.json())
      .then((data) => setFlashSales(data))
      .catch((err) => console.error("Error fetching flash sales:", err));
  }, []);

  // ===== Countdown Flash Sale =====
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimer = {};
      flashSales.forEach((flash) => {
        flash.products.forEach((p) => {
          const diff = new Date(flash.end_at) - new Date();
          newTimer[p.product_id] = diff > 0 ? diff : 0;
        });
      });
      setTimer(newTimer);
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSales]);

  // ===== Tính giá giảm khi có Flash Sale =====
  const getSalePrice = (productId, originalPrice) => {
    const applicableSales = flashSales.filter((flash) =>
      flash.products.some((p) => p.product_id === productId)
    );

    if (applicableSales.length === 0) {
      return { price: originalPrice, isFlash: false, end_at: null };
    }

    // Chọn flash sale có discount_value cao nhất
    const bestSale = applicableSales.reduce((prev, curr) =>
      prev.discount_value > curr.discount_value ? prev : curr
    );

    // Tính giá giảm
    let salePrice;
    if (bestSale.discount_type === "percent") {
      salePrice = Math.round(
        originalPrice * (100 - bestSale.discount_value) / 100
      );
    } else if (bestSale.discount_type === "fixed") {
      salePrice = originalPrice - bestSale.discount_value;
    } else {
      salePrice = originalPrice;
    }

    return { price: salePrice, isFlash: true, end_at: bestSale.end_at };
  };

  // ===== Format thời gian countdown =====
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="content">
      <h1 className="title-head">Danh mục:Vợt Cầu Lông</h1>

      <div className="product-container">
        <div className="card-container">
          {products.length > 0 ? (
            products.map((product) => {
              const { price: salePrice, isFlash, end_at } = getSalePrice(
                product.product_id,
                product.price
              );

              return (
                <Link
                  key={product.product_id}
                  to={`/product/${product.slug}`}
                  className="product-link"
                >
                  <div className="product-card">
                    {/* Ảnh sản phẩm */}
                    <img
                      src={`http://localhost:5000/images/${product.image}`}
                      alt={product.name}
                    />

                    {/* Badge Flash Sale */}
                    {isFlash && <div className="flash-badge">FLASH SALE</div>}

                    {/* Thông tin sản phẩm */}
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>

                      {/* Giá sản phẩm */}
                      <p className="product-price">
                        {isFlash ? (
                          <>
                            <span className="old-price">
                              {Number(product.price).toLocaleString("vi-VN")} VNĐ
                            </span>
                            <span className="sale-price">
                              {Number(salePrice).toLocaleString("vi-VN")} VNĐ
                            </span>
                          </>
                        ) : (
                          <span>
                            {Number(product.price).toLocaleString("vi-VN")} VNĐ
                          </span>
                        )}
                      </p>

                      {/* Countdown Flash Sale */}
                      {isFlash && end_at && timer[product.product_id] > 0 && (
                        <p className="countdown">
                          {formatTime(timer[product.product_id])}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>Không có sản phẩm nào</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
