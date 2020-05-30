import React from 'react';
import { Link } from 'react-router-dom';

export default function RentalCard({ rental, renderMenu }) {
  return (
    <>
      <Link to={`/rentals/${rental._id}`} className="rental-link">
        <div className="card bwm-card">
          <img
            className="card-img-top"
            src={rental.image.url}
            alt="Card image cap"
          />
          <div className="card-body">
            <h6 className={`card-subtitle mb-0 type-${rental.category}`}>
              {rental.shared ? 'Shared' : 'Whole'} {rental.category} -{' '}
              {rental.city}
            </h6>
            <h5 className="card-title big-font">{rental.title}</h5>
            <p className="card-text">
              {rental.dailyPrice}€ per Night - Free Cancelation
            </p>
          </div>
        </div>
      </Link>
      {renderMenu && renderMenu()}
    </>
  );
}
