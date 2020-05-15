import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById } from '../actions';
import { capitalize } from '../helpers/functions';
import RentalAssets from '../components/rental/RentalAssets';
import RentalInfo from '../components/rental/RentalInfo';
import TomMap from '../components/map/TomMap';
import BookingReserve from '../components/booking/BookingReserve';

class RentalDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id));
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'UNMOUNT_RENTAL' });
  }

  get location() {
    const {
      rental: { street, city },
      UNMOUNT_RENTAL,
    } = this.props;
    // 'new york, main street'
    return street && city && city + ', ' + street;
  }

  render() {
    const { rental, isFetching, isAuth } = this.props;

    if (isFetching || !rental._id) {
      return <h1>Loading...</h1>;
    }
    return (
      <section id="rentalDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              {/* <!-- TODO: Display rental image --> */}
              <img src={rental.image} alt={rental.title} />
            </div>
            <div className="col-md-6">
              <TomMap location={this.location} />
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <RentalInfo rental={rental} />
            </div>
            <div className="col-md-4">
              <BookingReserve isAuth={isAuth} rental={rental} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rental, auth: { isAuth: isAuth } }) => ({
  rental: rental.item,
  isFetching: rental.isFetching,
  isAuth: isAuth,
});

export default connect(mapStateToProps)(withRouter(RentalDetail));
