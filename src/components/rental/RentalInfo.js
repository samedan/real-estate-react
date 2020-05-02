import React from 'react';
import RentalAssets from './RentalAssets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalize } from '../../helpers/functions';

const RentalInfo = ({ rental }) => (
  <div className="rental">
    <h2 className={`rental-type type-${rental.category}`}>
      {rental.shared ? 'Shared' : 'Whole'} {rental.category}
    </h2>

    <h1 className="rental-title">{rental.title}</h1>

    <h2 className="rental-city">{capitalize(rental.city)}</h2>
    <div className="rental-room-info">
      {/* <!-- TODO: Display numOfRooms --> */}
      <span>
        <FontAwesomeIcon icon="building" /> {rental.numOfRooms} bedrooms
      </span>
      {/* // <!-- TODO: Display numOfRooms + 4 --> */}
      <span>
        <FontAwesomeIcon icon="user" /> {rental.numOfRooms + 4} guests
      </span>
      {/* // <!-- TODO: Display numOfRooms + 2 --> */}
      <span>
        <FontAwesomeIcon icon="bed" /> {rental.numOfRooms + 2} beds
      </span>
    </div>
    {/* <!-- TODO: Display description --> */}
    <p className="rental-description">{rental.description}</p>
    <hr />
    <RentalAssets />
  </div>
);

export default RentalInfo;
