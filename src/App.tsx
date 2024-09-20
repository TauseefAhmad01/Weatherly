/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigator from './config/app-navigation';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar translucent backgroundColor={'#ffffff01'} barStyle={"light-content"} />
      <RootNavigator />
    </>
  );
}

export default App;
