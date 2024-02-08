import React, {createContext, useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {lightTheme, darkTheme} from '../constants/constants';
export const ThemeContext = createContext({});

export const ThemeProvider = ({children}: any) => {
  const storage = new MMKV();

  const [Theme, setTheme] = useState({
    theme: lightTheme,
  });

  useEffect(() => {
    // handle this to store and retrieve theme from storage
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        Theme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
