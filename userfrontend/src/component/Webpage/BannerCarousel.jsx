// Import CSS for slick - slider - carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/BannerCarousel.css"; // Optional custom styling
// Import to use slider - carousel
import React from "react";
import Slider from "react-slick";

const BannerCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
    };

    const banners = [
        { id: 1, image: "http://localhost:5000/images/Homepage_Carousel_1.jpg", caption: "Banner 1" },
        { id: 2, image: "http://localhost:5000/images/Homepage_Carousel_2.jpg", caption: "Banner 2" },
        { id: 3, image: "http://localhost:5000/images/Homepage_Carousel_3.jpg", caption: "Banner 3" },
        { id: 4, image: "http://localhost:5000/images/Homepage_Carousel_4.jpg", caption: "Banner 4" },
        { id: 5, image: "http://localhost:5000/images/Homepage_Carousel_5.jpg", caption: "Banner 5" },
        { id: 6, image: "http://localhost:5000/images/Homepage_Carousel_6.jpg", caption: "Banner 6" },
        { id: 7, image: "http://localhost:5000/images/Homepage_Carousel_7.jpg", caption: "Banner 7" },
    ];
    return (
        <div className="carousel-wrapper">
            <Slider {...settings}>
                {banners.map(banner => (
                    <div key={banner.id} className="banner-slide">
                        <img src={banner.image} alt={banner.caption} className="banner-image" />
                        {/* <div className="banner-caption">{banner.caption}</div> */}
                        {/* Sử dụng div trên nếu muốn thêm caption cho banner */}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default BannerCarousel;