import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import BwmModal from '../shared/Modal';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

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
    this.dateRef.current.value = `
      ${moment(startDate).format('YYYY/MM/DD')}
       to  
      ${moment(endDate).format('YYYY/MM/DD')}
      `;

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

  processAdditionalData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        nights: this.calculateNights,
        totalPrice: this.totalPrice,
      },
    });
  };

  get formattedDate() {
    return this.dateRef.current ? this.dateRef.current.value : '';
  }
  get isBookingValid() {
    const { startAt, endAt, guests } = this.state.proposedBooking;
    return startAt && endAt && guests;
  }
  get calculateNights() {
    const { startAt, endAt } = this.state.proposedBooking;
    if (!startAt || !endAt) {
      return null;
    }
    const range = moment.range(startAt, endAt);
    const nights = Array.from(range.by('days')).length - 1;
    return nights;
  }

  get totalPrice() {
    const {
      rental: { dailyPrice },
    } = this.props;
    return dailyPrice && this.calculateNights * dailyPrice;
  }
  render() {
    const { rental } = this.props;
    const {
      proposedBooking: { nights, guests, totalPrice },
    } = this.state;
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
            value={guests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guests"
          ></input>
        </div>

        <BwmModal
          onModalSubmit={this.reserveRental}
          title="Confirm Booking"
          subtitle={this.formattedDate}
          openBtn={
            <button
              onClick={this.processAdditionalData}
              disabled={!this.isBookingValid}
              className="btn btn-bwm-main btn-block"
            >
              Reserve place now
            </button>
          }
        >
          <em>{nights}</em> Nights / <em>${rental.dailyPrice}</em> per night
          <p>
            Guests: <em>{guests}</em>
          </p>
          <p>
            Price: <em>{totalPrice}</em>
          </p>
          <p>Do you confirm your Booking for the selected dates?</p>
        </BwmModal>
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
