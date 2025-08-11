import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.less";

const getImageSrc = (image) => {
  // Remove '/products/' and use assets folder
  const fileName = image.replace("/products/", "");
  return new URL(`../../assets/${fileName}`, import.meta.url).href;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const brandSlug = product.brand.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${product.id}-${brandSlug}`);
  };

  return (
    <div className="product-card">
      <h3 className="product-title">{product.brand}</h3>
      <img src={getImageSrc(product.image)} alt={product.brand} />
      <div className="product-card-footer">
        <div className="price">${product.price || "N/A"}</div>
        <button className="cta-btn" onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
