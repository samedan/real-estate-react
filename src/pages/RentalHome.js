import React, { Component } from 'react';
import RentalCard from '../components/rental/RentalCard';
import { fetchRentals, createRental } from '../actions';

import { connect } from 'react-redux';

class RentalHome extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }

  renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div className="col-md-3" key={rental._id}>
        <RentalCard rental={rental} />
      </div>
    ));

  createRental = () => {
    const uid = Math.random().toString(32).slice(2);
    const newRental = {
      _id: uid,
      title: 'Modern apartment in center',
      city: 'New York',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      numOfRooms: 1,
      shared: false,
      description: 'Very nice apartment in center of the city.',
      dailyPrice: 11,
    };
    // action 'createRental'
    this.props.dispatch(createRental(newRental));
  };

  render() {
    const { rentals } = this.props;

    return (
      <div>
        <div className="card-list">
          <h1 className="page-title">Your Home All Around the World</h1>
          <div className="row">{this.renderRentals(rentals)}</div>
        </div>
        <button className="btn btn-success" onClick={this.createRental}>
          Create Rental
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentals,
  };
};

export default connect(mapStateToProps)(RentalHome);
