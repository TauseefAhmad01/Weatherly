import {useState} from 'react';
import axios from 'axios';
import {apiEndPoints, apiKey} from '@network/constant';
import {humidity, sunrise, uv, wind} from '@assets/images';
import moment from 'moment';

interface ForecastProps {
  days?: number;
  location: string;
}

interface ForecastResponse {
  forecast?: any;
}

export default function useGetForecastData() {
  const [resp, setResp] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function parseWeatherData(apiResponse) {
    const parsedData = {
      location: {
        name: apiResponse?.location?.name,
        country: apiResponse?.location?.country,
      },
      currentWeather: {
        temp: apiResponse?.current?.temp_c + ' °',
        description: apiResponse?.current?.condition?.text,
        weatherImage: apiResponse?.current?.condition?.icon,
        feelsLike: apiResponse?.current?.feelslike_c,
        maxTemp: apiResponse?.forecast?.forecastday?.[0]?.day?.maxtemp_c + ' °',
        minTemp: apiResponse?.forecast?.forecastday?.[0]?.day?.mintemp_c + ' °',
      },

      forecast: apiResponse?.forecast?.forecastday?.map(day => ({
        date: moment(day?.date).format('dddd'),
        high: day?.day?.maxtemp_c + ' °',
        low: day?.day?.mintemp_c + ' °',
        icon: 'https:' + day?.day?.condition?.icon,
        desc: day?.day?.condition?.text,
      })),
      extraInfo: [
        {
          label: 'Humidity',
          value: apiResponse?.current?.humidity,
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

      setResp(data);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {data: parseWeatherData(resp), fetchForecast, loading, error};
}
