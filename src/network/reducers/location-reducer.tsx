import {apiEndPoints, apiKey} from '@network/constant';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  location: [],
  loading: false,
  error: null,
  currentCity: '',
};

export const fetchAutoCompleteLocations = createAsyncThunk(
  'location/fetchLocation',
  async (locations: string) => {
    const endPoint = `${apiEndPoints?.getAutocomplete}key=${apiKey}&q=${locations}`;
    const {data} = await axios?.get(endPoint);
    return data;
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentCityName(state, action) {
      state.currentCity = action.payload;
    },
    emptyAutoSuggest(state) {
      state.location = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAutoCompleteLocations.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchAutoCompleteLocations.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.location = action.payload);
      })
      .addCase(fetchAutoCompleteLocations.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || 'Failed to fetch locations');
      });
  },
});

export const {setCurrentCityName, emptyAutoSuggest} = locationSlice.actions;
export default locationSlice.reducer;
