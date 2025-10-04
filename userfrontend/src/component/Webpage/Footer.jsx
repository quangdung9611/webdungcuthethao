// component/Wepage/Header.jsx

import { Link } from 'react-router-dom';
import '../CSS/footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">Giới Thiệu</h3>
            <p>VNB Sports là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp.</p>
            <p><strong>Sứ mệnh:</strong> "VNB cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính mình."</p>
            <p><strong>Tầm nhìn:</strong> "Trở thành nhà phân phối và sản xuất thể thao lớn nhất Việt Nam."</p>
            
            <div className="social-links">
              <h4>Kết nối với chúng tôi</h4>
              <div className="social-icons">
                <a href="#" className="social-icon facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon youtube">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="social-icon instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon tiktok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
  
          <div className="footer-section">
            <h3 className="footer-title">Thông Tin Liên Hệ</h3>
            <p><strong>Hệ thống cửa hàng:</strong> 1 Super Center, 5 shop Premium và 68 cửa hàng trên toàn quốc.</p>
            <p><strong>Hotline:</strong> 0977508430 | 0338000308</p>
            <p><strong>Email:</strong> info@shopvnb.com</p>
            <p><strong>Hợp tác kinh doanh:</strong> 0947342259 (Ms. Thảo)</p>
            <p><strong>Hotline bán sỉ:</strong> 0911 105 211</p>
            <p><strong>Nhượng quyền thương hiệu:</strong> 0334.741.141 (Mr. Hậu)</p>
            <p><strong>Than phiền dịch vụ:</strong> 0334.741.141 (Mr. Hậu)</p>
          </div>
  
          <div className="footer-section">
            <h3 className="footer-title">Chính Sách</h3>
            <ul className="footer-links">
              <li><a href="/">Vận chuyển và giao nhận</a></li>
              <li><a href="/">Chính sách đổi trả, hoàn tiền</a></li>
              <li><a href="/">Chính sách bảo hành</a></li>
              <li><a href="/">Chính sách xử lý khiếu nại</a></li>
              <li><a href="/">Chính sách vận chuyển</a></li>
              <li><a href="/">Điều khoản sử dụng</a></li>
              <li><a href="/">Chính Sách Bảo Mật Thông Tin</a></li>
              <li><a href="/">Chính sách nhượng quyền</a></li>
            </ul>
          </div>
  
          <div className="footer-section">
            <h3 className="footer-title">Hướng Dẫn</h3>
            <ul className="footer-links">
              <li><a href="/">Danh sách số tài khoản chính thức của các shop</a></li>
              <li><a href="/">Cách chọn vợt cầu lông cho người mới chơi</a></li>
              <li><a href="/">Hướng dẫn thanh toán</a></li>
              <li><a href="/">Kiểm tra bảo hành</a></li>
              <li><a href="/">Kiểm tra đơn hàng</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 VNB Sports. Tất cả các quyền được bảo lưu.</p>
        </div>
        </div>
      </footer>
    );
  }

export default Footer;
