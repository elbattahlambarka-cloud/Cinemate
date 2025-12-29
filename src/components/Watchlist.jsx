import React from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../App'
import MovieList from './MovieList'

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Watchlist</h1>
            <p className="text-gray-400">
              {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              to="/" 
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium"
            >
              ← Back to Search
            </Link>
            
            {watchlist.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear entire watchlist?')) {
                    watchlist.forEach(movie => removeFromWatchlist(movie.imdbID))
                  }
                }}
                className="px-5 py-2.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-xl transition-colors font-medium"
              >
                🗑️ Clear All
              </button>
            )}
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className="bg-gray-800/30 rounded-2xl p-12 text-center border-2 border-dashed border-gray-700">
            <div className="text-7xl mb-6">🎬</div>
            <h2 className="text-2xl font-bold text-gray-300 mb-3">Your watchlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Add movies by clicking the + button on any movie
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div>
            <MovieList movies={watchlist} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist