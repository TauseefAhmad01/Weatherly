/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigator from './config/app-navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from '@network/reducers/store';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />

        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
