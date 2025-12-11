import { Link } from 'react-router-dom';

function MovieCard({ movie, addToWatchlist, removeFromWatchlist, watchlist, isWatchlistPage }) {
  const isInWatchlist = watchlist?.find((m) => m.imdbID === movie.imdbID);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
        <p className="text-gray-400 mb-3">{movie.Year}</p>
        <button
          onClick={() => isWatchlistPage ? removeFromWatchlist(movie.imdbID) : (isInWatchlist ? removeFromWatchlist(movie.imdbID) : addToWatchlist(movie))}
          className={`w-full py-2 rounded ${isWatchlistPage || isInWatchlist ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isWatchlistPage || isInWatchlist ? 'Remove -' : 'Add to Watchlist +'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;