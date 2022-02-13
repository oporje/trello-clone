import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BoardContainer from './board-container';
import Enzyme from 'enzyme';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Board from '../board/board';

Enzyme.configure({ adapter: new Adapter() });

test('renders the component', () => {
  const component = shallow(<BoardContainer />);
  expect(component).toMatchSnapshot();
});

test('check board component default visible elements are properly getting rendered', () => {
    const component = shallow(<BoardContainer />);
    expect(component.find('.board-add-section').exists()).toBeTruthy();
    expect(component.find('.add-board-button').exists()).toBeTruthy();
    expect(component.find('input[type="text"]').exists()).toBeTruthy();
});

test('check add board event is adding the board component', () => {
  const wrapper = mount(<BoardContainer />);
  expect(wrapper.find(Board).length).toEqual(0);
  const addBoardBtn = wrapper.find('button.add-board-button');
  addBoardBtn.simulate('click');
  expect(wrapper.find(Board).length).toEqual(1);
});
