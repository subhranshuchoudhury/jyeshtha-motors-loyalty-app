import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
const HomeScreen = (props: any) => {
  // splash screen
  useEffect(() => {
    changeNavigationBarColorAsync('');
  }, []);

  const changeNavigationBarColorAsync = async (color: string) => {
    try {
      const response = await changeNavigationBarColor('#F3FDE8');
      // console.log(response); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F3FDE8" barStyle="dark-content" />
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDE8',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default HomeScreen;
