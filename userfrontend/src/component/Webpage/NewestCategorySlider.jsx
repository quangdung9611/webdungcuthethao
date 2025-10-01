import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/NewestCategorySlider.css"; // Optional styling

const NewestCategorySlider = ({ slug }) => {
    const [products, setProducts] = useState([]);
    console.log("NewestCategorySlider loaded");

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/category/${slug}/newest`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [slug]);

    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 5, // 5 x 180px = 900px
        // Add slidesToShow greater after update more products!!!
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } },
        ],
    };

    return (
        <div className="newest-slider-wrapper">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.product_id} className="slide-item">
                        <div className="product-card">
                            <img
                                src={`http://localhost:5000/images/${product.image}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h4>{product.name}</h4>
                            <p>{Number(product.price).toLocaleString('vi-VN')}₫</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default NewestCategorySlider;