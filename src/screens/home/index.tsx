import {View} from 'react-native';
import React from 'react';
import useAppTheme from '../../theme/theme';
import {createStyleSheet} from './style';
import {bgimage} from '@assets/images';
import {ImageComponent} from '@components/image-component';
import {SearchInput} from '@components/search-bar-component';
import {strings} from '@appconstants';

export default function HomeScreen() {
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);

  const handleSearch = (text: string) => {
    console.log('gfhj', text);
  };

  return (
    <View style={styles.container}>
      <ImageComponent
        blurRadius={100}
        source={bgimage}
        style={styles.bgImage}
      />
      <SearchInput
        placeholder={strings.searchCity}
        onChangeText={handleSearch}
        placeholderTextColor={theme.colors.white}
      />
    </View>
  );
}
