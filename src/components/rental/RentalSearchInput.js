import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RentalSearchInput = () => {
  const [location, setLocation] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    location ? history.push(`/rentals/${location}/homes`) : history.push('/');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="form-inline my-2 my-lg-0">
      <input
        onKeyPress={handleKeyPress}
        onChange={(e) => setLocation(e.target.value)}
        className="form-control mr-sm-2 bwm-search"
        type="search"
        placeholder="ex. New York"
        value={location}
      />
      <button
        className="btn btn-bwm-main btn-outline-success my-2 my-sm-0"
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default RentalSearchInput;
