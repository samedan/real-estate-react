import React from 'react';
import { useForm } from 'react-hook-form';

const rentalOptions = ['apartment', 'condo', 'house'];

const RentalForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          ref={register}
          name="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          ref={register}
          name="city"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          className="form-control"
          id="street"
          ref={register}
          name="street"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>

        <select
          className="form-control"
          id="category"
          ref={register}
          name="category"
        >
          {rentalOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="bedrooms">Image Url</label>
        <input
          type="text"
          className="form-control"
          id="image"
          ref={register}
          name="image"
        />
      </div>

      <div className="form-group">
        <label htmlFor="bedrooms">Rooms</label>
        <input
          type="number"
          className="form-control"
          id="numOfRooms"
          ref={register}
          name="numOfRooms"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          rows="5"
          type="text"
          className="form-control"
          id="description"
          ref={register}
          name="description"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="dailyRate">Daily Price</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            type="number"
            className="form-control"
            id="dailyPrice"
            ref={register}
            name="dailyPrice"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="shared">Shared</label>
        <input
          type="checkbox"
          className="form-control"
          id="shared"
          ref={register}
          name="shared"
        />
      </div>
      <button type="submit" className="btn btn-bwm-main">
        Create
      </button>
    </form>
  );
};

export default RentalForm;
