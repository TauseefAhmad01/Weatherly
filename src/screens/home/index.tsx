import {
  FlatList,
  ImageBackground,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import useGetForecastData from '@network/get-forecast-data';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {navigations} from '@config/app-navigation/constants';
import {Loader} from '@components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface homescreenProps {
  route: {
    params: {
      city?: string;
      days?: number;
    };
  };
}

export default function HomeScreen(props: homescreenProps) {
  const {city, days = 3} = props.route.params || {};
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const [forecastDays, setForecastDays] = useState(days);
  const [changedDates, setChangedDates] = useState(days);

  const {
    fetchForecast,
    data,
    loading,
    error: respError,
    showError,
  } = useGetForecastData();

  const {forecast, currentWeather, location, extraInfo} = data || {};

  const storeCityName = async value => {
    try {
      await AsyncStorage.setItem(appConstants.CityName, value);
    } catch (e) {
      // saving error
    }
  };

  const getCityNameFromCache = async () => {
    try {
      const value = await AsyncStorage.getItem(appConstants.CityName);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  const fetchForecastForCity = async () => {
    let cityName = city;
    if (!!city) {
      storeCityName(city);
    }
    if (!city) {
      cityName = await getCityNameFromCache();
    }

    fetchForecast({days: forecastDays, location: cityName});
  };

  useFocusEffect(
    useCallback(() => {
      fetchForecastForCity();
    }, [forecastDays, city]),
  );

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
          {showError ? respError : strings.noCitySelected}
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
      <Loader isLoading={loading} showOverlay />

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
