// @flow

import * as React from 'react';
import Error from './Error';
import UseNavigator from './UseNavigator';
import type { Error as ErrorType, Info } from './TypeDefinitions';

type RC = React.ComponentType<any>;

type Props = {
  Component: RC,
  payload: Object,
  renderError: Function,
  renderComponent: Function,
  renderDefault: Function,
};

type State = {
  hasError: boolean,
  error?: ErrorType,
  info?: Info,
};

export default class extends React.PureComponent<Props, State> {
  state = {
    hasError: false,
    error: undefined,
    info: undefined,
  };

  componentWillReceiveProps = () => this.setState({ hasError: false });

  componentDidCatch = (error: ErrorType, info: Info) => this.setState({ hasError: true, error, info });

  renderError = () => {
    const { error, info } = this.state;

    if (this.props.renderError) {
      return this.props.renderError(error, info);
    }

    return (
      <Error error={error} info={info} />
    );
  };

  renderComponent = (Component: RC, payload?: Object) => {
    if (this.props.renderComponent) {
      return this.props.renderComponent({ Component, payload });
    }

    return (
      <Component {...payload} />
    );
  };

  renderDefault = (payload?: Object) => {
    if (this.props.renderDefault) {
      return this.props.renderDefault({ payload });
    }

    return (
      <UseNavigator {...payload} />
    );
  };

  render() {
    const { Component, payload } = this.props;

    if (this.state.hasError) {
      return this.renderError();
    }

    if (Component) {
      return this.renderComponent(Component, payload);
    }

    return this.renderDefault(payload);
  }
}

