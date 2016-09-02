'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import { expect } from 'chai';

describe('<App />', () => {
  it('renders a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
