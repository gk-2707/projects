import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Library from "./pages/Library.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from './components/Navbar.jsx';
import Player from './components/Player.jsx';
import usePlaylistStore from './store/playlistStore.jsx';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false);

  const { playlists, addToPlaylist, removeFromPlaylist, getPlaylist } = usePlaylistStore();
  const favorites = getPlaylist('Favorite Songs');

  const playSongFromList = (song, playlist) => {
    const index = playlist.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentSong(song);
      setCurrentPlaylist(playlist);
      setCurrentSongIndex(index);
    }
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item)) {
      removeFromPlaylist('Favorite Songs', item.id);
    } else {
      addToPlaylist('Favorite Songs', item);
    }
  };

  const isFavorite = (item) => {
    return (favorites || []).some((favItem) => favItem.id === item.id);
  };

  const playNextSong = () => {
    if (currentPlaylist.length > 0 && currentSongIndex !== -1) {
      const nextIndex = (currentSongIndex + 1) % currentPlaylist.length;
      const nextSong = currentPlaylist[nextIndex];
      setCurrentSong(nextSong);
      setCurrentSongIndex(nextIndex);
    }
  };

  const playPreviousSong = () => {
    if (currentPlaylist.length > 0 && currentSongIndex !== -1) {
      const prevIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
      const prevSong = currentPlaylist[prevIndex];
      setCurrentSong(prevSong);
      setCurrentSongIndex(prevIndex);
    }
  };

  const togglePlayerFullscreen = () => {
    setIsPlayerFullscreen(prev => !prev);
  };

  return (
    <div className={`bg-gray-950 min-h-screen text-white flex flex-col ${isPlayerFullscreen ? 'overflow-hidden' : ''}`}>
      {/* Conditional padding based on fullscreen mode */}
      <div className={`flex-grow ${isPlayerFullscreen ? 'pb-0' : 'pb-32'}`}>
        <Routes>
          <Route path="/" element={<Home playSongFromList={playSongFromList} />} />
          <Route
            path="/library"
            element={<Library favorites={favorites} setCurrentSong={setCurrentSong} />}
          />
          <Route path="/search" element={<Search playSongFromList={playSongFromList} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      {currentSong && (
        <Player
          song={currentSong}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite(currentSong)}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
          isPlayerFullscreen={isPlayerFullscreen}
          togglePlayerFullscreen={togglePlayerFullscreen}
          // Crucial: Pass currentPlaylist and currentSongIndex
          currentPlaylist={currentPlaylist}
          currentSongIndex={currentSongIndex}
        />
      )}

      {/* Navbar is hidden in fullscreen mode */}
      {!isPlayerFullscreen && <Navbar />}
    </div>
  );
}

export default App;
