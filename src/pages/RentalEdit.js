import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchRentalById, verifyRentalOwner, updateRental } from '../actions';
import TomMap from '../components/map/TomMap';
import RentalAssets from '../components/rental/RentalAssets';
import { capitalize } from '../helpers/functions';

import { toast } from 'react-toastify';
import {
  EditableInput,
  EditableTextarea,
  EditableSelect,
} from '../components/editable';

// HOC
const withUserCheck = (Component) => (props) => {
  const [guard, setGuard] = useState({ canProceed: false, isChecking: true });
  const { id } = props.match.params;
  useEffect(() => {
    verifyRentalOwner(id)
      .then((_) =>
        setGuard({ canProceed: true, isChecking: false }, [
          canProceed,
          isChecking,
        ])
      )
      .catch((_) =>
        setGuard({ canProceed: false, isChecking: false }, [
          canProceed,
          isChecking,
        ])
      );
  }, [id]);

  const { canProceed, isChecking } = guard;
  if (!isChecking && canProceed) {
    return <Component {...props} />;
  } else if (!isChecking && !canProceed) {
    return <Redirect to={{ pathname: '/' }} />;
  } else {
    return <h1>Loading...</h1>;
  }
};

class RentalEdit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id));
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'UNMOUNT_RENTAL' });
  }

  updateRental = (rentalData, onSuccess, onError) => {
    const { id } = this.props.match.params;
    return this.props
      .dispatch(updateRental(id, rentalData))
      .then(() => {
        onSuccess();
      })
      .catch((errors) => {
        const message =
          errors.length > 0 ? errors[0].detail : 'Oups, something went wrong';
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        onError();
      });
  };

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
              <div className="rental">
                <span className="rental-city">Is shared: </span>
                <EditableSelect
                  entity={rental}
                  onUpdate={this.updateRental}
                  field={'shared'}
                  inline={true}
                  options={[true, false]}
                  className={`rental-type type-${rental.category}`}
                />
                <EditableSelect
                  entity={rental}
                  onUpdate={this.updateRental}
                  options={['apartment', 'condo', 'house']}
                  field={'category'}
                  className={`rental-type type-${rental.category}`}
                />

                {/* <h1 className="rental-title">{rental.title}</h1> */}
                <EditableInput
                  entity={rental}
                  onUpdate={this.updateRental}
                  field={'title'}
                  className={'rental-title'}
                />
                <EditableInput
                  entity={rental}
                  onUpdate={this.updateRental}
                  field={'city'}
                  transformView={(value) => capitalize(value)}
                  className={'rental-city'}
                />
                <EditableInput
                  entity={rental}
                  transformView={(value) => capitalize(value)}
                  onUpdate={this.updateRental}
                  field={'street'}
                  className={'rental-street'}
                />

                <div className="rental-room-info mb-1">
                  {/* <!-- TODO: Display numOfRooms --> */}
                  <span>
                    <FontAwesomeIcon icon="building" />
                    <EditableInput
                      entity={rental}
                      onUpdate={this.updateRental}
                      inline={true}
                      field={'numOfRooms'}
                      className={'mr-0 ml-2'}
                    />
                    bedrooms
                  </span>
                  {/* // <!-- TODO: Display numOfRooms + 4 --> */}
                  <span>
                    <FontAwesomeIcon icon="user" /> {rental.numOfRooms + 4}{' '}
                    guests
                  </span>
                  {/* // <!-- TODO: Display numOfRooms + 2 --> */}
                  <span>
                    <FontAwesomeIcon icon="bed" /> {rental.numOfRooms + 2} beds
                  </span>
                </div>

                <EditableTextarea
                  entity={rental}
                  rows={5}
                  cols={50}
                  onUpdate={this.updateRental}
                  field={'description'}
                  className={'rental-description'}
                />
                <hr />
                <RentalAssets />
              </div>
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

export default connect(mapStateToProps)(withRouter(withUserCheck(RentalEdit)));
