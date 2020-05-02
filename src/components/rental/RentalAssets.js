import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RentalAssets = () => (
  <div className="rental-assets">
    <h3 className="title">Assets</h3>
    <div className="row">
      <div className="col-md-6">
        <span>
          <FontAwesomeIcon icon="asterisk" /> Cooling
        </span>
        <span>
          <FontAwesomeIcon icon="thermometer" /> Heating
        </span>
        <span>
          <FontAwesomeIcon icon="tshirt" /> Iron
        </span>
      </div>
      <div className="col-md-6">
        <span>
          <FontAwesomeIcon icon="desktop" /> Working area
        </span>
        <span>
          <FontAwesomeIcon icon="archive" /> Washing machine
        </span>
        <span>
          <FontAwesomeIcon icon="soap" /> Dishwasher
        </span>
      </div>
    </div>
  </div>
);

export default RentalAssets;
