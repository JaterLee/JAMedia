/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NetCommonUtil} from 'react-native-common-net';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {INetResponse} from './src/Model/net';

function App(): JSX.Element {
  const [result, setResult] = React.useState<INetResponse>();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const list = React.useMemo(() => {
    return result?.list;
  }, [result]);

  useEffect(() => {
    NetCommonUtil.netGet(
      'https://www.feisuzyapi.com/api.php/provide/vod/?ac=detail&wd=爱情公寓',
      {},
    )
      .then(res => {
        setResult(res as INetResponse);
      })
      .catch(e => {
        console.log(111111, e);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: '#232226', flex: 1}}>
        <Text style={{fontSize: 30, color: '#FFF'}}>电视剧</Text>
        {list?.map(item => {
          console.log(item.vod_pic);
          return (
            <View key={item.vod_id} style={{padding: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={{uri: item.vod_pic}}
                  style={{width: '30%', height: 150, borderRadius: 10}}></Image>
                <Image
                  source={{uri: item.vod_pic}}
                  style={{width: '68%', height: 150, borderRadius: 10}}></Image>
              </View>
              <Text style={{fontSize: 20, color: '#FFF'}}>{item.vod_name}</Text>
              <Text style={{fontSize: 13, color: '#FFF'}}>
                {item.vod_blurb}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
