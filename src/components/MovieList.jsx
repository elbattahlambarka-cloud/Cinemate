import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ movies }) => {
  // Remove duplicates based on imdbID
  const uniqueMovies = movies.filter((movie, index, self) =>
    index === self.findIndex(m => m.imdbID === movie.imdbID)
  )

  if (!uniqueMovies || uniqueMovies.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {uniqueMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList