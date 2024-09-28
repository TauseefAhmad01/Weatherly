import {
  FlatList,
  ImageBackground,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAppTheme from '../../theme/theme';
import {createStyleSheet} from './style';
import {
  bgimage,
  calendar,
  error,
  searchIcon,
  whiteLocation,
} from '@assets/images';
import {ImageComponent} from '@components/image-component';
import {appConstants, strings} from '@appconstants';
import {TextComponent} from '@components/text-component';
import LottieView from 'lottie-react-native';
import cloudy from '@utils/Json/cloudy.json';
import partlyCloudy from '@utils/Json/partlyCloudy.json';
import partlysunnyRain from '@utils/Json/partlySunnyRain.json';
import snow from '@utils/Json/snow.json';
import sunny from '@utils/Json/sunny.json';
import thunderstorm from '@utils/Json/thunderStorm.json';
import mist from '@utils/Json/mist.json';
import rain from '@utils/Json/rain.json';
import {useNavigation} from '@react-navigation/native';
import {navigations} from '@config/app-navigation/constants';
import {Loader} from '@components/loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchWeatherData,
  setFutureForecast,
} from '@network/reducers/weather-reducer';

interface homescreenProps {
  route: {
    params: {
      city?: string;
      days?: number;
    };
  };
}

export default function HomeScreen(props: homescreenProps) {
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {
    weatherData: data,
    loading,
    error: respError,
  } = useSelector(state => state.weather);
  const {forecast, currentWeather, location, extraInfo} = data || {};
  const days = forecast?.length || 3;

  const {currentCity} = useSelector(state => state.location);
  const [forecastDays, setForecastDays] = useState(days);
  const [changedDates, setChangedDates] = useState(days);

  const fetchForecastForCity = () => {
    dispatch(fetchWeatherData({cityName: currentCity, days: forecastDays}));
  };

  useEffect(() => {
    if (!!currentCity) fetchForecastForCity();
  }, [forecastDays, dispatch, currentCity]);

  const navigateToSearch = () => {
    navigation.navigate(navigations.searchScreen);
  };

  const getAnnimationForWeather = key => {
    switch (key) {
      case appConstants.cloudy:
        return cloudy;
      case appConstants.sunny:
      case appConstants.clear:
        return sunny;
      case appConstants.partlyCloudy:
        return partlyCloudy;

      case appConstants.heavyRain:
      case appConstants.moderateRain:
      case appConstants.moderateHeavyFreezingRain:
      case appConstants.moderateHeavyFreezingShower:
        return rain;
      case appConstants.heavyRainAtTimes:
      case appConstants.lightRain:
      case appConstants.lightRainShower:
      case appConstants.moderateRainTimes:
        return partlysunnyRain;

      case appConstants.mist:
        return mist;

      case appConstants.moderateHeavyRainWithThunder:
        return thunderstorm;
      case appConstants.moderateHeavySnowShower:
        return snow;

      default:
        return null;
    }
  };
  const renderEmptyScreen = () => {
    return (
      <View style={styles.emptyScreenContainer}>
        <TextComponent style={styles.oopsHeading}>{strings.oops}</TextComponent>
        <ImageComponent source={error} style={styles.errorImage} />
        <TextComponent style={styles.errorValue}>
          {strings.noCitySelected}
        </TextComponent>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToSearch}>
          <TextComponent style={styles.buttonText}>
            {strings.selectCity}
          </TextComponent>
        </TouchableOpacity>
      </View>
    );
  };

  const navigateToDetailed = data => {
    dispatch(setFutureForecast(data));
    navigation.navigate(navigations.detailedScreen);
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
          navigateToDetailed(item.forecastday);
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

  const renderForcast = () => {
    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={navigateToSearch}
            style={styles.searchIconContainer}>
            <ImageComponent style={styles.searchIcon} source={searchIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tempContainer}>
          <View>
            <TextComponent textStyle={styles.tempText}>
              {currentWeather.temp}
            </TextComponent>
          </View>
          <View style={[styles.lottiContainer]}>
            {!!getAnnimationForWeather(currentWeather.description) &&
            !loading ? (
              <LottieView
                source={getAnnimationForWeather(currentWeather.description)}
                autoPlay
                loop
                style={styles.weatherAnimation}
              />
            ) : (
              <ImageComponent
                style={styles.weatherAnimationImage}
                isUrl
                uri={currentWeather.weatherImage}
              />
            )}
          </View>
        </View>
        <TextComponent textStyle={styles.weatherText}>
          {currentWeather?.description}
        </TextComponent>

        <View style={styles.mainConatiner}>
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
                keyboardType="number-pad"
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
          numColumns={2}
          data={extraInfo}
          renderItem={renderExtraItem}
          contentContainerStyle={[styles.flexRow, styles.extrainfo]}
        />
      </View>
    );
  };

  return (
    <ImageBackground blurRadius={100} source={bgimage} style={styles.container}>
      <Loader isLoading={loading} showOverlay={!forecast?.length} />

      {forecast?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[{}]}
          contentContainerStyle={styles.pb}
          bounces={false}
          renderItem={renderForcast}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchForecastForCity}
            />
          }
        />
      ) : (
        renderEmptyScreen()
      )}
    </ImageBackground>
  );
}
