const express = require("express");
const router = express.Router();
const newsCategoryController = require("../Controllers/NewsCategoryControllers");

// Lấy tất cả danh mục
router.get("/", newsCategoryController.getAllCategories);

// Lấy 1 danh mục theo ID
router.get("/:id", newsCategoryController.getCategoryById);

// Thêm mới danh mục
router.post("/", newsCategoryController.createCategory);

// Cập nhật danh mục
router.put("/:id", newsCategoryController.updateCategory);

// Xóa danh mục
router.delete("/:id", newsCategoryController.deleteCategory);

module.exports = router;
