/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {NetCommonUtil} from 'react-native-common-net';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {FuncUtil} from 'src/Util/FuncUtil';
import SearchBar from './react/src/common/components/SearchBar';
import VideoDetail from './react/src/pages/VideoDetail';
import {INetResponse} from './react/types/net';

function HomeScreen({navigation}) {
  const [result, setResult] = React.useState<INetResponse>();
  const [keyword, setKeyword] = React.useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const list = React.useMemo(() => {
    return result?.list;
  }, [result]);

  const onPress = (id: number) => {
    navigation.navigate('VideoDetail', {
      id: id,
    });
  };

  const fetchListReq = () => {
    NetCommonUtil.netGet(
      `http://107.174.115.150:5000/api/feisu/search?wd=${
        keyword ?? ''
      }`,
      {},
    )
      .then(res => {
        setResult(res as INetResponse);
      })
      .catch(e => {
        console.log(111111, e);
      });
  };

  useEffect(() => {
    fetchListReq();
  }, []);

  useEffect(() => {
    // FuncUtil.throttle(() => {
    fetchListReq();
    // }, 1000);
  }, [keyword]);

  const {top} = useSafeAreaInsets();

  return (
    <View style={{flex: 1, backgroundColor: Colors.darker, paddingTop: top}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SearchBar
        placeholder="你喜欢什么电影呢?"
        editable={true}
        style={{
          marginHorizontal: 10,
          backgroundColor: '#FFF',
        }}
        onChangeText={text => {
          setKeyword(text);
        }}
        value={keyword}
        onSubmitEditing={e => {
          setKeyword(e.nativeEvent.text);
        }}
      />
      <Text
        style={{
          fontSize: 30,
          color: '#FFF',
          backgroundColor: Colors.darker,
        }}>
        电视剧
      </Text>
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        style={{backgroundColor: '#232226', flex: 1}}>
        <Text style={{fontSize: 22, color: '#FFF', fontWeight: 'bold'}}>
          热门
        </Text>

        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          {['爱情公寓', '狂飙', '庆余年'].map(title => {
            return (
              <TagView
                title={title}
                onPress={() => {
                  setKeyword(title);
                }}
              />
            );
          })}
        </View>
        <Text style={{fontSize: 22, color: '#FFF', fontWeight: 'bold'}}>
          随机推荐
        </Text>
        {list?.map(item => {
          return (
            <TouchableOpacity
              key={item.vod_id}
              style={{padding: 10}}
              onPress={() => {
                onPress(item.vod_id);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{uri: item.vod_pic}}
                  style={{
                    width: '30%',
                    height: 150,
                    borderRadius: 10,
                  }}
                />
                <Image
                  source={{uri: item.vod_pic}}
                  style={{
                    width: '68%',
                    height: 150,
                    borderRadius: 10,
                  }}
                />
              </View>
              <Text style={{fontSize: 20, color: '#FFF'}}>{item.vod_name}</Text>
              <Text style={{fontSize: 13, color: '#FFF'}}>
                {item.vod_blurb}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

type IPropsTagView = {
  title: string;
  onPress?: () => void;
};

function TagView(props: IPropsTagView) {
  return (
    <TouchableOpacity
      style={{
        height: 30,
        borderRadius: 15,
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => props.onPress && props.onPress()}>
      <Text style={{fontSize: 15, color: 'orange'}}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
