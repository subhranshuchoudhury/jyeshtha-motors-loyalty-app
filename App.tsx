import React, {useEffect} from 'react';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (!state.isConnected) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'No Internet Connection',
          autoClose: 60000,
        });
      } else {
        Toast.hide();
      }
    });

    // Unsubscribe
  }, []);

  return (
    <AuthProvider>
      <AlertNotificationRoot theme="light">
        <Navigation />
      </AlertNotificationRoot>
    </AuthProvider>
  );
};

export default App;
