// @flow

import React, { Fragment } from 'react';
import type { Error as ErrorType, Info } from './TypeDefinitions';

type Props = {
  error?: ErrorType,
  info?: Info,
};

export default ({ error, info }:Props) => (
  <Fragment>
    { error && (<div>{ error.message }</div>) }
    { info && (<div>{ info.componentStack }</div>) }
  </Fragment>
);
