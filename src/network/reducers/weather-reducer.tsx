import {apiEndPoints, apiKey} from '@network/constant';
import {parseWeatherData} from '@network/get-forecast-data';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface props {
  days: string;
  cityName: number;
}

const initialState = {
  weatherData: {},
  selectedForecast: {},
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (props: props) => {
    const {days, cityName} = props || {};
    const endPoint = `${apiEndPoints?.getForcast}key=${apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`;
    const {data} = await axios?.get(endPoint);
    return await parseWeatherData(data);
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setFutureForecast(state, action) {
      state.selectedForecast = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherData.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        (state.loading = false),
          (state.weatherData = action.payload),
          (state.error = null);
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        (state.error = action.error.message), (state.loading = false);
      });
  },
});

export const {setFutureForecast} = weatherSlice.actions;

export default weatherSlice.reducer;
