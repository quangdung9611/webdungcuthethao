const express = require("express");
const router = express.Router();
const newsController = require("../Controllers/NewsControllers");

// Lấy danh sách bài viết theo danh mục
router.get("/category/:slug", newsController.getNewsByCategorySlug);

// Lấy bài viết theo ID
router.get("/id/:id", newsController.getNewsById);

// Lấy bài viết theo slug
router.get("/:slug", newsController.getNewsBySlug);

// CRUD routes
router.get("/", newsController.getAllNews);
router.post("/", newsController.uploadImage, newsController.createNews);
router.put("/id/:id", newsController.uploadImage, newsController.updateNews);
router.delete("/id/:id", newsController.deleteNews);

module.exports = router;
