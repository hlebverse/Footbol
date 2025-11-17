const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("УРАААААА");
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Backend running at http://localhost:${port}`)
);
