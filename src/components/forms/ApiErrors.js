import React from 'react';

const ApiErrors = ({ errors }) => {
  return (
    <div className="alert alert-danger">
      {errors.map((e) => (
        <p key={e.title}>{e.detail}</p>
      ))}
    </div>
  );
};

export default ApiErrors;
