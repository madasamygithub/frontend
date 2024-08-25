import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('https://bajaj-j014.onrender.com/bfhl', parsedInput);
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format or API call failed');
    }
  };

  const handleDropdownChange = (event) => {
    const { options } = event.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedOptions(selectedValues);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const displayData = {};

    if (selectedOptions.includes('Numbers')) {
      displayData.numbers = numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      displayData.alphabets = alphabets;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      displayData.highest_lowercase_alphabet = highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <textarea
        rows="10"
        cols="30"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <select multiple onChange={handleDropdownChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
};

export default App;
