import { Router } from "express";
import { getProducts, getStockPrice } from "./products.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/stock-price/:sku", getStockPrice);

export default router;
