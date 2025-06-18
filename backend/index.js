const express = require("express");
const app = express();
const PORT = 3002;

const cors = require("cors");

// import what boards exported
const boardRoutes = require("./routes/boards");
// import what cards exported
const cardRoutes = require("./routes/cards");

app.use(cors());
app.use(express.json());
app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
