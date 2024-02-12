import React, {useContext, useEffect} from 'react';
import {Alert, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {NavigationContainer} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faBarcode,
  faUser,
  faKey,
  faUserPlus,
  faUnlock,
  faLifeRing,
} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/Home';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import User from '../screens/User';
import Web from '../screens/Web';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Forgot from '../screens/auth/Forgot';
import Help from '../screens/Help';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const Stack = createNativeStackNavigator();
export default function App() {
  const {Theme, setTheme}: any = useContext(ThemeContext);
  const {AuthInfo, handleAuthInfo, replaceAuthInfo}: any =
    useContext(AuthContext);
  console.log('AuthInfo', AuthInfo);
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
  const _renderIcon = (routeName: any, selectedTab: any) => {
    let icon: IconProp = faHouse;

    switch (routeName) {
      case 'Home':
        icon = faHouse;
        break;
      case 'User':
        icon = faUser;
        break;
      case 'Login':
        icon = faKey;
        break;
      case 'Register':
        icon = faUserPlus;
        break;
      case 'Forgot':
        icon = faUnlock;
        break;
    }

    return (
      <FontAwesomeIcon
        icon={icon}
        color={routeName === selectedTab ? Theme.theme.primary : 'gray'}
      />
    );
  };
  const renderTabBar = (prop: any) => {
    const {routeName, selectedTab, navigate} = prop;
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const handleAuthResponse = (authInfo: authType) => {
    replaceAuthInfo(authInfo);
  };

  type authType = {
    accessToken: string | null;
    name: string;
    mobile: string;
    tokenTime: Date | null;
  };

  return (
    // for Testing purpose
    <NavigationContainer>
      {AuthInfo.accessToken ? (
        <CurvedBottomBar.Navigator
          screenOptions={{headerShown: false}}
          type="DOWN"
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={55}
          circleWidth={50}
          bgColor={Theme.theme.background}
          initialRouteName="Home"
          circlePosition="CENTER"
          borderTopLeftRight
          renderCircle={({selectedTab, navigate}) => (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Alert.alert('Click Action')}>
                <FontAwesomeIcon icon={faBarcode} size={25} />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}>
          <CurvedBottomBar.Screen
            name="Home"
            position="LEFT"
            component={(props: any) => <HomeScreen props={props} />}
          />
          <CurvedBottomBar.Screen
            name="User"
            component={() => <User />}
            position="RIGHT"
          />
          <Stack.Screen
            name="Web"
            component={(props: any) => <Web props={props} />}
          />
        </CurvedBottomBar.Navigator>
      ) : (
        <CurvedBottomBar.Navigator
          screenOptions={{headerShown: false}}
          type="DOWN"
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={55}
          circleWidth={50}
          bgColor={Theme.theme.background}
          initialRouteName="Login"
          circlePosition="RIGHT"
          borderTopLeftRight
          renderCircle={({selectedTab, navigate}) => (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  handleAuthInfo('accessToken', 'THIS_IS_A_TEST_LOGIN_TOKEN')
                }>
                <FontAwesomeIcon icon={faLifeRing} size={25} />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}>
          <CurvedBottomBar.Screen
            name="Login"
            position="LEFT"
            component={(props: any) => (
              <Login handleAuthResponse={handleAuthResponse} props={props} />
            )}
          />
          <CurvedBottomBar.Screen
            name="Forgot"
            position="LEFT"
            component={(props: any) => (
              <Forgot handleAuthResponse={handleAuthResponse} props={props} />
            )}
          />
          <CurvedBottomBar.Screen
            name="Register"
            position="LEFT"
            component={(props: any) => (
              <Register handleAuthResponse={handleAuthResponse} props={props} />
            )}
          />
          <Stack.Screen
            name="Help"
            component={(props: any) => (
              <Help handleAuthResponse={handleAuthResponse} props={props} />
            )}
          />
        </CurvedBottomBar.Navigator>
      )}
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
