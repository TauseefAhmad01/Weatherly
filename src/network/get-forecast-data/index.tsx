import {useState} from 'react';
import axios from 'axios';
import {apiEndPoints, apiKey} from '@network/constant';
import {humidity, sunrise, uv, wind} from '@assets/images';
import moment from 'moment';
import {appConstants, strings} from '@appconstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
interface ForecastProps {
  days?: number;
  location: string;
}

interface ForecastResponse {
  forecast?: any[];
}

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(appConstants.weather, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(appConstants.weather);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem(appConstants.weather);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

export default function useGetForecastData() {
  const [resp, setResp] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(true);
  const {isConnected} = useNetInfo();

  function addHttpsToIcons(data) {
    if (data?.day?.condition?.icon) {
      data.day.condition.icon = 'https:' + data.day.condition.icon;
    }

    if (data?.hour?.length > 0) {
      data.hour.forEach(hourlyData => {
        if (hourlyData?.condition?.icon) {
          hourlyData.condition.icon = 'https:' + hourlyData.condition.icon;
        }
      });
    }
    return data;
  }

  const DeepClone = data => JSON.parse(JSON.stringify(data));

  function parseWeatherData(apiResponse) {
    const parsedData = {
      location: {
        name: apiResponse?.location?.name,
        country: apiResponse?.location?.country,
      },
      currentWeather: {
        temp: apiResponse?.current?.temp_c + strings.degreeC,
        description: apiResponse?.current?.condition?.text,
        weatherImage: 'https:' + apiResponse?.current?.condition?.icon,
        feelsLike: apiResponse?.current?.feelslike_c + strings.degreeC,
        maxTemp:
          apiResponse?.forecast?.forecastday?.[0]?.day?.maxtemp_c +
          strings.degree,
        minTemp:
          apiResponse?.forecast?.forecastday?.[0]?.day?.mintemp_c +
          strings.degree,
      },

      forecast: apiResponse?.forecast?.forecastday?.map(day => ({
        date: moment(day?.date).format('dddd'),
        high: day?.day?.maxtemp_c + strings.degree,
        low: day?.day?.mintemp_c + strings.degree,
        icon: 'https:' + day?.day?.condition?.icon,
        desc: day?.day?.condition?.text,
        forecastday: addHttpsToIcons(DeepClone(day)),
      })),

      extraInfo: [
        {
          label: 'Humidity',
          value: apiResponse?.current?.humidity + strings.percentage,
          image: humidity,
        },
        {label: 'UV index', value: apiResponse?.current?.uv, image: uv},
        {
          label: 'Sunset Sunrise',
          value: `${apiResponse?.forecast?.forecastday?.[0]?.astro?.sunrise} / ${apiResponse?.forecast?.forecastday?.[0]?.astro?.sunset}`,
          image: sunrise,
          sunrise: true,
        },
        {
          label: 'Wind speed',
          value: apiResponse?.current?.wind_kph + ' kmph',
          image: wind,
        },
      ],
    };

    return parsedData;
  }

  const fetchForecast = async (props: ForecastProps) => {
    const {days = 1, location} = props;
    const endPoint = `${apiEndPoints?.getForcast}key=${apiKey}&q=${location}&days=${days}&aqi=no&alerts=no`;
    setLoading(true);
    setError(null);

    try {
      const {data} = await axios?.get(endPoint);
      await removeValue();
      await storeData(data);

      await setResp(data);
    } catch (err: any) {
      setShowError(true);
      const cachedData = await getData();
      if (!cachedData) {
        setShowError(false);
      } else if (!isConnected) {
        setResp(cachedData);
        return;
      }
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    data: parseWeatherData(resp),
    fetchForecast,
    loading,
    error,
    showError,
  };
}
