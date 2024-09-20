import {
  FlatList,
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';
import useAppTheme from '@theme/theme';
import {createStyleSheet} from './style';
import {ImageComponent} from '@components/image-component';
import {location, searchIcon} from '@assets/images';
import {TextComponent} from '@components/text-component';
import normalize from 'react-native-normalize';

interface Searchrop extends TextInputProps {
  data?: any[];
  ViewStyle?: ViewStyle;
}
export const SearchInput = (props: Searchrop) => {
  const {
    ViewStyle,
    data = [
      {
        id: 2801268,
        name: 'London, City of London, Greater London, United Kingdom',
        region: 'City of London, Greater London',
        country: 'United Kingdom',
        lat: 51.52,
        lon: -0.11,
        url: 'london-city-of-london-greater-london-united-kingdom',
      },
      {
        id: 2796590,
        name: 'Holborn, Camden, Greater London, United Kingdom',
        region: 'Camden, Greater London',
        country: 'United Kingdom',
        lat: 51.52,
        lon: -0.12,
        url: 'holborn-camden-greater-london-united-kingdom',
      },
      {
        id: 2812957,
        name: 'St Giles, Camden, Greater London, United Kingdom',
        region: 'Camden, Greater London',
        country: 'United Kingdom',
        lat: 51.52,
        lon: -0.12,
        url: 'st-giles-camden-greater-london-united-kingdom',
      },
      {
        id: 2786308,
        name: 'Clerkenwell, Islington, Greater London, United Kingdom',
        region: 'Islington, Greater London',
        country: 'United Kingdom',
        lat: 51.53,
        lon: -0.11,
        url: 'clerkenwell-islington-greater-london-united-kingdom',
      },
      {
        id: 2791655,
        name: 'Finsbury, Islington, Greater London, United Kingdom',
        region: 'Islington, Greater London',
        country: 'United Kingdom',
        lat: 51.53,
        lon: -0.11,
        url: 'finsbury-islington-greater-london-united-kingdom',
      },
    ],
    ...remainingProps
  } = props;
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  const [toggleSearch, setToggleSearch] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const toggleSearchHandler = () => {
    setToggleSearch(!toggleSearch);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 10);
  };

  const renderSearchItems = ({item, index}) => {
    return (
      <View key={index} style={styles.searchItemContainer}>
        <View style={{padding: normalize(6)}}>
          <ImageComponent source={location} style={styles.pinIcon} />
        </View>
        <TextComponent textStyle={styles.searchTextStyle}>
          {item.name}
        </TextComponent>
      </View>
    );
  };

  return (
    <View>
      {toggleSearch ? (
        <TextInput
          ref={inputRef}
          style={[styles.textInput, ViewStyle]}
          {...remainingProps}
        />
      ) : null}
      <TouchableOpacity
        onPress={toggleSearchHandler}
        style={styles.searchIconContainer}>
        <ImageComponent style={styles.searchIcon} source={searchIcon} />
      </TouchableOpacity>
      {toggleSearch && data?.length > 0 ? (
        <FlatList
          ItemSeparatorComponent={() => <View style={{borderBottomWidth: 1}} />}
          data={data}
          contentContainerStyle={styles.searchContainer}
          renderItem={renderSearchItems}
        />
      ) : null}
    </View>
  );
};
