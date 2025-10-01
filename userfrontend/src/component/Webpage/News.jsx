import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ Thêm Link
import "../CSS/news.css"; // CSS riêng cho trang news

const News = () => {
  const { slug } = useParams(); // Lấy slug danh mục từ URL
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = () => {
      if (!slug) return;

      setLoading(true);
      fetch(`http://localhost:5000/api/news/category/${slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu");
          return res.json();
        })
        .then((data) => {
          setNewsList(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error(err);
          setError("Không thể tải dữ liệu");
        })
        .finally(() => setLoading(false));
    };

    fetchNews();
  }, [slug]);

  if (loading) return <p>Đang tải tin tức...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="news-container">
      {newsList.length === 0 ? (
        <p>Chưa có tin tức nào.</p>
      ) : (
        newsList.map((news) => (
          <Link
            key={news.news_id}
            to={`/news/${news.slug}`}
            className="news-card-link"
          >
            <div className="news-card">
              {news.image && (
                <img
                  src={`http://localhost:5000/images/news/${news.image}`}
                  alt={news.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2 className="news-title">{news.title}</h2>
                <p className="news-meta">
                  Ngày xuất bản:{" "}
                  {news.published_at
                    ? new Date(news.published_at).toLocaleDateString()
                    : "Chưa có"}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>

  );
};

export default News;
