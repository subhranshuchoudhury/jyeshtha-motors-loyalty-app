import React, {createContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {MMKV} from 'react-native-mmkv';
import {BASE_URL} from '../constants/constants';
export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const storage = new MMKV();
  const [AuthInfo, setAuthInfo] = useState<{
    accessToken: string | null;
    name: string;
    mobile: string;
    accountBalance: Number | 0;
    tokenTime: Date | null;
  }>({
    accessToken: null,
    name: '',
    mobile: '',
    accountBalance: 0,
    tokenTime: null,
  });

  const mutateBalance = (amount: Number) => {
    setAuthInfo({
      ...AuthInfo,
      accountBalance: amount,
    });
  };

  const handleManipulation = (target: string, value: string) => {
    setAuthInfo({
      ...AuthInfo,
      [target]: value,
    });
  };
  const registerUser = async (
    name: string,
    mobile: Number,
    password: string,
  ): Promise<{
    status: Number;
    message: string;
  }> => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        name: name,
        mobile: `${mobile}`,
        password: password,
      });

      const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `${BASE_URL}/api/user/auth/register`,
        requestOptions,
      );

      const result = await response.json();
      if (response.status === 200) {
        await sendOTP(mobile);

        return {
          status: 200,
          message: result?.message,
        };
      } else if (response.status === 401) {
        return {
          status: 401,
          message: result?.message,
        };
      } else if (response.status === 400) {
        return {
          status: 400,
          message: result?.message,
        };
      } else if (response.status === 301) {
        return {
          status: 301,
          message: result?.message,
        };
      } else {
        return {
          status: 500,
          message: 'Internal Server Error',
        };
      }
    } catch (error) {
      console.log('error', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };

  const sendOTP = async (
    mobile: Number,
  ): Promise<{
    status: Number;
    message: string;
  }> => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        mobile: `${mobile}`,
      });

      const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `${BASE_URL}/api/user/auth/send-otp`,
        requestOptions,
      );

      const result = await response.json();
      if (response.status === 200) {
        return {
          status: 200,
          message: result?.message,
        };
      } else if (response.status === 404) {
        return {
          status: 404,
          message: result?.message,
        };
      } else if (response.status === 400) {
        return {
          status: 400,
          message: result?.message,
        };
      } else {
        return {
          status: 500,
          message: 'Internal Server Error',
        };
      }
    } catch (error) {
      console.log('error', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };

  const verifyOTP = async (
    mobile: Number,
    otp: Number,
  ): Promise<{
    status: Number;
    message: string;
  }> => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        mobile: `${mobile}`,
        otp: `${otp}`,
      });

      const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `${BASE_URL}/api/user/auth/verify-otp`,
        requestOptions,
      );

      const result = await response.json();
      if (response.status === 200) {
        setAuthInfo({
          accessToken: result?.accessToken,
          name: result?.name,
          mobile: result?.mobile,
          accountBalance: result?.accountBalance,
          tokenTime: new Date(),
        });

        return {
          status: 200,
          message: result?.message,
        };
      } else if (response.status === 404) {
        return {
          status: 404,
          message: result?.message,
        };
      } else if (response.status === 401) {
        return {
          status: 401,
          message: result?.message,
        };
      } else {
        return {
          status: 500,
          message: result?.message,
        };
      }
    } catch (error) {
      console.log('error', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };

  const loginUser = async (
    mobile: Number,
    password: string,
  ): Promise<{
    status: Number;
    message: string;
  }> => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        mobile: `${mobile}`,
        password: password,
      });
      const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(
        `${BASE_URL}/api/user/auth/login`,
        requestOptions,
      );

      const result = await response.json();
      if (response.status === 200) {
        storage.set(
          'authInfoMMKV',
          JSON.stringify({
            accessToken: result?.accessToken,
            name: result?.name,
            mobile: result?.mobile,
            accountBalance: result?.accountBalance,
            tokenTime: new Date(),
          }),
        );

        storage.set('credentialsInfoMMV', JSON.stringify({mobile, password}));
        setAuthInfo({
          accessToken: result?.accessToken,
          name: result?.name,
          mobile: result?.mobile,
          accountBalance: result?.accountBalance,
          tokenTime: new Date(),
        });

        return {
          status: 200,
          message: 'Login Success',
        };
      } else {
        return {
          status: response.status,
          message: result?.message,
        };
      }
    } catch (error) {
      console.log('error', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };

  const logoutUser = () => {
    storage.delete('authInfoMMKV');
    storage.delete('credentialsInfoMMV');
    setAuthInfo({
      accessToken: null,
      name: '',
      mobile: '',
      accountBalance: 0,
      tokenTime: null,
    });
  };

  const autoLogin = async () => {
    try {
      const authDataMMVK: string | undefined =
        storage.getString('authInfoMMKV');
      const credentialsInfoMMV: string | undefined =
        storage.getString('credentialsInfoMMV');
      if (authDataMMVK) {
        const authData = JSON.parse(authDataMMVK || '{}');
        const credentialsInfo = JSON.parse(credentialsInfoMMV || '{}');
        const tokenTime: Date = new Date(authData?.tokenTime);
        const currentTime: Date = new Date();
        const diff = currentTime.getTime() - tokenTime.getTime();
        const hours = Math.floor(diff / 1000 / 60 / 60);
        if (hours > 20) {
          await loginUser(credentialsInfo?.mobile, credentialsInfo?.password);
          SplashScreen.hide();
        } else {
          setAuthInfo({
            accessToken: authData?.accessToken,
            name: authData?.name,
            mobile: authData?.mobile,
            accountBalance: authData?.accountBalance,
            tokenTime: new Date(),
          });
          SplashScreen.hide();
        }
      } else {
        SplashScreen.hide();
      }
    } catch (error) {
      setAuthInfo({
        accessToken: null,
        accountBalance: 0,
        mobile: '',
        name: '',
        tokenTime: null,
      });
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        AuthInfo,
        sendOTP,
        mutateBalance,
        verifyOTP,
        logoutUser,
        handleManipulation,
        autoLogin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
