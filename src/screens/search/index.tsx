import {TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SearchInput} from '@components/search-bar-component';
import {strings} from '@appconstants';
import {createStyleSheet} from './style';
import useAppTheme from '@theme/theme';
import {bgimage} from '@assets/images';
import {ImageComponent} from '@components/image-component';
import {useNavigation} from '@react-navigation/native';
import useAutocomplete from '@network/get-auto-complete';
import {debounce} from 'lodash';
import {navigations} from '@config/app-navigation/constants';

export default function SearchCity() {
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const [searchValue, setSearchValue] = useState('');

  const {data, fetchSearch, loading} = useAutocomplete();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSearch = text => {
    fetchSearch(text);
    setSearchValue(text);
  };

  const handleSelectedCity = item => {
    navigation.navigate(navigations.homeScreen, {city: item.name});
  };
  const debouncedFetchSearch = useCallback(debounce(handleSearch, 1000), []);

  return (
    <View style={styles.container}>
      <ImageComponent
        blurRadius={100}
        source={bgimage}
        style={styles.bgImage}
      />
      <SearchInput
        ref={inputRef}
        data={data || []}
        emptyEnable={searchValue.length > 2 && !loading}
        placeholder={strings.searchCity}
        onChangeText={debouncedFetchSearch}
        placeholderTextColor={theme.colors.white}
        selectedItem={handleSelectedCity}
      />
    </View>
  );
}
