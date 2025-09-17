import React from 'react';
import SearchBar from '../components/SearchBar.jsx';

// Receive playSongFromList instead of setCurrentSong
const Search = ({ playSongFromList }) => {
    return (
        <div className="p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">🔍 Search Videos</h2>
            {/* Pass playSongFromList prop to SearchBar */}
            <SearchBar playSongFromList={playSongFromList} />
        </div>
    );
};

export default Search;
