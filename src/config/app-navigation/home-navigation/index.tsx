import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigations} from '../constants';
import HomeScreen from '../../../screens/home';
import SearchCity from '@screens/search';
import DetailedScreen from '@screens/detailed';

export default function HomeStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigations.homeScreen} component={HomeScreen} />
      <Stack.Screen name={navigations.searchScreen} component={SearchCity} />
      <Stack.Screen
        name={navigations.detailedScreen}
        component={DetailedScreen}
      />
    </Stack.Navigator>
  );
}
