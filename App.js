import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './container/Home';
import Detail from './container/Detail';

export default StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      title: 'Detail',
    }
  }
},{
  initialRouteName: 'Home',
});