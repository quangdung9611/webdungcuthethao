const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductControllers");

// ==========================
// PRODUCT ROUTES
// ==========================

// 1. Lấy tất cả sản phẩm
router.get("/", productController.getAllProduct);

// 2. Lấy sản phẩm theo slug
router.get("/slug/:slug", productController.getProductBySlug);

// 3. Lấy sản phẩm theo category slug
router.get("/category/:slug", productController.getProductsByCategorySlug);

// 4. Lấy sản phẩm theo Brand Slug 
router.get("/brand/:slug", productController.getProductsByBrands)

// 5. Lấy sản phẩm theo ID (ĐỂ CUỐI CÙNG)
router.get("/:id", productController.getProductById);

// 6. Lấy 5 sản phẩm mới nhất theo category
router.get('/category/:slug/newest', productController.getNewestProductsByCategorySlug);

// 7. Tạo sản phẩm mới
router.post("/create", productController.uploadSingleImage, productController.createProduct);

// 8. Cập nhật sản phẩm
router.put("/update/:id", productController.uploadSingleImage, productController.updateProduct);

// 9. Xóa sản phẩm
router.delete("/delete/:id", productController.deleteProduct);



module.exports = router;
