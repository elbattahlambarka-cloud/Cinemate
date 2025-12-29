import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../App'

const MovieCard = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const [imageError, setImageError] = useState(false)
  const inWatchlist = isInWatchlist(movie.imdbID)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleWatchlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID)
    } else {
      addToWatchlist(movie)
    }
  }

  const posterUrl = movie.Poster !== 'N/A' && !imageError 
    ? movie.Poster 
    : 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'

  return (
    <div className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Watchlist Button */}
      <button 
        onClick={handleWatchlistToggle}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-colors ${
          inWatchlist 
            ? 'bg-amber-500 hover:bg-amber-600 text-black' 
            : 'bg-gray-900/80 hover:bg-amber-500 text-white'
        }`}
        title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {inWatchlist ? '✓' : '+'}
      </button>

      {/* Movie Poster */}
      <Link to={`/movies/${movie.imdbID}`}>
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.Title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-bold text-white truncate mb-1">{movie.Title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-amber-500 font-semibold">{movie.Year}</span>
            <span className="text-gray-400 text-sm">{movie.Type}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard