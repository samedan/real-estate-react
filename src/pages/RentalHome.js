import React, { Component } from 'react';
import RentalCard from '../components/rental/RentalCard';
import Spinner from '../components/shared/Spinner';
import { fetchRentals } from '../actions';

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

  render() {
    const { rentals } = this.props;
    if (rentals && rentals.length > 0) {
      return (
        <div>
          <div className="card-list">
            <h1 className="page-title">Your Home All Around the World</h1>
            <div className="row">{this.renderRentals(rentals)}</div>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = ({ rentals }) => {
  return {
    rentals: rentals.items,
  };
};

export default connect(mapStateToProps)(RentalHome);
