import React, {useEffect} from 'react';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {ThemeProvider} from './context/ThemeContext';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (!state.isConnected) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'No Internet Connection',
          autoClose: 120000,
          titleStyle: {
            margin: 10,
          },
        });
      } else {
        Toast.hide();
      }
    });

    // Unsubscribe
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <AlertNotificationRoot theme="light">
            <Navigation />
          </AlertNotificationRoot>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
