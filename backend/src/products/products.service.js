import products from "../constants/products.js";
import stockPriceData from "../constants/stock-price.js";

export function getAllProducts() {
  return products;
}

export function getStockPriceBySku(sku) {
  return stockPriceData[sku] || null;
}
