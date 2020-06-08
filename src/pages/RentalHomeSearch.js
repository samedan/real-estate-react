import React, { Component } from 'react';
import RentalCard from '../components/rental/RentalCard';
import { fetchRentals } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { capitalize } from '../helpers/functions';
import Spinner from '../components/shared/Spinner';

class RentalHomeSearch extends Component {
  componentDidMount() {
    this.getRentals(this.location);
  }

  componentDidUpdate(prevProps) {
    const { location: prevLocation } = prevProps.match.params;

    if (this.location !== prevLocation) {
      this.getRentals(this.location);
    }
  }

  getRentals(location) {
    this.props.dispatch(fetchRentals(location));
  }

  get location() {
    return this.props.match.params.location;
  }

  renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div className="col-md-3" key={rental._id}>
        <RentalCard rental={rental} />
      </div>
    ));

  get noRentalsFound() {
    const { rentals, isFetching } = this.props;
    return rentals && rentals.length === 0 && !isFetching;
  }

  render() {
    const { rentals, isFetching } = this.props;

    if (isFetching) {
      return <Spinner />;
    }
    return (
      <div className="card-list">
        <h1 className="page-title">
          {/* Your Home in: "{capitalize(this.location)}" */}
          Your Home in: "{this.location}"
        </h1>

        <div className="row">{this.renderRentals(rentals)}</div>
        {this.noRentalsFound && (
          <p className="alert alert-warning">No Rentals found</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ rentals }) => {
  return {
    rentals: rentals.items,
    isFetching: rentals.isFetching,
  };
};

export default connect(mapStateToProps)(withRouter(RentalHomeSearch));
