import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./component/sibebar";
import Header from "./component/header";
import Dashboard from "./component/Dashboard";
import User from "./component/User";
import UserUpdate from "./component/UserUpdate";
import UserAdd from "./component/UserAdd";
import Product from "./component/Product";
import ProductAdd from "./component/ProductAdd";
import ProductUpdate from "./component/ProductUpdate";
import ProductMaterials from "./component/ProductMaterial";
import ProductMaterialAdd from "./component/ProductMaterialAdd";
import AdminLogin from "./component/AdminLogin";
import Category from "./component/Category";
import CategoryAdd from "./component/CategoryAdd";
import CategoryUpdate from "./component/CategoryUpdate";
import Voucher from "./component/VoucherAdmin";
import Order from "./component/Order";
import FlashSales from "./component/FlashSale";
import FlashSaleAdd from "./component/FlashSaleAdd";
import FlashSaleUpdate from "./component/FlashSaleUpdate";
import FlashSaleProduct from "./component/FlashSaleProduct";
import FlashSaleProductAdd from "./component/FlashSaleProductAdd";
import FlashSaleProductUpdate from "./component/FlashSaleProductUpdate";
import NewsAdmin from "./component/NewsAdmin";
import NewsAdminAdd from "./component/NewsAdminAdd";
import NewsAdminUpdate from "./component/NewsAdminUpdate";
import NewscategoryAdmin from "./component/NewsCategoryAdmin";
import NewsCategoryAdminAdd from "./component/NewCategoryAdminAdd";
import NewsCategoryAdminUpdate from "./component/NewCategoryAdminUpdate";
import Brand from "./component/Brand";
import BrandAdd from "./component/BrandAdd";
import BrandUpdate from "./component/BrandUpdate";
import "./App.css";

function Layout() {
  const location = useLocation();

  // Nếu là trang login thì không render Header và Sidebar
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {!isLoginPage && <Header />}

      <div className="main">
        {!isLoginPage && <Sidebar />}

        <div className="content">
          <Routes>
            {/* Trang Login */}
            <Route path="/login" element={<AdminLogin />} />

            {/* Dashboard Admin */}
            <Route path="/" element={<Dashboard />} />

            {/* User */}
            <Route path="/users" element={<User />} />
            <Route path="/users/update/:id" element={<UserUpdate />} />
            <Route path="/users/add" element={<UserAdd />} />

            {/* Product */}
            <Route path="/products" element={<Product />} />
            <Route path="/products/create" element={<ProductAdd />} />
            <Route path="/products/update/:id" element={<ProductUpdate />} />

            {/* ProductMaterial */}
            <Route path="/product-material" element={<ProductMaterials />} />
            <Route path="/product-material/add" element={<ProductMaterialAdd />} />
            {/* <Route path="/product/update/:id" element={<ProductUpdate />} /> */}
            {/* Brand */}
            <Route path="/brand" element={<Brand />} />
            <Route path="/brand/add" element={<BrandAdd />} />
            <Route path="/brand/update/:id" element={<BrandUpdate />} />
            {/* category*/}
            <Route path="/category" element={<Category />} />
            <Route path="/category/create" element={<CategoryAdd />} />
            <Route path="/category/update/:id" element={<CategoryUpdate />} />

            {/* voucher*/}
            <Route path="/voucher" element={<Voucher />} />
            <Route path="/order" element={<Order />} />
            {/* <Route path="/category/add" element={<categoryAdd />} />
            <Route path="/category/update/:id" element={<categoryUpdate />} /> */}
            {/* flashSale*/}
            <Route path="/flash-sale" element={<FlashSales />} />
            <Route path="/flash-sale/add" element={<FlashSaleAdd />} />
            <Route path="/flash-sale/update/:id" element={<FlashSaleUpdate />} />
            {/* flashSale*/}
            <Route path="/flash-sale-products" element={<FlashSaleProduct />} />
            <Route path="/flash-sale-products/add" element={<FlashSaleProductAdd />} />
            <Route path="/flash-sale-products/update/:id" element={<FlashSaleProductUpdate />} />
            {/* News */}
            <Route path="/news" element={<NewsAdmin />} />
            <Route path="/news/add" element={<NewsAdminAdd />} />
            <Route path="/news/update/:id" element={<NewsAdminUpdate />} />

            {/* Newscategory */}
            <Route path="/news-category" element={<NewscategoryAdmin />} />
            <Route path="/news-category/add" element={<NewsCategoryAdminAdd />} />
            <Route path="/news-category/update/:id" element={<NewsCategoryAdminUpdate />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
