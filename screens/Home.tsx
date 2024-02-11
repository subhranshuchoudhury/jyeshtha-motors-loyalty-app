import {StatusBar} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ThemeContext} from '../context/ThemeContext';
import AdCarousel from '../components/Home/AdCarousel';
import TransactionsList from '../components/Home/TransactionsList';
import QuickMenu from '../components/Home/QuickMenu';
import {View} from 'react-native-ui-lib';
const HomeScreen = ({props}: any) => {
  const {Theme}: any = useContext(ThemeContext);

  // splash screen
  useEffect(() => {
    console.log('HomeScreen.tsx', Theme);
    changeNavigationBarColorAsync();
  }, []);

  const changeNavigationBarColorAsync = async () => {
    try {
      const response = await changeNavigationBarColor(
        Theme.theme.background,
        true,
        true,
      );
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
        backgroundColor={Theme.theme.background}
        barStyle={!Theme.theme.isLight ? 'light-content' : 'dark-content'}
      />
      <AdCarousel props={props} />
      <QuickMenu props={props} />
      <TransactionsList props={props} />
    </View>
  );
};

export default HomeScreen;
