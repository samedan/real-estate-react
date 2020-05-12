import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

class BookingReserve extends Component {
  constructor(props) {
    super(props);
    this.dateRef = React.createRef();
    this.state = {
      proposedBooking: {
        guests: '',
        startAt: null,
        endAt: null,
      },
    };
  }

  handleGuestsChange = (event) => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: event.target.value,
      },
    });
  };

  reserveRental = () => {
    alert(JSON.stringify(this.state.proposedBooking));
  };

  // destructure 'picker'
  handleApplyDatepicker = (_, { startDate, endDate }) => {
    this.dateRef.current.value =
      moment(startDate).format('YYYY/MM/DD') +
      ' to ' +
      moment(endDate).format('YYYY/MM/DD');

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt: startDate,
        endAt: endDate,
      },
    });
  };

  checkInvalidDates = (date) => {
    // id date is invalid (true)
    return date < moment().add(-1, 'days');
  };

  render() {
    const { rental } = this.props;
    return (
      <div className="booking">
        <h3 className="booking-price">
          ${rental.dailyPrice}
          <span className="booking-per-night"> per night</span>
        </h3>
        <hr></hr>
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <DateRangePicker
            onApply={this.handleApplyDatepicker}
            opens="left"
            containerStyles={{ display: 'block' }}
            isInvalidDate={this.checkInvalidDates}
          >
            <input
              ref={this.dateRef}
              id="dates"
              type="text"
              className="form-control"
            ></input>
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            onChange={this.handleGuestsChange}
            value={this.state.proposedBooking.guests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guests"
          ></input>
        </div>
        <button
          onClick={this.reserveRental}
          className="btn btn-bwm-main btn-block"
        >
          Reserve place now
        </button>
        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
      </div>
    );
  }
}

export default BookingReserve;
