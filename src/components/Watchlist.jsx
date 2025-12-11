import MovieCard from './MovieCard';

function Watchlist({ removeFromWatchlist, watchlist }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} removeFromWatchlist={removeFromWatchlist} watchlist={watchlist} isWatchlistPage />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 mb-4">Your watchlist is empty. Go find some movies!</p>
          <img src="https://via.placeholder.com/200?text=Empty+Watchlist" alt="Empty watchlist" className="mx-auto mb-4" />
          <a href="/" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded inline-block">Go find some movies!</a>
        </div>
      )}
    </div>
  );
}

export default Watchlist;