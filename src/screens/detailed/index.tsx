import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {ImageComponent} from '@components/image-component';
import {useNavigation} from '@react-navigation/native';
import useAppTheme from '@theme/theme';
import {createStyleSheet} from './styles';
import {bgimage, calendar, humidity, uv, wind} from '@assets/images';
import {TextComponent} from '@components/text-component';
import {strings} from '@appconstants';
import moment from 'moment';
import {BackComponent} from '@components/back';
import {hexToRgbA} from '@utils/hex-to-rgba';
import normalize from 'react-native-normalize';
import {screenWidth} from '@theme/Device';

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

  let extraInfo = [
    {value: forecast?.day?.maxwind_kph + ' ' + strings.kmph, image: wind},
    {
      value: forecast?.day?.avghumidity + ' ' + strings.percentage,
      image: humidity,
    },
    {value: forecast?.day?.uv, image: uv},
  ];
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.lineItemContainer}>
        <TextComponent style={styles.time}>
          {moment(item?.time).format('hh A')}
        </TextComponent>
        <TextComponent style={styles.temp}>
          {item?.temp_c}
          {strings.degree}
        </TextComponent>
        <ImageComponent
          isUrl
          uri={item?.condition?.icon}
          style={styles.weatherInfoIcon}
        />
        <View style={styles.flexRowCenter}>
          <ImageComponent source={humidity} style={styles.humidityIcon} />
          <TextComponent style={styles.humidityText}>
            {item.humidity}
            {strings.percentage}
          </TextComponent>
        </View>
        <View style={styles.alignCenter}>
          <TextComponent style={styles.precpPerct}>
            {item?.chance_of_rain}
            {strings.percentage}
          </TextComponent>
          <TextComponent style={styles.precpProb}>
            {strings.prepChances}
          </TextComponent>
        </View>
      </View>
    );
  };

  const renderExtrainfo = ({item, index}) => {
    return (
      <View style={[styles.flexRow, styles.extrainfo]}>
        <ImageComponent source={item.image} style={styles.infoIcon} />
        <TextComponent style={styles.infoText}>{item.value}</TextComponent>
      </View>
    );
  };

  const renderSeprator = () => <View style={styles.seprator} />;
  return (
    <View style={styles.container}>
      <ImageComponent
        blurRadius={100}
        source={bgimage}
        style={styles.bgImage}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pb}>
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

        <FlatList
          data={extraInfo}
          renderItem={renderExtrainfo}
          contentContainerStyle={styles.infoContainer}
          showsHorizontalScrollIndicator={false}
        />

        <View style={[styles.flexRow, styles.spaceBetween, styles.mgt16]}>
          <View style={styles.flexRow}>
            <ImageComponent source={calendar} style={styles.calendarIcon} />
            <TextComponent style={styles.heading}>
              {strings.hourlyForecast}
            </TextComponent>
          </View>
        </View>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailedListContainer}
          data={forecast.hour || []}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeprator}
          style={styles.mgt16}
        />
      </ScrollView>
    </View>
  );
}
