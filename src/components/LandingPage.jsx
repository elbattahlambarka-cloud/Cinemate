import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mood, setMood] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm || mood}`);
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Find, Save, and Discover Your Next Favorite Movie.</h1>
      <p className="text-gray-400 mb-8">Search for any movie, save it to your personal watchlist, and get recommendations based on your mood.</p>
      <div className="flex flex-col md:flex-row justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 mb-2 md:mb-0 md:mr-2 w-full md:w-80 bg-gray-800 text-white rounded-l"
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r">Search</button>
      </div>
      <div>
        <h2 className="text-xl mb-4">Not sure what to watch?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['😊 Happy', '😢 Sad', '🧗 Adventurous', '🤔 Thought-Provoking'].map((m) => (
            <button
              key={m}
              onClick={() => { setMood(m.split(' ')[1]); handleSearch(); }}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;