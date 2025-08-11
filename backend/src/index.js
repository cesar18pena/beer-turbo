import express from "express";
import productsRouter from "./products/products.router.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api", productsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
