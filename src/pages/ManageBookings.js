import React, { Component } from 'react';
import BookingListing from '../components/booking/BookingListing';
import { connect } from 'react-redux';
import { fetchUserBookings, deleteBooking } from '../actions';

class ManageBookings extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserBookings());
  }

  deleteBooking = (bookingId) => {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }
    this.props.dispatch(deleteBooking(bookingId));
    // alert(`Deleting booking: ${bookingId}`);
  };

  askForPermission() {
    return window.confirm('Are you want to delete this booking?');
  }
  render() {
    const { bookings, isFetching, errors } = this.props;
    return (
      <BookingListing
        title="My Bookings on other's Rentals"
        bookings={bookings}
        errors={errors}
        isFetching={isFetching}
        renderMenu={(bookingId) => (
          <button
            className="btn btn-danger"
            onClick={() => this.deleteBooking(bookingId)}
          >
            Delete
          </button>
        )}
      />
    );
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    bookings: manage.bookings.items,
    isFetching: manage.bookings.isFetching,
    errors: manage.bookings.errors,
  };
};

export default connect(mapStateToProps)(ManageBookings);
