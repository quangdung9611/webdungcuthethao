const db = require('../db');
const multer = require('multer');
const path = require('path');

// Cấu hình thư mục lưu ảnh
const uploadFolder = path.join(__dirname, '../public/images');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Middleware upload ảnh
exports.uploadImage = upload.single('HinhAnh');

// Lấy tất cả loại sản phẩm
exports.getAllCategories = (req, res) => {
  const sql = `SELECT category_id, name,slug,HinhAnh FROM categories`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
// Lấy 1 category theo ID
exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT category_id, name, slug, HinhAnh FROM categories WHERE category_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Không tìm thấy loại sản phẩm" });
    res.json(results[0]);
  });
};

// Thêm loại sản phẩm mới
exports.createCategory = (req, res) => {
  const { name, slug } = req.body;
  const HinhAnh = req.file ? req.file.filename : '';

  if (!name || !slug) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const sql = `INSERT INTO categories (name,slug,HinhAnh ) VALUES (?, ?, ?)`;
  db.query(sql, [name, slug, HinhAnh], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Thêm loại sản phẩm thành công", id: result.insertId });
  });
};

// Xóa loại sản phẩm
exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM categories WHERE category_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa loại sản phẩm thành công" });
  });
};

// Cập nhật loại sản phẩm
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, slug } = req.body;
  const HinhAnh = req.file ? req.file.filename : req.body.HinhAnh;

  const sql = `UPDATE categories SET name = ?, slug = ?, HinhAnh = ? WHERE category_id = ?`;
  db.query(sql, [name, slug, HinhAnh, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật loại sản phẩm thành công" });
  });
};
