import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './home-navigation';



export default function RootNavigator() {

  return (
    <NavigationContainer >
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
