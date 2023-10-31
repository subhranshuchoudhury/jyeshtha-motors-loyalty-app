import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
// import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  // splash screen
  useEffect(() => {
    setTimeout(() => {
      //   SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
