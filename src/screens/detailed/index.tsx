import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageComponent} from '@components/image-component';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

export default function DetailedScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Animated.Image
        source={{uri: 'https://cdn.weatherapi.com/weather/64x64/day/302.png'}}
        style={{height: 200, width: 200}}
        sharedTransitionTag="test"
      />
      <Text
        onPress={() => {
          navigation.goBack();
        }}>
        fcghjk
      </Text>
    </View>
  );
}
