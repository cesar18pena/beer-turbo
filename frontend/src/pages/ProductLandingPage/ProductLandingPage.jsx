import React, { useEffect, useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import Header from "../../components/Header";
import "./ProductLandingPage.less";

const PLP = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with actual API call
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="plp-page">
      <Header userName="Mr. Michael" />
      <h2>Our Products</h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default PLP;
