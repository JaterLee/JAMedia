import React from 'react';
import {TextInputFocusEventData} from 'react-native';
import {TextInputSubmitEditingEventData} from 'react-native';
import {
  StyleProp,
  ViewStyle,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ColorValue,
  NativeSyntheticEvent,
} from 'react-native';
import {toDips} from '../../../Util/PixelUtil';

type IProps = {
  value?: string;
  onPress?: () => void;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  // onPressClear?: () => void;
  placeholder: string;
  editable: boolean;
  autoFocus?: boolean;
  focusBorderColor?: ColorValue;
  focusBackgroundColor: ColorValue | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  placeholderTextColor?: ColorValue;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  searchIconPosition?: 'left' | 'right';
};

const SearchBar = (props: IProps) => {
  const [focused, setFocused] = React.useState(false);
  const {
    editable,
    value = '',
    searchIconPosition,
    focusBorderColor = '#03bdac',
    focusBackgroundColor = '#FFF',
    placeholder = '请输入',
    placeholderTextColor = '#999',
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.contain,
        {
          borderColor: focused ? focusBorderColor : 'transparent',
          backgroundColor: focused
            ? focusBackgroundColor
            : styles.contain.backgroundColor,
        },
        props.style,
      ]}
      disabled={editable}
      onPress={() => {
        props.onPress && props.onPress();
      }}>
      {(editable || searchIconPosition === 'left') && (
        <Image
          style={styles.iconClear}
          source={require('/Users/lijunzhuo/Developer/RN/JAMedia/react/assets/img/searchIcon.png')}
        />
      )}

      {editable ? (
        <TextInput
          autoFocus={props.autoFocus}
          onFocus={e => {
            props.onFocus && props.onFocus(e);
            setFocused(true);
          }}
          onBlur={e => {
            props.onBlur && props.onBlur(e);
            setFocused(false);
          }}
          style={[
            styles.content,
            props.value ? styles.contentText : styles.contentHideText,
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? undefined}
          editable={props.editable}
          onChangeText={props.onChangeText}
          returnKeyType={'search'}
          returnKeyLabel={'搜索'}
          onSubmitEditing={props.onSubmitEditing}
        />
      ) : (
        <Text
          style={{
            ...styles.contentText,
            fontSize: toDips(28),
            flex: 1,
            color: value ? '#333333' : placeholderTextColor,
          }}>
          {props.value ? props.value : placeholder}
        </Text>
      )}

      {props.value && (
        <TouchableOpacity
          onPress={() => {
            props.onChangeText && props.onChangeText('');
            // props.onPressClear && props.onPressClear();
          }}>
          {/* <Image
            style={styles.iconClear}
            source={require('assets/img/common/ic_close_circle.png')}
          /> */}
        </TouchableOpacity>
      )}
      {/* {!editable && searchIconPosition !== 'left' && (
        <Image
          style={styles.iconClear}
          source={require('assets/img/searchIcon.png')}
        />
      )} */}
    </TouchableOpacity>
  );
};

const defaultProps: IProps = {
  placeholder: '搜索',
  editable: true,
  focusBorderColor: '#EEE',
  focusBackgroundColor: undefined,
};
SearchBar.defaultProps = defaultProps;

export {SearchBar};
export default SearchBar;

const styles = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    height: 33,
    borderRadius: 33,
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderWidth: 1,
  },
  iconSearch: {
    width: 15,
    height: 15,
    marginRight: 4,
    resizeMode: 'contain',
  },
  iconClear: {
    width: 19,
    height: 19,
    resizeMode: 'cover',
  },
  content: {
    paddingLeft: 2,
    height: 33,
    flex: 1,
    padding: 0,
    borderWidth: 0,
  },
  contentText: {
    fontSize: 15,
    color: '#333',
  },
  contentHideText: {
    fontSize: 13,
    color: '#999',
  },
});
