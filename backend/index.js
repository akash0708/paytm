const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mainRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
