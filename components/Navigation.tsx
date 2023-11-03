import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import FPScreen from '../screens/FPScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoadingScreen from '../screens/LoadingScreen';
import RedeemSingle from '../screens/RedeemSingle';
import RedeemScanProcess from '../screens/RedeemScanProcess';
import {DARK_GREEN, LIGHT_GREEN} from '../constants/constants';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  const {AuthInfo}: any = useContext(AuthContext);
  console.log('Navigation.tsx', AuthInfo);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          animationDuration: 500,
          animationTypeForReplace: 'pop',
        }}>
        {AuthInfo.accessToken ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Profile"
              component={ProfileScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="FPScreen"
              component={FPScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="RedeemSingle"
              component={RedeemSingle}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                title: 'Redeem Coupon',
                headerTintColor: LIGHT_GREEN,
                headerStyle: {
                  backgroundColor: DARK_GREEN,
                },
              }}
              name="RedeemScanProcess"
              component={RedeemScanProcess}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="FPScreen"
              component={FPScreen}
            />
          </>
        )}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LoadingScreen"
          component={LoadingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
