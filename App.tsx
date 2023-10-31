import React from 'react';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
