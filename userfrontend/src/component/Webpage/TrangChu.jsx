import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../CSS/trangchu.css';
import BannerCarousel from "./BannerCarousel";
import NewestCategorySlider from "./NewestCategorySlider";

const TrangChu = () => {
  const [products, setProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]); // lưu danh sách flash sale active
  const [timer, setTimer] = useState({}); // countdown cho sản phẩm trong flash sale

  // Lấy danh sách tất cả sản phẩm
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Lấy flash sale active
  useEffect(() => {
    fetch("http://localhost:5000/api/flash-sale/active")
      .then(res => res.json())
      .then(data => setFlashSales(data))
      .catch(err => console.error("Error fetching flash sales:", err));
  }, []);

  //

  // Countdown timer cho flash sale
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newTimer = {};
  //     flashSales.forEach(flash => {
  //       flash.products.forEach(p => {
  //         const diff = new Date(flash.end_at) - new Date();
  //         newTimer[p.product_id] = diff > 0 ? diff : 0;
  //       });
  //     });
  //     setTimer(newTimer);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [flashSales]);

  // Tính giá sale nếu sản phẩm có flash sale
  const getSalePrice = (productId, originalPrice) => {
    // Lọc tất cả flash sale active áp dụng cho sản phẩm này
    const applicableSales = flashSales.filter(flash =>
      flash.products.some(p => p.product_id === productId)
    );
    if (applicableSales.length === 0) {
      return { price: originalPrice, isFlash: false, end_at: null };
    }
    // Chọn flash sale có discount_value cao nhất
    const bestSale = applicableSales.reduce((prev, curr) => {
      return prev.discount_value > curr.discount_value ? prev : curr;
    });
    // Tính giá theo discount_type
    let salePrice;
    if (bestSale.discount_type === "percent") {
      salePrice = Math.round(originalPrice * (100 - bestSale.discount_value) / 100);
    } else if (bestSale.discount_type === "fixed") {
      salePrice = originalPrice - bestSale.discount_value;
    } else {
      salePrice = originalPrice;
    }
    return { price: salePrice, isFlash: true, end_at: bestSale.end_at };
  };
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };
  return (
    <div className="content">
      {/* <div className="poster">
        <img src="http://localhost:5000/images/Homepage_Carousel_1.jpg" alt="Poster" />
      </div> */}
      {/* Old banner above */}

      <BannerCarousel />

      <div className="title-head">SẢN PHẨM NỔI BẬT</div>

      <div className="product-container">
        <div className="card-container">
          {products.map(product => {
            const { price: salePrice, isFlash, end_at } = getSalePrice(product.product_id, product.price);

            return (
              <Link
                key={product.product_id}
                to={`/product/${product.slug}`}
                className="product-link"
              >
                <div className="product-card">
                  <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
                  {isFlash && <div className="flash-badge">FLASH SALE</div>}
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">
                      {isFlash ? (
                        <>
                          <span className="old-price">{Number(product.price).toLocaleString('vi-VN')} VNĐ</span>
                          <span className="sale-price">{Number(salePrice).toLocaleString('vi-VN')} VNĐ</span>
                        </>
                      ) : (
                        <span>{Number(product.price).toLocaleString('vi-VN')} VNĐ</span>
                      )}
                    </p>
                    {isFlash && end_at && timer[product.product_id] > 0 && (
                      <p className="countdown">{formatTime(timer[product.product_id])}</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <NewestCategorySlider slug="vot-cau-long" />
    </div>
  );
};

export default TrangChu;
