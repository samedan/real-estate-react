import React from 'react';
import { StateContext } from '../state-context';

const connect = (selectState) => (Component) => {
  class Connect extends React.Component {
    render() {
      const state = this.context.getState();
      const slice = selectState(this.context);
      //   const store = this.context;
      return <Component {...slice} />;
    }
  }
  Connect.contextType = StateContext;
  return Connect;
};

export default connect;
