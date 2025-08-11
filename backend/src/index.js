const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
