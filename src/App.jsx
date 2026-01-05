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
        const encodedQuery = encodeURIComponent(searchQuery)
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodedQuery}&type=movie`
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

    // Only search if query is not empty
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        fetchMovies()
      }, 500)

      return () => clearTimeout(timer)
    } else {
      // Clear movies if search is empty
      setMovies([])
    }
  }, [searchQuery])

  return (
    <WatchlistProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
          <Header 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
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
                    
                    {/* Search Input */}
                    <div className="max-w-md mx-auto mb-12">
                      <input
                        type="text"
                        placeholder="Try 'The Godfather', 'Interstellar', or 'Parasite'..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 text-lg"
                      />
                    </div>

                    {/* Mood-Based Suggestions */}
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Not sure what to watch? Pick a mood:
                      </h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        {[
                          { emoji: '😊', mood: 'happy', search: 'comedy' },
                          { emoji: '😢', mood: 'sad', search: 'drama emotional' },
                          { emoji: '🧗', mood: 'adventurous', search: 'adventure action' },
                          { emoji: '🤔', mood: 'thought-provoking', search: 'sci-fi mystery' }
                        ].map(({ emoji, mood, search }) => (
                          <button
                            key={mood}
                            onClick={() => setSearchQuery(search)}
                            className="group px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 min-w-[180px]"
                          >
                            <div className="text-3xl mb-2">{emoji}</div>
                            <div className="text-white font-medium capitalize">{mood}</div>
                            <div className="text-gray-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to explore
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Movie Results */}
                <main className="container mx-auto px-4 py-8">
                  {loading && (
                    <div className="flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                      <span className="ml-4 text-white">Searching for "{searchQuery}"...</span>
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