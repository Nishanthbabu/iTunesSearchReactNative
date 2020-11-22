import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-elements';
const Details = ({route}) => {
  const {trackData} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#c3c3c3',
        }}>
        <Text>Music Player</Text>
      </View>
      <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{trackData.artistName}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default Details;
