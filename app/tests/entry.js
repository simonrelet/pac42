/* eslint no-console: "off" */
'use strict';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const testsContext = require.context('..', true, /\.spec\.jsx?$/);

beforeEach(() => {
  console.error = error => {
    throw new Error(error);
  };
});

testsContext.keys().forEach(testsContext);
