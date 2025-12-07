import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('inception'); // Hardcoded for testing
  const [results, setResults] = useState(null);

  const fetchMovies = async () => {
    const API_KEY = 'a5b9ce5b'; 
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data); // Logs the API response to prove it works
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">CineMate - Movie Database</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-2 w-full bg-gray-800 text-white"
        placeholder="Search for a movie..."
      />
      <button
        onClick={fetchMovies}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Search
      </button>
      {results && (
        <div className="mt-4">
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;