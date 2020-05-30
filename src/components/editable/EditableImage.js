import React from 'react';
import EditableComponent from './EditableComponent';
import FileLoader from '../file-upload/FileLoader';

const ImageView = ({ value, ...rest }) => {
  return <img {...rest} src={value} alt=""></img>;
};

const createEvent = (value) => ({ target: { value } });

export class EditableImage extends React.Component {
  render() {
    return (
      <EditableComponent
        {...this.props}
        viewComponent={ImageView}
        renderComponent={(value, onChange, onKeyDown) => (
          <FileLoader onFileUpload={(image) => onChange(createEvent(image))} />
        )}
      />
    );
  }
}
