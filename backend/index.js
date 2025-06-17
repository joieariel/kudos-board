const express = require("express");
const app = express();
const PORT = 3000;

// import what boards exported
const routes = require("./routes/boards");

app.use(express.json());
app.use("/boards", routes);

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
