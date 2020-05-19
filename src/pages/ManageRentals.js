import React from 'react';
import { fetchUserRentals, deleteRental } from '../actions';
import { connect } from 'react-redux';
import RentalCard from '../components/rental/RentalCard';
import ApiErrors from '../components/forms/ApiErrors';
import { Link } from 'react-router-dom';

class ManageRentals extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRentals());
  }

  deleteRental = (rentalId) => {
    const canDelete = this.askForPermission();
    if (canDelete) {
      this.props.dispatch(deleteRental(rentalId));
    }
  };

  askForPermission() {
    return window.confirm('Are you want to delete this rental?');
  }

  renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard
          renderMenu={() => (
            <>
              <button
                onClick={() => this.deleteRental(rental._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <Link
                className="btn btn-bwm-main ml-2"
                to={{ pathname: `/rentals/${rental._id}/edit` }}
              >
                Update
              </Link>
            </>
          )}
          rental={rental}
        />
      </div>
    ));

  render() {
    const { rentals, errors, isFetching } = this.props;

    return (
      <div className="card-list">
        <h1 className="page-title">My rentals:</h1>
        <ApiErrors errors={errors} />
        <div className="row">{this.renderRentals(rentals)}</div>
        {!isFetching && rentals.length === 0 && (
          <p className="alert alert-warning">
            You don't have any rentals created.{' '}
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    rentals: manage.rentals.items,
    isFetching: manage.rentals.isFetching,
    errors: manage.rentals.errors,
  };
};

export default connect(mapStateToProps)(ManageRentals);
