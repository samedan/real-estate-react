import React, { Component } from 'react';
import RentalForm from '../components/forms/RentalForm';
import { Redirect } from 'react-router-dom';

import { createRental } from '../actions';

class RentalNew extends Component {
  state = {
    shouldRedirect: false,
    errors: [],
  };

  handleRentalCreate = (rentalData) => {
    createRental(rentalData)
      .then((_) =>
        this.setState({
          shouldRedirect: true,
        })
      )
      // .catch((_) => console.log('Errors'));
      .catch((errors) => {
        // console.log(errors);
        this.setState({ errors });
      });
  };

  render() {
    const { errors, shouldRedirect } = this.state;
    // console.log(errors);
    if (shouldRedirect) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>

              <RentalForm onSubmit={this.handleRentalCreate} errors={errors} />
              {/* <div>
            <p>
              Some Errors
            </p>
          </div> */}
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src="/images/create-rental.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default RentalNew;
