import { createContext, useState, useContext, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('cinemate-watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem('cinemate-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some(item => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter(movie => movie.imdbID !== imdbID));
  };

  const isInWatchlist = (imdbID) => {
    return watchlist.some(movie => movie.imdbID === imdbID);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};