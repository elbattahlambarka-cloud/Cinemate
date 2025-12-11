import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function SearchResults({ addToWatchlist, watchlist }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'inception';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'YOUR_OMDB_API_KEY'; // Replace with your key

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
      setMovies(data.Search || []);
      setLoading(false);
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Search Results for '{query}'</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} addToWatchlist={addToWatchlist} watchlist={watchlist} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 mb-4">No movies found. Try another search!</p>
          <img src="https://via.placeholder.com/200?text=No+Results" alt="No results" className="mx-auto" />
        </div>
      )}
    </div>
  );
}

export default SearchResults;