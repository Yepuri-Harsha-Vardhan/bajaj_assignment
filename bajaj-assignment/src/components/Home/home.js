import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedFilters(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace curly quotes with standard quotes
      const sanitizedJsonInput = jsonInput.replace(/[“”]/g, '"');

      // Parse the input and validate it
      const parsedInput = JSON.parse(sanitizedJsonInput);

      // Ensure parsedInput.data is an array
      if (!Array.isArray(parsedInput.data)) {
        throw new Error("Invalid format: 'data' should be an array.");
      }

      // Stringify the data for the POST request
      const stringifiedData = JSON.stringify({ data: parsedInput.data });

      const response = await axios.post(
        "https://bajaj-assignment-kappa.vercel.app/bfhl",
        stringifiedData,
        { headers: { "Content-Type": "application/json" } }
      );

      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Invalid input");
      console.error("Error submitting data:", error);
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    const results = [];

    if (selectedFilters.includes("Numbers") && numbers) {
      results.push(`Numbers: ${numbers.join(", ")}`);
    }
    if (selectedFilters.includes("Alphabets") && alphabets) {
      results.push(`Alphabets: ${alphabets.join(", ")}`);
    }
    if (
      selectedFilters.includes("Highest Lowercase Alphabet") &&
      highest_lowercase_alphabet
    ) {
      results.push(`Highest Lowercase Alphabet: ${highest_lowercase_alphabet}`);
    }

    return (
      <div>
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Use your roll number as the title */}
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter JSON input here"
          value={jsonInput}
          onChange={handleJsonInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <label>Select Filters:</label>
        <select multiple onChange={handleFilterChange} value={selectedFilters}>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest Lowercase Alphabet">
            Highest Lowercase Alphabet
          </option>
        </select>
      </div>
      <div>
        <h2>Filtered Response</h2>
        {renderFilteredResponse()}
      </div>
    </div>
  );
}

export default Home;
