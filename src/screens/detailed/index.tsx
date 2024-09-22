import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageComponent} from '@components/image-component';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import useAppTheme from '@theme/theme';
import {createStyleSheet} from './styles';
import {bgimage, humidity, uv, wind} from '@assets/images';
import {TextComponent} from '@components/text-component';
import {strings} from '@appconstants';
import moment from 'moment';
import {BackComponent} from '@components/back';

interface DetailedScreenProps {
  route: {
    params: {
      forecast?: any;
    };
  };
}

export default function DetailedScreen(props: DetailedScreenProps) {
  const {forecast} = props.route.params || {};
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageComponent
        blurRadius={100}
        source={bgimage}
        style={styles.bgImage}
      />
      <BackComponent viewStyle={styles.mgt8} />
      <TextComponent style={styles.tempHeading}>
        {forecast?.day?.avgtemp_c}
        {strings.degreeC}
      </TextComponent>
      <TextComponent style={styles.currentDay}>
        {moment(forecast.date).format('dddd')}
      </TextComponent>

      <ImageComponent
        isUrl
        uri={forecast?.day?.condition?.icon}
        style={styles.weatherImage}
      />
      <View style={styles.infoContainer}>
        <View style={styles.flexRow}>
          <ImageComponent source={wind} style={styles.infoIcon} />
          <TextComponent style={styles.infoText}>
            {forecast?.day?.maxwind_kph} {strings.kmph}
          </TextComponent>
        </View>

        <View style={styles.flexRow}>
          <ImageComponent source={humidity} style={styles.infoIcon} />
          <TextComponent style={styles.infoText}>
            {forecast?.day?.avghumidity}
            {strings.percentage}
          </TextComponent>
        </View>
        <View style={styles.flexRow}>
          <ImageComponent source={uv} style={styles.infoIcon} />
          <TextComponent style={styles.infoText}>
            {forecast?.day?.uv}
          </TextComponent>
        </View>
      </View>

      <Text
        style={{color: theme.colors.white}}
        onPress={() => {
          navigation.goBack();
          //   console.log(JSON.stringify(forecast));
        }}>
        Go back
      </Text>
    </View>
  );
}
