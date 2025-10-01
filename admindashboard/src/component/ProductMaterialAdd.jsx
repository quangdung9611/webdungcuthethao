import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const variantSuggestions = {
  "ao-thun": { sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Đen", "Trắng", "Đỏ", "Xanh"] },
  "giay-the-thao": { sizes: ["38", "39", "40", "41", "42", "43", "44"], colors: ["Đen", "Trắng", "Xám"] },
  "vot-cau-long": { sizes: ["3U", "4U"], colors: [] },
};

function ProductMaterialAdd() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorFiles, setColorFiles] = useState({});
  const [stock, setStock] = useState(0);

  // ==== Load products & categories ====
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/category")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // ==== Khi chọn slug ====
  useEffect(() => {
    if (!selectedCategory) return;
    const category = categories.find(c => c.category_id === parseInt(selectedCategory));
    if (!category) return;
    const variant = variantSuggestions[category.slug] || { sizes: [], colors: [] };
    setSizes(variant.sizes);
    setColors(variant.colors);
    setSelectedSizes([]);
    setSelectedColors([]);
    setColorFiles({});
  }, [selectedCategory, categories]);

  const toggleSelection = (key, value) => {
    if (key === "selectedSizes") {
      setSelectedSizes(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else {
      setSelectedColors(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  const handleColorFileChange = (e, color) => {
    setColorFiles(prev => ({ ...prev, [color]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !selectedCategory || (selectedSizes.length === 0 && selectedColors.length === 0)) {
      alert("Vui lòng chọn đầy đủ thông tin");
      return;
    }

    const sizesToIterate = selectedSizes.length ? selectedSizes : [null];
    const colorsToIterate = selectedColors.length ? selectedColors : [null];

    const materialsArray = [];
    sizesToIterate.forEach(size => {
      colorsToIterate.forEach(color => {
        materialsArray.push({
          color,
          size,
          stock,
          image: color ? colorFiles[color]?.name : null
        });
      });
    });

    const data = new FormData();
    data.append("product_id", selectedProduct);
    data.append("variants", JSON.stringify(materialsArray));
    Object.keys(colorFiles).forEach(color => {
      if (colorFiles[color]) data.append(`colorFile-${color}`, colorFiles[color]);
    });

    try {
      await axios.post("http://localhost:5000/api/product-materials", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      //   alert("Thêm biến thể thành công!");
      navigate("/product-material");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm biến thể");
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm biến thể sản phẩm</h2>
      <form onSubmit={handleSubmit}>

        <label>Tên sản phẩm</label>
        <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} required>
          <option value="">-- Chọn sản phẩm --</option>
          {products.map(p => (
            <option key={p.product_id} value={p.product_id}>{p.name}</option>
          ))}
        </select>

        <label>Slug danh mục</label>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} required>
          <option value="">-- Chọn slug --</option>
          {categories.map(c => (
            <option key={c.category_id} value={c.category_id}>{c.slug}</option>
          ))}
        </select>

        {sizes.length > 0 && (
          <div>
            <label>Kích cỡ:</label>
            <div className="button-group">
              {sizes.map(size => (
                <button type="button" key={size} className={selectedSizes.includes(size) ? "active" : ""} onClick={() => toggleSelection("selectedSizes", size)}>{size}</button>
              ))}
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div>
            <label>Màu sắc:</label>
            <div className="button-group">
              {colors.map(color => (
                <div key={color}>
                  <button type="button" className={selectedColors.includes(color) ? "active" : ""} onClick={() => toggleSelection("selectedColors", color)}>{color}</button>
                  {selectedColors.includes(color) && <input type="file" onChange={e => handleColorFileChange(e, color)} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <label>Số lượng tồn kho</label>
        <input type="number" value={stock} onChange={e => setStock(parseInt(e.target.value) || 0)} required />

        <button type="submit">Thêm biến thể</button>
      </form>
    </div>
  );
}

export default ProductMaterialAdd;
