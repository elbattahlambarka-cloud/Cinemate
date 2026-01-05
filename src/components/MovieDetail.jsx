import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../App'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inWatchlist = movie ? isInWatchlist(movie.imdbID) : false

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const apiKey = import.meta.env.VITE_OMDB_API_KEY
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
        )
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  const handleImageError = () => {
    setImageError(true)
  }

  const handleWatchlistToggle = () => {
    if (!movie) return
    
    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID)
    } else {
      addToWatchlist(movie)
    }
  }

  const handleBack = () => {
    navigate(-1) // Go back to previous page
  }

  const posterUrl = movie && movie.Poster !== 'N/A' && !imageError
    ? movie.Poster
    : 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!movie || movie.Response === 'False') {
    return (
      <div className="text-center py-20 bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-300">Movie not found!</h2>
        <Link to="/" className="text-amber-500 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar with Back Button and Title */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-300 hover:text-white flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Results
          </button>
          
          <h1 className="text-xl font-bold text-center flex-1">{movie.Title}</h1>
          
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Poster */}
          <div className="lg:w-2/5">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="mb-6">
                <img
                  src={posterUrl}
                  alt={movie.Title}
                  className="w-full rounded-xl shadow-lg"
                  onError={handleImageError}
                />
              </div>
              
              <div className="space-y-4">
                {/* Genre Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">GENRE</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(', ').map(genre => (
                      <span key={genre} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Movie Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">RELEASED</h3>
                    <p className="font-medium">{movie.Year}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">RUNTIME</h3>
                    <p className="font-medium">{movie.Runtime}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">RATED</h3>
                    <p className="font-medium">{movie.Rated}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">LANGUAGE</h3>
                    <p className="font-medium">{movie.Language.split(', ')[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-3/5">
            {/* Movie Title and Rating */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold">{movie.Title}</h1>
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl">
                  <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div>
                    <div className="text-2xl font-bold">{movie.imdbRating}/10</div>
                    <div className="text-sm text-gray-400">IMDb</div>
                  </div>
                </div>
              </div>
              
              <div className="text-xl text-gray-300 mb-6">
                <span className="text-amber-500 font-semibold">{movie.Year}</span> • {movie.Rated} • {movie.Runtime}
              </div>
            </div>

            {/* Plot Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">SYNOPSIS</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            {/* Cast and Crew */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">CAST & CREW</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-400 font-medium mb-2">DIRECTOR</h3>
                  <p className="text-lg">{movie.Director}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 font-medium mb-2">WRITER</h3>
                  <p className="text-lg">{movie.Writer.split(', ')[0]}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-gray-400 font-medium mb-2">MAIN CAST</h3>
                  <p className="text-lg">{movie.Actors}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">DETAILS</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-gray-400 font-medium mb-2">AWARDS</h3>
                  <p>{movie.Awards}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 font-medium mb-2">BOX OFFICE</h3>
                  <p>{movie.BoxOffice !== 'N/A' ? movie.BoxOffice : 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 font-medium mb-2">PRODUCTION</h3>
                  <p>{movie.Production || movie.Country}</p>
                </div>
              </div>
            </div>

            {/* Watchlist Button */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={handleWatchlistToggle}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  inWatchlist
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-black'
                }`}
              >
                {inWatchlist ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-800 text-center text-gray-400">
        <p>© All Rights Reserved</p>
        <p className="mt-2">Built as a Capstone Project by Lambarka.</p>
      </footer>
    </div>
  )
}

export default MovieDetail