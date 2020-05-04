/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BottomNavigator from './page/root/root';
import Home from './page/home/home';
import Detail from './page/dedtail/detail';
import Search from './page/search/search';

const AppStack = createStackNavigator({
  BottomNavigator: {
      screen: BottomNavigator,
      navigationOptions: {
        headerShown: false
      } 
    },
    Detail: {screen: Detail},
    Search: {screen: Search},
    Home: {screen: Home},
});

export default createAppContainer(AppStack);