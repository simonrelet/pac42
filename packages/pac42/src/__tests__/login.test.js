/* global describe it expect */
import React from 'react'

import Login from '../pages/login'
import { shallow } from 'enzyme'

describe('App', () => {
  it('title', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper.find('h1').text()).toBe('Sign in to your dashboard')
    expect(wrapper).toMatchSnapshot()
  })
})
