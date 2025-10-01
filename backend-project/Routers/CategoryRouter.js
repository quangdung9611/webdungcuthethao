const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/CategoryControllers');

// Middleware upload ảnh
const { uploadImage } = CategoryController;

// 1. Lấy tất cả loại sản phẩm
router.get('/', CategoryController.getAllCategories);

// 2. Lấy 1 loại sản phẩm theo ID
router.get('/:id', CategoryController.getCategoryById);

// 3. Thêm loại sản phẩm mới
router.post('/', uploadImage, CategoryController.createCategory);

// 4. Cập nhật loại sản phẩm
router.put('/:id', uploadImage, CategoryController.updateCategory);

// 5. Xóa loại sản phẩm
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
