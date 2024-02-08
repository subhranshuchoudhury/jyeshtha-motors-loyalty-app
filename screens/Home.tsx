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
import {ThemeContext} from '../context/ThemeContext';
import {Carousel} from 'react-native-ui-lib';
import {carousels} from '../demo/data';
const HomeScreen = (props: any) => {
  const {Theme, setTheme}: any = useContext(ThemeContext);
  // splash screen
  useEffect(() => {
    console.log('HomeScreen.tsx', Theme);
    changeNavigationBarColorAsync();
  }, []);

  const changeNavigationBarColorAsync = async () => {
    try {
      const response = await changeNavigationBarColor(Theme.theme.background);
      // console.log(response); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }
  };

  return (
    <View
      style={{
        backgroundColor: Theme.theme.background,
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={Theme.theme.primary}
        barStyle={Theme.theme.isLight ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        {/* <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: Theme.theme.primary,
            marginTop: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}></View> */}

        <Carousel loop animated autoplay>
          {carousels.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    marginTop: 40,
                    width: '90%',
                    height: 100,
                    backgroundColor: Theme.theme.primary,
                    borderRadius: 8,
                  }}>
                  <Text>{item.name}</Text>
                </View>
              </View>
            );
          })}
        </Carousel>
      </View>
    </View>
  );
};

export default HomeScreen;
