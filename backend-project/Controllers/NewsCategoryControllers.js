const db = require("../db");

// ==================== LẤY TẤT CẢ DANH MỤC ====================
const getAllCategories = (req, res) => {
  const sql = "SELECT * FROM news_categories ORDER BY category_id ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh mục:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.json(results);
  });
};

// ==================== LẤY DANH MỤC THEO ID ====================
const getCategoryById = (req, res) => {
  const sql = "SELECT * FROM news_categories WHERE category_id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh mục:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    if (!results.length) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    res.json(results[0]);
  });
};

// ==================== TẠO DANH MỤC MỚI ====================
const createCategory = (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Tên và slug là bắt buộc" });
  }

  const sql = "INSERT INTO news_categories (name, slug) VALUES (?, ?)";
  db.query(sql, [name, slug], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.status(201).json({ message: "Thêm danh mục thành công", category_id: result.insertId });
  });
};

// ==================== CẬP NHẬT DANH MỤC ====================
const updateCategory = (req, res) => {
  const { name, slug } = req.body;

  const sql = `
    UPDATE news_categories
    SET name = ?, slug = ?
    WHERE category_id = ?
  `;
  db.query(sql, [name, slug, req.params.id], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật danh mục:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    res.json({ message: "Cập nhật danh mục thành công" });
  });
};

// ==================== XÓA DANH MỤC ====================
const deleteCategory = (req, res) => {
  const sql = "DELETE FROM news_categories WHERE category_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa danh mục:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    res.json({ message: "Xóa danh mục thành công" });
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
