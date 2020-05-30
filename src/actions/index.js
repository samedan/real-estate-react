import axiosService from '../services/AxiosService';
const { bwmAxios } = axiosService;

export const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return bwmAxios.post('/image-upload', formData).then((res) => res.data);
};

export const extractApiErrors = (resError) => {
  let errors = [{ title: 'Error', detail: 'Generic error' }];
  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }
  return errors;
};

export const deleteResource = ({ url, resource }) => (dispatch) => {
  return (
    bwmAxios
      .delete(url)
      // response is {booking: 'yoiuiopojnog5è_-ç_-ç'}
      .then((res) => res.data)
      .then(({ id }) => {
        dispatch({
          type: 'DELETE_RESOURCE',
          id: id,
          resource: resource,
        });
      })
      .catch((error) => {
        dispatch({
          type: 'REQUEST_ERROR',
          errors: extractApiErrors(error.response || []),
          resource: resource,
        });
      })
  );
};

export * from './auth';
export * from './rentals';
export * from './bookings';
