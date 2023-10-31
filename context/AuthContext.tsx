import React, {createContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const [AuthInfo, setAuthInfo] = useState<{
    accessToken: string | null;
    name: string;
  }>({
    accessToken: null,
    name: '',
  });
  const registerUser = (
    name: string,
    mobile: Number,
    password: string,
  ): Number => {
    console.log('Register: ', name, mobile, password);
    return 200;
  };

  useEffect(() => {
    // setAuthInfo({
    //   accessToken: 'test-token',
    //   name: 'test-name',
    // });
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        AuthInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
