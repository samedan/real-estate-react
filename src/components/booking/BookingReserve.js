import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import BwmModal from '../shared/Modal';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { createBooking, getBookings } from '../../actions';
import ApiErrors from '../forms/ApiErrors';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const moment = extendMoment(Moment);

class BookingReserve extends Component {
  constructor(props) {
    super(props);
    this.dateRef = React.createRef();
    this.bookedOutDates = [];

    this.state = {
      errors: [],
      proposedBooking: {
        guests: '',
        startAt: null,
        endAt: null,
      },
    };
  }

  async componentDidMount() {
    const { rental } = this.props;
    console.log(rental);
    this.bookedOutDates = await getBookings(rental._id);
  }

  handleGuestsChange = (event) => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10),
      },
    });
  };

  // 'closeComeback' is 'onClick={onModalSubmit(() => setIsOpen(false))}'
  // from Modal
  reserveRental = (closeCallback) => {
    // alert(JSON.stringify(this.state.proposedBooking));
    createBooking(this.state.proposedBooking)
      .then((newBooking) => {
        this.bookedOutDates.push(newBooking);
        this.resetData();
        toast.success('Booking has been created!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        closeCallback();
      })
      .catch((errors) => this.setState({ errors }));
  };

  // after a booking success
  resetData = () => {
    this.dateRef.current.value = '';
    this.setState({
      errors: [],
      proposedBooking: { guests: '', startAt: null, endAt: null },
    });
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

  //startAt 2020/03/03, endAt:2020/03/15
  // date 2020/03/12
  checkInvalidDates = (date) => {
    let isBookedOut = false;
    // check if date in in the range of startAt and endAt
    isBookedOut = this.bookedOutDates.some((booking) =>
      moment.range(booking.startAt, booking.endAt).contains(date)
    );
    // id date is invalid (true)
    return date < moment().add(-1, 'days') || isBookedOut;
  };

  processAdditionalData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        nights: this.calculateNights,
        price: this.price,
        rental: this.props.rental,
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

  get price() {
    const {
      rental: { dailyPrice },
    } = this.props;
    return dailyPrice && this.calculateNights * dailyPrice;
  }
  render() {
    const { rental, isAuth } = this.props;
    const {
      errors,
      proposedBooking: { nights, guests, price },
    } = this.state;
    return (
      <div className="booking">
        <h3 className="booking-price">
          ${rental.dailyPrice}
          <span className="booking-per-night"> per night</span>
        </h3>
        <hr></hr>
        {!isAuth && (
          <Link
            to={{ pathname: '/login' }}
            className="btn btn-bwm-main btn-block"
          >
            Login to book this place
          </Link>
        )}
        {isAuth && (
          <>
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
              <div className="mb-2">
                <em>{nights}</em> Nights / <em>${rental.dailyPrice}</em> per
                night
                <p>
                  Guests: <em>{guests}</em>
                </p>
                <p>
                  Price: <em>${price}</em>
                </p>
                <p>Do you confirm your Booking for the selected dates?</p>
              </div>
              <ApiErrors errors={errors} />
            </BwmModal>
          </>
        )}

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
