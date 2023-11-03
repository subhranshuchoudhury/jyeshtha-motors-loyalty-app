import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
import {
  BASE_URL,
  DARK_BLUE,
  DARK_GREEN,
  RED_BUTTON,
} from '../constants/constants';
const RedeemScanProcess = (props: any) => {
  const [code, setCode] = useState('');
  const {AuthInfo}: any = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  // console.log(props);

  const navigation = props.navigation;

  useEffect(() => {
    changeNavigationBarColorAsync();
    const code = props.route.params.code;
    if (!code) {
      navigation.navigate('Home');
    }
  }, []);

  const changeNavigationBarColorAsync = async () => {
    try {
      const response = await changeNavigationBarColor('#F3FDE8');
    } catch (e) {
      console.log('changeNavigationBarColorAsync', e); // {success: false}
    }
  };

  const DispatchScanner = async () => {
    const codeRegex = /^[A-Z0-9-]+$/;
    let finalCode = code;
    if (!codeRegex.test(code)) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Invalid Code',
        textBody: 'Enter a valid coupon code',
        button: 'close',
      });
      return;
    }

    if (code?.length !== 19 && code?.length !== 16) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Invalid Code',
        textBody: 'Enter a valid coupon code',
        button: 'close',
      });
      return;
    }

    if (code?.length === 19) {
      if (
        code?.charAt(4) !== '-' ||
        code?.charAt(9) !== '-' ||
        code?.charAt(14) !== '-'
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

    if (code?.length === 16 && code?.split('-')?.length !== 1) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Invalid Code',
        textBody: 'Enter a valid coupon code',
        button: 'close',
      });
      return;
    }

    // Add - to code

    if (code?.length === 16) {
      const codeArray = code?.split('');
      codeArray.splice(4, 0, '-');
      codeArray.splice(9, 0, '-');
      codeArray.splice(14, 0, '-');
      setCode(codeArray.join(''));
      finalCode = codeArray.join('');
    }

    console.log('DispatchScanner', finalCode);

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
        navigation.navigate('Home');
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: `ERROR ${response?.status}`,
          textBody: data?.message,
          button: 'close',
        });
      }
    } catch (error) {
      setLoading(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Server Error',
        textBody: 'Try again later',
        button: 'close',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/greenScannerBox.gif')}
      />
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
      <Spinner color={DARK_GREEN} visible={Loading} />

      <Text
        style={{
          color: 'black',
          justifyContent: 'flex-start',
          width: '65%',
          paddingBottom: 2,
        }}>
        Redeem Code:
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="eg. ABCD-EFGH-QRST-MNOP"
          placeholderTextColor="#003f5c"
          value={code}
          onChangeText={code =>
            setCode(code?.replace(' ', '')?.toUpperCase()?.trim())
          }
        />
      </View>

      <TouchableOpacity onPress={DispatchScanner} style={styles.loginBtn}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          REDEEM
        </Text>
      </TouchableOpacity>

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
    marginBottom: 40,
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  inputView: {
    backgroundColor: '#D0E7D2',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    color: 'black',
    fontWeight: '600',
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    width: '100%',
    fontSize: 17,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: DARK_BLUE,
  },
});

export default RedeemScanProcess;
