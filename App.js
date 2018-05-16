import React, { Component } from 'react';
import { createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { Repos } from './components/Repos';
import { Test } from './components/Test';
import { Home } from './components/Home';
import {
  View,
  Text,
  Button
} from 'react-native';

export default class App extends React.Component {

  

  render() {
    return (
      <BaseStackNavigator /> 
    );
  }
}

const DrawerStackNavigator = createDrawerNavigator({
  Home: { screen: Home },
  Repos: { screen: Repos },
  Test: { screen: Test },
},
  {
    initialRouteName: 'Home',
  }
); 

const BaseStackNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Repos: { screen: Repos },
  Test: { screen: Test },
},
  {
    initialRouteName: 'Home',
  }
);
