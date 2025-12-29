import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">C</span>
              </div>
              <h1 className="text-2xl font-bold text-white">CineMate</h1>
            </Link>
            
            <nav className="flex gap-6">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                to="/watchlist" 
                className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
              >
                My Watchlist
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-96 px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header