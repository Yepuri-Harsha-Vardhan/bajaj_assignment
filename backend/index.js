const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// POST Endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  // Check if 'data' is an array
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input, expected an array of data",
    });
  }

  const userId = "john_doe_17091999";
  const email = "john@xyz.com";
  const rollNumber = "ABCD123";

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = "";

  data.forEach((item) => {
    if (!isNaN(item) && typeof item === "string") {
      numbers.push(item);
    } else if (typeof item === "string" && item.length === 1) {
      alphabets.push(item);
      if (item >= "a" && item <= "z") {
        if (
          highestLowercaseAlphabet === "" ||
          item > highestLowercaseAlphabet
        ) {
          highestLowercaseAlphabet = item;
        }
      }
    }
  });

  res.status(200).json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

// Start the server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
