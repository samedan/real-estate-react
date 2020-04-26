import React from 'react';
import { StateContext } from './Provider';

const connect = (selectState) => (Component) => {
  class Connect extends React.Component {
    constructor(props, context) {
      super(props);
      this.state = {
        slice: selectState(context.getState()),
      };
      // 'subscribe' exectuted everythime ther eis a mod in teh store
      this.unsubcribe = context.subscribe(() =>
        this.handleStateChange(context)
      );
    }

    componentWillUnmount() {
      this.unsubcribe();
    }

    handleStateChange = (context) => {
      const rootState = context.getState();
      // when state changes, update 'localState' with new data
      this.setState({ slice: selectState(rootState) });
    };

    render() {
      const { dispatch } = this.context;
      const { slice } = this.state;

      //   const store = this.context;
      return <Component {...slice} dispatch={dispatch} />;
    }
  }
  Connect.contextType = StateContext;
  return Connect;
};

export default connect;
