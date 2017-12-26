import React from 'react';
import { shallow } from 'enzyme';
import ThingsPage from './ThingsPage';

describe('<ThingsPage />', () => {
  it('should have a header called \'Things\'', () => {
    const wrapper = shallow(<AboutPage />);
    const actual = wrapper.find('h2').text();
    const expected = 'Things';

    expect(actual).toEqual(expected);
  });

  it('should have a header with \'alt-header\' class', () => {
    const wrapper = shallow(<AboutPage />);
    const actual = wrapper.find('h2').prop('className');
    const expected = 'alt-header';

    expect(actual).toEqual(expected);
  });
});
