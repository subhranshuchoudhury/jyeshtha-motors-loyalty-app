import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
import {
  BASE_URL,
  DARK_GREEN,
  LIGHT_GREEN,
  RED_BUTTON,
} from '../constants/constants';
const RedeemScanProcessAuto = (props: any) => {
  const {AuthInfo}: any = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [RedeemSuccessDetails, setRedeemSuccessDetails] = useState<any>({});
  const [isFailed, setIsFailed] = useState(false);
  const [inputCode, setInputCode] = useState<string>('');
  const navigation = props.navigation;

  useEffect(() => {
    changeNavigationBarColorAsync();
    const code = props.route.params.code;
    if (!code) {
      navigation.navigate('Home');
    } else {
      if (code !== 'KEYBOARD_INPUT') DispatchScanner();
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (Loading) {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () =>
              props.navigation.navigate('Home', {refresh: isSuccess}),
          },
        ]);
      } else {
        props.navigation.navigate('Home', {refresh: isSuccess});
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const changeNavigationBarColorAsync = async () => {
    try {
      const response = await changeNavigationBarColor(LIGHT_GREEN);
    } catch (e) {
      console.log('changeNavigationBarColorAsync', e); // {success: false}
    }
  };

  const DispatchScanner = async () => {
    let finalCode = '';

    if (props.route.params.code === 'KEYBOARD_INPUT') {
      finalCode = inputCode;
    } else {
      finalCode = props.route.params.code
        ?.replace(' ', '')
        ?.toUpperCase()
        ?.trim();
    }

    // *
    const codeRegex = /^[A-Z0-9-]+$/;

    if (!codeRegex.test(finalCode)) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Invalid Code',
        textBody: 'Enter a valid coupon code',
        button: 'close',
      });
      return;
    }

    if (finalCode?.length !== 19 && finalCode?.length !== 16) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Invalid Code',
        textBody: 'Enter a valid coupon code',
        button: 'close',
      });
      return;
    }

    if (finalCode?.length === 19) {
      if (
        finalCode?.charAt(4) !== '-' ||
        finalCode?.charAt(9) !== '-' ||
        finalCode?.charAt(14) !== '-'
      ) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Invalid Code',
          textBody: 'Enter a valid coupon code',
          button: 'close',
        });
        return;
      }
    }

    if (finalCode?.length === 16 && finalCode?.split('-')?.length !== 1) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Invalid Code',
        textBody: 'Enter a valid coupon code',
        button: 'close',
      });
      return;
    }

    // Add - to code

    if (finalCode?.length === 16) {
      const codeArray = finalCode?.split('');
      codeArray.splice(4, 0, '-');
      codeArray.splice(9, 0, '-');
      codeArray.splice(14, 0, '-');
      setInputCode(codeArray.join(''));
      finalCode = codeArray.join('');
    }

    // *
    try {
      var myHeaders = new Headers();
      myHeaders.append('x-access-token', AuthInfo.accessToken);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        code: finalCode,
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/buyer/redeem-code/redeem`,
        requestOptions,
      );
      const data = await response.json();
      setLoading(false);

      if (response.status === 200) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: data?.message,
          button: 'close',
        });
        setIsSuccess(true);
        setRedeemSuccessDetails(data?.redeemData);
      } else {
        setIsFailed(true);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          textBody: `ERROR ${response?.status}`,
          title: data?.message,
          button: 'close',
        });
      }
    } catch (error: any) {
      setLoading(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Server Error',
        textBody: `${error?.message || 'Try again later'}`,
        button: 'close',
      });
    }
  };

  return (
    <View style={styles.container}>
      {!isSuccess && (
        <>
          {!isFailed ? (
            <Image
              style={styles.image}
              source={require('../assets/images/redeemSuccess.gif')}
            />
          ) : (
            <Image
              style={[styles.image, {width: 80, height: 80, marginBottom: 5}]}
              source={require('../assets/images/close.png')}
            />
          )}

          {isFailed && (
            <Text
              style={{
                color: RED_BUTTON,
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 30,
              }}>
              REDEMPTION FAILED
            </Text>
          )}

          <StatusBar
            barStyle="dark-content"
            animated
            backgroundColor="#F3FDE8"
          />
          <Spinner color={DARK_GREEN} visible={Loading} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="eg. ABCD-EFGH-JKLM-OPQR"
              placeholderTextColor="#003f5c"
              editable={props.route.params.code === 'KEYBOARD_INPUT'}
              onChangeText={code =>
                setInputCode(code?.replace(' ', '')?.toUpperCase()?.trim())
              }
              value={
                props.route.params.code === 'KEYBOARD_INPUT'
                  ? inputCode
                  : props.route.params.code
              }
            />
          </View>
        </>
      )}

      {isSuccess && (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 200, height: 200}}
              source={require('../assets/images/congrats.gif')}
            />
            <Text style={{fontSize: 20, fontWeight: '700', color: DARK_GREEN}}>
              Redeem Successful 🎉
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                padding: 10,
                columnGap: 20,
              }}>
              <Text
                style={{
                  color: DARK_GREEN,
                  fontSize: 30,
                  fontWeight: '700',
                }}>
                {RedeemSuccessDetails?.amount}
              </Text>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={require('../assets/images/money.png')}
              />
            </View>
          </View>
        </>
      )}

      {!Loading &&
        !isSuccess &&
        props.route.params.code === 'KEYBOARD_INPUT' && (
          <TouchableOpacity
            style={[styles.loginBtn, {marginTop: 10, marginBottom: 40}]}
            onPress={() => DispatchScanner()}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        )}

      {!Loading && (
        <TouchableOpacity
          style={[
            styles.loginBtn,
            {
              backgroundColor: isSuccess ? DARK_GREEN : RED_BUTTON,
              width: '80%',
            },
          ]}
          onPress={() => navigation.navigate('Home', {refresh: isSuccess})}>
          <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
            {isSuccess ? 'BACK' : 'EXIT'}
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={{
          color: DARK_GREEN,
          marginTop: 20,
          fontWeight: '700',
        }}>
        © Jyeshtha Motors
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  inputView: {
    backgroundColor: '#D0E7D2',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
  },
  TextInput: {
    color: DARK_GREEN,
    fontWeight: '600',
    height: 50,
    flex: 1,
    padding: 10,
    width: '100%',
    fontSize: 17,
    textAlign: 'center',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: DARK_GREEN,
    elevation: 5,
  },
});

export default RedeemScanProcessAuto;
