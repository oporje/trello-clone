import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import Board from './board';
import List from '../list/list';
import React from 'react';
import { shallow } from 'enzyme';


Enzyme.configure({ adapter: new Adapter() });

test('renders the Board component', () => {
  const boardProps = {
    boardId: `12345`,
    name: 'test'
  };
  const component = shallow(<Board board={boardProps} />);
  expect(component).toMatchSnapshot();
});

test('renders the Board with props', () => {
  const boardProps = {
    boardId: `12345`,
    name: 'test'
  };
  const component = shallow(<Board board={boardProps} />);
  expect(component).toMatchSnapshot();
  expect(component.find(List).length).toEqual(0);
  const addListBtn = component.find('button.add-list-btn');
  addListBtn.simulate('click');
  expect(component.find(List).length).toEqual(1);
});
