const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Constants
const CONSTANT1 = 0.5;
const CONSTANT2 = 1;

app.use(cors());
app.use(express.json());

// Endpoint to calculate result
app.post("/calculate", (req, res) => {
  const { weight } = req.body;

  if (weight >= 0 && weight <= 1) {
    const quotient = CONSTANT1 / CONSTANT2;
    const result = quotient * weight;
    res.json({ result });
  } else {
    res.status(400).json({ error: "Weight must be between 0 and 1" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
