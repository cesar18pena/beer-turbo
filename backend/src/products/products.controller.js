import { getAllProducts } from "./products.service.js";

export function getProducts(req, res) {
  try {
    const products = getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
