import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import useAppTheme from '../../theme/theme';
import {createStyleSheet} from './style';
import {bgimage, calendar, searchIcon, whiteLocation} from '@assets/images';
import {ImageComponent} from '@components/image-component';
import {appConstants, strings} from '@appconstants';
import {TextComponent} from '@components/text-component';
import LottieView from 'lottie-react-native';
import cloudy from '@utils/Json/cloudy.json';
import useGetForecastData from '@network/get-forecast-data';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {navigations} from '@config/app-navigation/constants';

interface homescreenProps {
  route: {
    params: {
      city?: string;
    };
  };
}

export default function HomeScreen(props: homescreenProps) {
  const {city} = props.route.params || {};
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const [forecastDays, setForecastDays] = useState(3);
  const [changedDates, setChangedDates] = useState(3);

  const {fetchForecast, data} = useGetForecastData();

  const {forecast, currentWeather, location, extraInfo} = data || {};

  useFocusEffect(
    useCallback(() => {
      fetchForecast({days: forecastDays, location: city});
    }, [forecastDays, city]),
  );

  const navigateToSearch = () => {
    navigation.navigate(navigations.searchScreen);
  };

  const getAnnimationForWeather = key => {
    switch (key) {
      case appConstants.cloudy:
        return cloudy;

      default:
        return cloudy;
        return null;
    }
  };
  const renderExtraItem = ({item, index}) => {
    return (
      <View style={styles.extraInfoContainer}>
        <TextComponent style={styles.extraInfoHeading}>
          {item?.label}
        </TextComponent>
        <ImageComponent
          resizeMode="contain"
          source={item.image}
          style={[styles.infoImage, item?.sunrise && styles.sunRiseimage]}
        />
        <TextComponent style={styles.extraInfoValue}>
          {item?.value}
        </TextComponent>
      </View>
    );
  };
  const renderForecast = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let params = {
            forecast: item.forecastday,
          };
          navigation.navigate(navigations.detailedScreen, params);
        }}
        style={styles.forecastContainer}>
        <ImageComponent isUrl uri={item.icon} style={styles.weatherIcon} />
        <TextComponent style={styles.day}>{item?.date}</TextComponent>
        <TextComponent style={styles.temp}>
          {item?.high} {item?.low}
        </TextComponent>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageComponent
        blurRadius={100}
        source={bgimage}
        style={styles.bgImage}
      />
      <ScrollView
        contentContainerStyle={styles.pb}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          <TouchableOpacity
            onPress={navigateToSearch}
            style={styles.searchIconContainer}>
            <ImageComponent style={styles.searchIcon} source={searchIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tempContainer}>
          <View
            style={{
              justifyContent: 'space-around',
              flex: 0.6,
            }}>
            <View>
              <TextComponent textStyle={styles.tempText}>
                {currentWeather.temp}
              </TextComponent>
              <TextComponent textStyle={styles.weatherText}>
                {currentWeather?.description}
              </TextComponent>
            </View>

            <View>
              <View style={styles.flexRow}>
                <TextComponent textStyle={styles.locationText}>
                  {location?.name}
                </TextComponent>
                <ImageComponent
                  source={whiteLocation}
                  style={styles.locationIcon}
                />
              </View>
              <TextComponent style={styles.highLowTemp}>
                {currentWeather.maxTemp}/{currentWeather.minTemp}{' '}
                {strings.feelsLike} {currentWeather.feelsLike}
              </TextComponent>
            </View>
          </View>
          <View style={[styles.flex0p5]}>
            <LottieView
              source={getAnnimationForWeather('ok')}
              autoPlay
              loop
              style={styles.weatherAnimation}
            />
          </View>
        </View>

        <View>
          <View style={[styles.flexRow, styles.spaceBetween]}>
            <View style={styles.flexRow}>
              <ImageComponent source={calendar} style={styles.calendarIcon} />
              <TextComponent style={styles.heading}>
                {strings.dailyForeCast}
              </TextComponent>
            </View>
            <View style={[styles.flexRow, styles.justifyCenter]}>
              <TextInput
                value={changedDates.toString()}
                onChangeText={setChangedDates}
                style={styles.dateChanger}
                maxLength={1}
                onEndEditing={() => {
                  setForecastDays(Number(changedDates));
                }}
              />
              <TextComponent style={styles.forcastDays}>
                {strings.forecastDays}
              </TextComponent>
            </View>
          </View>

          <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={forecast}
            renderItem={renderForecast}
            horizontal
            style={styles.mgt16}
          />
        </View>

        <FlatList
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          data={extraInfo}
          renderItem={renderExtraItem}
          contentContainerStyle={[styles.flexRow, styles.extrainfo]}
        />
      </ScrollView>
    </View>
  );
}
