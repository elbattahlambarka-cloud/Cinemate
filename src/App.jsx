import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import Watchlist from './components/Watchlist'

// Create Watchlist Context
const WatchlistContext = createContext()

// Custom hook to use watchlist
export const useWatchlist = () => {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider')
  }
  return context
}

// Watchlist Provider Component
const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cinemate-watchlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cinemate-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (movie) => {
    if (!watchlist.some(item => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie])
    }
  }

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter(movie => movie.imdbID !== imdbID))
  }

  const isInWatchlist = (imdbID) => {
    return watchlist.some(movie => movie.imdbID === imdbID)
  }

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  )
}

// Main App Component
function App() {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch movies when searchQuery changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery.trim()) {
        setMovies([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&type=movie`
        )
        const data = await response.json()

        if (data.Response === 'True') {
          setMovies(data.Search || [])
        } else {
          setMovies([])
          setError(data.Error || 'No movies found')
        }
      } catch (err) {
        setError('Failed to fetch movies. Please check your connection.')
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchMovies()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <WatchlistProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
          {/* Test Div - Remove after confirming Tailwind works */}
          <div className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white m-4">
            <h1 className="text-3xl font-bold">🎬 TAILWIND TEST - If you see this with colors, Tailwind works!</h1>
            <p className="mt-2 text-xl">Purple/pink gradient = Tailwind is working</p>
            <div className="mt-4 flex gap-4">
              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-xl font-bold text-black">
                Amber Button
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold">
                Gray Button
              </button>
            </div>
          </div>

          <Header 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          
          <Routes>
            {/* Home Page */}
            <Route path="/" element={
              <div>
                {/* Hero Section when no search */}
                {!searchQuery && movies.length === 0 && !loading && (
                  <div className="text-center py-20 px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">
                      Discover <span className="text-amber-500">Movies</span> You'll Love
                    </h1>
                    <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
                      Search for any movie, save to your watchlist, and get personalized recommendations.
                    </p>
                    <div className="max-w-md mx-auto">
                      <input
                        type="text"
                        placeholder="Try 'The Godfather', 'Interstellar', or 'Parasite'..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 text-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Movie Results */}
                <main className="container mx-auto px-4 py-8">
                  {loading && (
                    <div className="flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                  )}

                  {error && !loading && (
                    <div className="text-center py-12">
                      <p className="text-red-400 text-xl">{error}</p>
                    </div>
                  )}

                  {!loading && !error && movies.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                      <p className="text-gray-300 text-2xl">No movies found for "{searchQuery}"</p>
                    </div>
                  )}

                  {!loading && movies.length > 0 && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-6">
                        Results for "<span className="text-amber-500">{searchQuery}</span>"
                      </h2>
                      <MovieList movies={movies} />
                    </div>
                  )}
                </main>
              </div>
            } />

            {/* Movie Details Page */}
            <Route path="/movies/:id" element={<MovieDetail />} />

            {/* Watchlist Page */}
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  )
}

export default App