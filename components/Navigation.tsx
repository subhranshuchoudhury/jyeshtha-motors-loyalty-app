import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {AuthContext} from '../context/AuthContext';
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
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home"
              component={HomeScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
