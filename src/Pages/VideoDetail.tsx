import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {NetCommonUtil} from 'react-native-common-net';
import Video from 'react-native-video';
import {INetResponse, IVideo} from '../Model/net';

type IVideoPlayUrl = {
  title: string;
  videoUrl: string;
};

export default (props: NativeStackScreenProps<any>) => {
  const id = props.route.params.id;

  const [data, setData] = React.useState<IVideo>();
  const [currentUrl, setCurrentUrl] = React.useState<string>();

  const vod_play_url_list = React.useMemo(() => {
    const array = data?.vod_play_url.split('$$$')[1].split('#');
    return array?.map(str => {
      const subArr = str.split('$');
      console.log(subArr);

      return {
        title: subArr[0],
        videoUrl: subArr[1],
      } as IVideoPlayUrl;
    });
  }, [data]);

  React.useEffect(() => {
    NetCommonUtil.netGet(
      `https://www.feisuzyapi.com/api.php/provide/vod/?ac=detail&ids=${id}`,
      {},
    ).then(res => {
      setData((res as INetResponse).list[0] as IVideo);
    });
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <Video
        style={{width: '100%', height: 300, backgroundColor: '#000'}}
        source={{
          uri: currentUrl ?? '',
        }}
        controls={true}
        // paused={true}
        repeat={true}
        onLoad={() => console.log('Video loaded!')}
        onError={error => console.error('Error loading video:', error)}></Video>
      <View style={styles.tagListContain}>
        {vod_play_url_list?.map(v => {
          return (
            <TouchableOpacity
              style={styles.tagContain}
              onPress={() => {
                setCurrentUrl(v.videoUrl);
              }}>
              <Text style={styles.tagText}>{v.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contain: {},
  tagListContain: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tagContain: {
    flexDirection: 'row',
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 9,
    marginTop: 12,
    marginRight: 12,
    borderRadius: 18,
    backgroundColor: '#f1f1f1',
  },
  tagText: {
    fontSize: 14,
    color: '#333333',
  },
});
