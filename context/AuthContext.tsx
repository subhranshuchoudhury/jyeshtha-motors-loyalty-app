import React, {createContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {MMKV} from 'react-native-mmkv';
export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const storage = new MMKV();

  const [AuthInfo, setAuthInfo] = useState<authType>({
    accessToken: null,
    name: '',
    mobile: '',
    tokenTime: null,
  });

  const handleAuthInfo = (key: string, value: any) => {
    setAuthInfo({...AuthInfo, [key]: value});
    storage.set('AUTH_INFO', JSON.stringify({...AuthInfo, [key]: value}));
  };

  const replaceAuthInfo = (auth: authType) => {
    setAuthInfo(auth);
  };

  type authType = {
    accessToken: string | null;
    name: string;
    mobile: string;
    tokenTime: Date | null;
  };

  useEffect(() => {
    // storage.clearAll();
    const authStore: string = storage.getString('AUTH_INFO') || '{}';
    console.log('AUTH_STORE', authStore);
    setAuthInfo(JSON.parse(authStore));
    SplashScreen.hide();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        AuthInfo,
        handleAuthInfo,
        replaceAuthInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
