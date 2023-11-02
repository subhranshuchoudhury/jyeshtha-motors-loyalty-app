import React, {createContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
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
  const registerUser = async (
    name: string,
    mobile: Number,
    password: string,
  ): Promise<{
    status: Number;
    message: string;
  }> => {
    try {
      console.log('name', name, 'mobile', mobile, 'password', password);
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
        'https://jyeshtha-rewards.onrender.com/api/user/auth/register',
        requestOptions,
      );

      const result = await response.json();
      console.log('result', result, 'response', response.status);
      if (response.status === 200) {
        setAuthInfo({
          accessToken: result?.accessToken,
          name: result?.name,
          mobile: result?.mobile,
          accountBalance: result?.accountBalance,
          tokenTime: new Date(),
        });

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
        'https://jyeshtha-rewards.onrender.com/api/user/auth/send-otp',
        requestOptions,
      );

      const result = await response.json();
      console.log('result', result, 'response', response.status);
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
        'https://jyeshtha-rewards.onrender.com/api/user/auth/verify-otp',
        requestOptions,
      );

      const result = await response.json();
      console.log('result', result, 'response', response.status);
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
        'https://jyeshtha-rewards.onrender.com/api/user/auth/login',
        requestOptions,
      );

      const result = await response.json();
      console.log('result', result, 'response', response.status);
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
          message: 'Login Success',
        };
      } else if (response.status === 401) {
        return {
          status: 401,
          message: result?.message,
        };
      } else if (response.status === 404) {
        return {
          status: 404,
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
        loginUser,
        AuthInfo,
        sendOTP,
        mutateBalance,
        verifyOTP,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
