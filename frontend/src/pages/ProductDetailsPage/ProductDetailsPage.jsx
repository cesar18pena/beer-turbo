import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailsPage.less";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products`);
        const products = await response.json();
        const found = products.find((p) => {
          const id = productId.split("-")[0]; // Extract the ID part before the brand name
          return p.id.toString() === id;
        });
        if (!found) {
          throw new Error("Product not found");
        }
        setProduct(found);
        setSelectedSku(found.skus[0]?.code);
      } catch (err) {
        setError(err.message);
        window.alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!selectedSku) return;

    const fetchStockPrice = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/stock-price/${selectedSku}`
        );
        const data = await response.json();
        setStockInfo(data);
      } catch (err) {
        setError("Failed to fetch stock information");
        window.alert("Failed to fetch stock information");
      }
    };

    fetchStockPrice();
    const interval = setInterval(fetchStockPrice, 5000);

    return () => clearInterval(interval);
  }, [selectedSku]);

  const handleSkuSelect = (skuCode) => {
    setSelectedSku(skuCode);
  };

  const handleAddToCart = () => {
    window.alert(`Adding to cart: ${product.brand} - ${selectedSku}
Price: $${stockInfo?.price ? (stockInfo.price / 100).toFixed(2) : "N/A"}
Stock: ${stockInfo?.stock || "N/A"}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate("/products")}>
        ←
      </button>
      <h1 className="page-title">Detail</h1>

      <div className="product-header">
        <img
          src={
            new URL(
              `../../assets/${product.image.replace("/products/", "")}`,
              import.meta.url
            ).href
          }
          alt={product.brand}
        />
        <h1>{product.brand}</h1>
      </div>

      <div className="product-meta">
        <span>Origin: {product.origin}</span>
        <span className="separator">|</span>
        <span>Stock: {stockInfo?.stock || "Loading..."}</span>
      </div>

      <div className="product-description">
        <h2>Description</h2>
        <p>
          {product.information.slice(0, 150)}
          {product.information.length > 150 && (
            <a
              href="#"
              className="read-more"
              onClick={(e) => {
                e.preventDefault();
                window.alert(product.information);
              }}
            >
              Read more
            </a>
          )}
        </p>
      </div>

      <div className="product-variants">
        <h2>Size</h2>
        <div className="sku-list">
          {product.skus.map((sku) => (
            <button
              key={sku.code}
              className={`sku-button ${
                selectedSku === sku.code ? "selected" : ""
              }`}
              onClick={() => handleSkuSelect(sku.code)}
            >
              {sku.name}
            </button>
          ))}
        </div>
      </div>

      {stockInfo && (
        <div className="product-purchase">
          <div className="price">{(stockInfo.price / 100).toFixed(2)}</div>
          <div className="cart-actions">
            <div className="bag-icon">
              <img
                src={
                  new URL(`../../assets/icons/Beer.png`, import.meta.url).href
                }
                alt="Cart"
              />
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
