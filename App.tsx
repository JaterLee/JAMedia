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
      `https://www.feisuzyapi.com/api.php/provide/vod/?ac=detail&wd=${
        keyword ?? '爱情公寓'
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
          fetchListReq();
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
        {list?.map(item => {
          console.log(item.vod_pic);
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
