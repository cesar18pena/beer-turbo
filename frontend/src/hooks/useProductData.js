import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3001/api";

/**
 * Custom hook to fetch and manage product data and stock/price information
 * @param {string} productId - The ID of the product to fetch
 * @returns {Object} Product data, loading state, error state, and stock information
 */
export const useProductData = (productId) => {
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        const products = await response.json();

        const id = productId.split("-")[0]; // Extract the ID part before the brand name
        const found = products.find((p) => p.id.toString() === id);

        if (!found) {
          throw new Error("Product not found");
        }

        setProduct(found);
        setSelectedSku(found.skus[0]?.code);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }

    return () => {
      // Cleanup if needed
      setProduct(null);
      setSelectedSku(null);
      setStockInfo(null);
    };
  }, [productId]);

  // Fetch and update stock/price information
  useEffect(() => {
    let intervalId;

    const fetchStockPrice = async () => {
      if (!selectedSku) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/stock-price/${selectedSku}`
        );
        const data = await response.json();
        setStockInfo(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch stock information");
        console.error("Error fetching stock info:", err);
      }
    };

    if (selectedSku) {
      fetchStockPrice();
      intervalId = setInterval(fetchStockPrice, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedSku]);

  const handleSkuSelect = (skuCode) => {
    setSelectedSku(skuCode);
  };

  return {
    product,
    loading,
    error,
    stockInfo,
    selectedSku,
    handleSkuSelect,
  };
};
