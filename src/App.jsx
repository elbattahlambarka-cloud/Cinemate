import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';
import MovieDetail from './components/MovieDetail';
import Watchlist from './components/Watchlist';
import Navbar from './components/Navbar';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cinemate-watchlist');
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cinemate-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter((m) => m.imdbID !== imdbID));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResults addToWatchlist={addToWatchlist} watchlist={watchlist} />} />
          <Route path="/movie/:id" element={<MovieDetail addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} watchlist={watchlist} />} />
          <Route path="/watchlist" element={<Watchlist removeFromWatchlist={removeFromWatchlist} watchlist={watchlist} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;