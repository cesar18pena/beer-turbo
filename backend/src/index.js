import express from "express";
import cors from "cors";
import productsRouter from "./products/products.router.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL allowlist
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api", productsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
