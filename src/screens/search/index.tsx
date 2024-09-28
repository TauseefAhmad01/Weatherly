import {ImageBackground, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SearchInput} from '@components/search-bar-component';
import {strings} from '@appconstants';
import {createStyleSheet} from './style';
import useAppTheme from '@theme/theme';
import {bgimage} from '@assets/images';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import {navigations} from '@config/app-navigation/constants';

import {useDispatch, useSelector} from 'react-redux';
import {
  emptyAutoSuggest,
  fetchAutoCompleteLocations,
  setCurrentCityName,
} from '@network/reducers/location-reducer';
import {TextComponent} from '@components/text-component';

export default function SearchCity() {
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  // const {data, fetchSearch, loading} = useAutocomplete();
  const {location, loading} = useSelector(state => state.location);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSearch = text => {
    dispatch(fetchAutoCompleteLocations(text));
    setSearchValue(text);
  };

  const handleSelectedCity = item => {
    dispatch(setCurrentCityName(item.name));
    dispatch(emptyAutoSuggest());
    navigation.navigate(navigations.homeScreen, {city: item.name});
  };
  const debouncedFetchSearch = useCallback(debounce(handleSearch, 1000), []);
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground blurRadius={100} source={bgimage} style={styles.container}>
      <SearchInput
        containerStyle={[styles.mg16, styles.zindex]}
        ref={inputRef}
        data={location || []}
        emptyEnable={searchValue.length > 2 && !loading}
        placeholder={strings.searchCity}
        onChangeText={debouncedFetchSearch}
        placeholderTextColor={theme.colors.white}
        selectedItem={handleSelectedCity}
      />
      <View style={styles.full}>
        <TouchableOpacity style={styles.buttonContainer}>
          <TextComponent
            suppressHighlighting
            onPress={goBack}
            style={styles.goback}>
            {strings.goBack}
          </TextComponent>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
