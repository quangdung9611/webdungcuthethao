const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ==================== FOLDER LƯU ẢNH ====================
const uploadFolder = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

exports.uploadSingleImage = upload.single('image'); // middleware upload ảnh chính

// ==================== PRODUCT CRUD ====================

// Lấy tất cả sản phẩm
exports.getAllProduct = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Lấy sản phẩm theo ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE product_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(results[0]);
  });
};

// Lấy sản phẩm theo slug
exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  db.query('SELECT * FROM products WHERE slug = ?', [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(results[0]);
  });
};

// Lấy sản phẩm theo category slug
exports.getProductsByCategorySlug = (req, res) => {
  const { slug } = req.params;
  const sql = `
    SELECT p.* FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE c.slug = ?
  `.replace(/\s+/g, ' ').trim();

  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
// Lấy sản phẩm theo Brands 
exports.getProductsByBrands = (req, res) => {
  const { slug } = req.params;
  const sql = `
    SELECT p.* FROM products p
    JOIN brands br ON p.brand_id = br.brand_id
    WHERE br.slug = ?
    `
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

// Lấy 5 sản phẩm mới nhất theo category slug (M)
exports.getNewestProductsByCategorySlug = (req, res) => {
  const { slug } = req.params;
  const sql = `
    SELECT p.* FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE c.slug = ?
    ORDER BY p.created_at DESC
    LIMIT 6
  `.replace(/\s+/g, ' ').trim();

  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
// ==================== CREATE / UPDATE PRODUCT ====================

// Tạo sản phẩm mới (chỉ thông tin cơ bản + ảnh chính)
exports.createProduct = (req, res) => {
  const { category_id, brand_id, name, slug, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!category_id || !brand_id || !name || !slug || !price || !stock || !image) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc để tạo sản phẩm' });
  }

  const sql = `
    INSERT INTO products (category_id, brand_id, name, slug, description, price, stock, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `.replace(/\s+/g, ' ').trim();

  db.query(sql, [category_id, brand_id, name, slug, description, price, stock, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Thêm sản phẩm thành công', product_id: result.insertId });
  });
};

// Cập nhật sản phẩm (chỉ thông tin cơ bản + ảnh chính)
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { category_id, brand_id, name, slug, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  const sql = `
    UPDATE products 
    SET category_id=?, brand_id=?, name=?, slug=?, description=?, price=?, stock=?, image=? 
    WHERE product_id=?
  `.replace(/\s+/g, ' ').trim();

  db.query(sql, [category_id, brand_id, name, slug, description, price, stock, image, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cập nhật sản phẩm thành công' });
  });
};

// Xóa sản phẩm + xóa luôn các materials nếu có
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM materials WHERE product_id=?', [id], (err1) => {
    if (err1) return res.status(500).json({ error: err1.message });
    db.query('DELETE FROM products WHERE product_id=?', [id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: 'Xóa sản phẩm thành công' });
    });
  });
};
