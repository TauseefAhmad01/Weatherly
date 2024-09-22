import {
  FlatList,
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useAppTheme from '@theme/theme';
import {createStyleSheet} from './style';
import {ImageComponent} from '@components/image-component';
import {location, searchIcon} from '@assets/images';
import {TextComponent} from '@components/text-component';
import normalize from 'react-native-normalize';
import {strings} from '@appconstants';

interface Searchrop extends TextInputProps {
  data?: any[];
  ViewStyle?: ViewStyle;
  selectedItem?: () => {};
  emptyEnable?: boolean;
  containerStyle?: ViewStyle;
}
const searchInput = (props: Searchrop, ref: React.Ref<TextInput>) => {
  const {
    emptyEnable = false,
    ViewStyle,
    selectedItem,
    data = [],
    containerStyle,
    ...remainingProps
  } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);

  const renderSearchItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectedItem?.(item);
        }}
        key={index}
        style={styles.searchItemContainer}>
        <View style={{padding: normalize(6)}}>
          <ImageComponent source={location} style={styles.pinIcon} />
        </View>
        <TextComponent textStyle={styles.searchTextStyle}>
          {item.name}, {item.country}
        </TextComponent>
      </TouchableOpacity>
    );
  };

  return (
    <View style={containerStyle}>
      <TextInput
        ref={ref}
        style={[styles.textInput, ViewStyle]}
        {...remainingProps}
      />

      <View style={styles.searchIconContainer}>
        <ImageComponent style={styles.searchIcon} source={searchIcon} />
      </View>
      {data?.length > 0 ? (
        <FlatList
          bounces={false}
          ItemSeparatorComponent={() => <View style={{borderBottomWidth: 1}} />}
          data={data}
          contentContainerStyle={styles.searchContainer}
          renderItem={renderSearchItems}
        />
      ) : null}
      {emptyEnable && data?.length == 0 ? (
        <View style={styles.searchContainer}>
          <TextComponent style={styles.emptyText}>
            {strings.sorryNoCityFOund}
          </TextComponent>
        </View>
      ) : null}
    </View>
  );
};

export const SearchInput = React.forwardRef(searchInput);
