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
import {INetResponse, IVideo} from '../../types/net';
import {getDeviceWidth} from '../util/PixelUtil';
import Video from 'react-native-video';
import CommonVideo from './CommonVideo';
import {ToastUtil} from '../../src/util/ToastUtil';

type IVideoPlayUrl = {
  title: string;
  videoUrl: string;
};

export default (props: NativeStackScreenProps<any>) => {
  const id = props.route.params?.id;

  const [data, setData] = React.useState<IVideo>();
  const [currentUrl, setCurrentUrl] = React.useState<string>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(true);

  // const refVideoPlayer = React.useRef<VideoPlayer>();

  const vod_play_url_list = React.useMemo(() => {
    const array = data?.vod_play_url.split('$$$')[1].split('#');
    return array?.map(str => {
      const subArr = str.split('$');
      return {
        title: subArr[0],
        videoUrl: subArr[1],
      } as IVideoPlayUrl;
    });
  }, [data]);

  React.useEffect(() => {
    if (vod_play_url_list !== undefined) {
      setCurrentUrl(vod_play_url_list![0].videoUrl);
    }
  }, [vod_play_url_list]);

  React.useEffect(() => {
    NetCommonUtil.netGet(
      `http://107.174.115.150:5000/api/feisu/detail?id=${id}`,
      {},
    ).then(res => {
      setData((res as INetResponse).list[0] as IVideo);
    });
  }, []);

  React.useEffect(() => {}, [currentUrl]);

  return (
    <View style={{flex: 1}}>
      <CommonVideo
        key={currentUrl ?? '' + 111}
        // ref={refVideoPlayer}
        style={{width: '100%', height: 300, backgroundColor: '#000'}}
        source={{
          uri: currentUrl ?? '',
        }}
        controls={true}
        paused={paused}
        repeat={false}
        onLoad={() => {
          setPaused(false);
          console.log('Video loaded!');
        }}
        onEnd={() => {
          const nextIndex = currentIndex + 1;
          if (nextIndex >= vod_play_url_list?.length!) {
            return;
          }
          ToastUtil.show('自动播放下一集');
          setTimeout(() => {
            setCurrentUrl(vod_play_url_list![nextIndex].videoUrl);
          }, 2000);
        }}
        // onProgress={() => console.log('Video progress')}
        onError={(error: any) => console.error('Error loading video:', error)}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.tagListContain}>
          {vod_play_url_list?.map(v => {
            const isSelected = v.videoUrl === currentUrl;
            return (
              <TouchableOpacity
                key={v.videoUrl}
                style={[
                  styles.tagContain,
                  {backgroundColor: isSelected ? '#9bddfc' : '#FFF'},
                ]}
                onPress={() => {
                  setCurrentUrl(v.videoUrl);
                }}>
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: isSelected ? 'blue' : '#333',
                    },
                  ]}>
                  {v.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {},
  tagListContain: {
    flex: 1,
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  tagContain: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#f1f1f1',
  },
  tagText: {
    fontSize: 14,
    color: '#333333',
  },
});
