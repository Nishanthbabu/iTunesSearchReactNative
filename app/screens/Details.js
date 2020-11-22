import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Image, Text} from 'react-native-elements';
import * as TrackPlayer from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import {TrackPlayerEvents, STATE_PLAYING} from 'react-native-track-player';
import {millisToMinutesAndSeconds} from '../utills/common';

//function to initialize the Track Player
const trackPlayerInit = async (trackData) => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add({
    id: '1',
    url: trackData.previewUrl,
    type: 'default',
    title: trackData.trackName,
    album: trackData.collectionName,
    artist: trackData.artistName,
    artwork: trackData.artworkUrl100,
  });
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      // TrackPlayer.CAPABILITY_JUMP_FORWARD,
      // TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    ],
  });
  return true;
};

const Details = ({navigation, route}) => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const {trackData} = route.params;
  //initialize the TrackPlayer when the App component is mounted
  useEffect(() => {
    const startPlayer = async () => {
      await TrackPlayer.reset();
      let isInit = await trackPlayerInit(trackData);
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //start playing the TrackPlayer when the button is pressed
  const onButtonPressed = () => {
    if (!isPlaying) {
      // if (T)
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_QUEUE_ENDED], (event) => {
    if (
      isTrackPlayerInit &&
      event &&
      event.type &&
      event.type === 'playback-queue-ended'
    ) {
      navigation.goBack();
    }
  });
  const trackLength = millisToMinutesAndSeconds(trackData.trackTimeMillis);
  let bannerUri = null;
  if (trackData.artworkUrl100) {
    const thumbNailType = trackData.artworkUrl100.split('.').pop();
    if (thumbNailType) {
      bannerUri =
        trackData.artworkUrl100.replace(/\/[^\/]*$/, '/500x500') +
        '.' +
        thumbNailType;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerImageContainer}>
        <Image
          style={styles.image}
          source={{uri: bannerUri ? bannerUri : ''}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.detailsAndControlsContainer}>
        <ScrollView style={{flex: 1}}>
          <Text style={styles.detailsText}>
            Track Name - {trackData.trackName}
          </Text>
          <Text style={styles.detailsText}>Kind - {trackData.kind}</Text>
          <Text style={styles.detailsText}>
            Artist - {trackData.artistName}
          </Text>
          <Text style={styles.detailsText}>
            Artist 2 - {trackData.collectionArtistName}
          </Text>
          <Text style={styles.detailsText}>Length - {trackLength}</Text>
        </ScrollView>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={onButtonPressed}
          disabled={!isTrackPlayerInit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bannerImageContainer: {
    flex: 7,
  },
  detailsAndControlsContainer: {
    padding: 5,
    flex: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsText: {
    padding: 5,
  },
});

export default Details;
