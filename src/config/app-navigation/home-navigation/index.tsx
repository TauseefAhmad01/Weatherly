import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigations} from '../constants';
import HomeScreen from '../../../screens/home';

export default function HomeStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigations.homeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
}
