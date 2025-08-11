import { getAllProducts, getStockPriceBySku } from "./products.service.js";

export function getProducts(req, res) {
  try {
    const products = getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export function getStockPrice(req, res) {
  const { sku } = req.params;
  const data = getStockPriceBySku(sku);
  if (!data) {
    return res.status(404).json({ error: "SKU not found" });
  }
  res.json({ sku, price: data.price, stock: data.stock });
}
