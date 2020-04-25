import React, { Component } from 'react';
import RentalCard from '../components/rental/RentalCard';
import store from '../store';
import { StateContext } from '../state-context';
import connect from '../store/connect';

class RentalHome extends Component {
  state = {
    rentals: [],
  };

  componentDidMount() {
    const { rentals } = this.props;

    this.setState({
      rentals: rentals,
    });
  }

  renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div className="col-md-3" key={rental._id}>
        <RentalCard rental={rental} />
      </div>
    ));

  render() {
    const rentals = this.state.rentals;

    return (
      <div>
        <div className="card-list">
          <h1 className="page-title">Your Home All Around the World</h1>
          <div className="row">{this.renderRentals(rentals)}</div>
        </div>
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
