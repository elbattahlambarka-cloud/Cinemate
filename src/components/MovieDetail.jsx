import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MovieDetail({ addToWatchlist, removeFromWatchlist, watchlist }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = 'YOUR_OMDB_API_KEY'; // Replace with your key

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-center p-6">Loading...</p>;

  const isInWatchlist = watchlist.find((m) => m.imdbID === movie.imdbID);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={movie.Poster} alt={movie.Title} className="w-full md:w-80 rounded-lg shadow-lg" />
        <div>
          <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-400 mb-4">{movie.Year} · {movie.Rated} · {movie.Runtime}</p>
          <p className="mb-4">{movie.Genre}</p>
          <button
            onClick={() => isInWatchlist ? removeFromWatchlist(movie.imdbID) : addToWatchlist(movie)}
            className={`px-6 py-3 rounded mb-4 ${isInWatchlist ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
          <p className="text-yellow-400 mb-4">⭐ {movie.imdbRating} / 10 (IMDb)</p>
          <p className="mb-4">{movie.Plot}</p>
          <p className="text-gray-400">Director: {movie.Director} | Cast: {movie.Actors}</p>
          <Link to="/search" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">← Back to Results</Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;