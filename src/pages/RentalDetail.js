import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById } from '../actions';
import { capitalize } from '../helpers/functions';
import RentalAssets from '../components/rental/RentalAssets';
import RentalInfo from '../components/rental/RentalInfo';

class RentalDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id));
  }

  render() {
    const { rental, isFetching } = this.props;

    if (isFetching) {
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
              {/* <!-- TODO: Display rental map --> */}
              <img src="#" alt="" />
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <RentalInfo rental={rental} />
            </div>
            <div className="col-md-4"> BOOKING</div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rental }) => ({
  rental: rental.item,
  isFetching: rental.isFetching,
});

export default connect(mapStateToProps)(withRouter(RentalDetail));
