import React, {createContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {MMKV} from 'react-native-mmkv';
export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const storage = new MMKV();

  const [AuthInfo, setAuthInfo] = useState<{
    accessToken: string | null;
    name: string;
    mobile: string;
    tokenTime: Date | null;
  }>({
    accessToken: null,
    name: '',
    mobile: '',
    tokenTime: null,
  });

  const handleAuthInfo = async (key: string, value: any) => {
    setAuthInfo({...AuthInfo, [key]: value});
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        AuthInfo,
        handleAuthInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
