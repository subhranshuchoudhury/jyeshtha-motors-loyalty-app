import React from 'react';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const App = () => {
  return (
    <AuthProvider>
      <AlertNotificationRoot theme="light">
        <Navigation />
      </AlertNotificationRoot>
    </AuthProvider>
  );
};

export default App;
