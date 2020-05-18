import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize, formatDate } from '../../helpers/functions';
import ApiErrors from '../forms/ApiErrors';

const BookingListing = ({
  bookings,
  type,
  isFetching,
  errors,
  title = 'Bookings',
  renderMenu,
}) => {
  return (
    <section className="booking-listing">
      <h1 className="page-title">{title}</h1>
      {!isFetching && bookings.length === 0 && <p>No bookings created</p>}
      <ApiErrors errors={errors} />
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking._id} className="col-md-4">
            <div className="card text-center">
              {/* Only if 'received' booking */}
              {type === 'received' && (
                <div className="card-header">
                  From:{' '}
                  <span className="received-name">{booking.user.username}</span>
                </div>
              )}

              {/* Only if 'received' booking END */}
              <div className="card-block">
                <h4 className="card-title">
                  {booking.rental.title} - {capitalize(booking.rental.city)}{' '}
                </h4>
                <p className="card-text booking-days">
                  {formatDate(booking.startAt)} - {formatDate(booking.endAt)} |{' '}
                  {booking.nights} nights
                </p>
                <p className="card-text">
                  <span>Price: </span>{' '}
                  <span className="booking-price-value">${booking.price}</span>
                </p>
                <Link
                  to={{ pathname: `/rentals/${booking.rental._id}` }}
                  className="btn btn-bwm-main"
                >
                  Go to Rental
                </Link>
                {renderMenu && renderMenu(booking._id)}
              </div>
              <div className="card-footer text-muted">
                Created at {formatDate(booking.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingListing;
