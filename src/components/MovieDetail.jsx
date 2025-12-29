import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

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

  const posterUrl = movie && movie.Poster !== 'N/A' && !imageError
    ? movie.Poster
    : 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!movie || movie.Response === 'False') {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-300">Movie not found!</h2>
        <Link to="/" className="text-amber-500 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-6"
      >
        ← Back to Search
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Poster */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full rounded-2xl shadow-2xl"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.Title} <span className="text-amber-500">({movie.Year})</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                {movie.Rated}
              </span>
              <span className="text-gray-300">{movie.Runtime}</span>
              <span className="text-amber-500">⭐ {movie.imdbRating}/10</span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Plot</h3>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Genre</h4>
                <p className="text-gray-300">{movie.Genre}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Director</h4>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Cast</h4>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Language</h4>
                <p className="text-gray-300">{movie.Language}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-500 mb-2">Awards</h4>
                <p className="text-gray-300">{movie.Awards}</p>
              </div>
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div>
                  <h4 className="text-lg font-semibold text-amber-500 mb-2">Box Office</h4>
                  <p className="text-gray-300">{movie.BoxOffice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail