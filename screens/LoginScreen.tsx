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
import {DARK_GREEN} from '../constants/constants';
const LoginScreen = (props: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {loginUser}: any = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  // console.log(props);

  const navigation = props.navigation;

  useEffect(() => {
    changeNavigationBarColorAsync();
  }, []);

  const changeNavigationBarColorAsync = async () => {
    try {
      const response = await changeNavigationBarColor('#F3FDE8');
    } catch (e) {
      console.log('changeNavigationBarColorAsync', e); // {success: false}
    }
  };

  const disPatchLogin = async () => {
    const phoneRegex = /^[0-9]+$/;
    if (phone.length < 10 || !phoneRegex.test(phone)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid Mobile',
        textBody: 'Please enter valid mobile number',
        button: 'close',
      });
      return;
    }

    if (password.length < 6) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid Password',
        textBody: 'Please enter valid password',
        button: 'close',
      });
      return;
    }

    setLoading(true);

    const response = await loginUser(phone, password);

    setLoading(false);

    if (response.status === 200) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Login Successful',
        textBody: response.message,
        button: 'close',
      });
      navigation.navigate('Home');
    } else if (response.status === 401) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid Credentials',
        textBody: response.message,
        button: 'close',
      });
    } else if (response.status === 404) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'User Not Found',
        textBody: response.message,
        button: 'close',
      });
    } else if (response.status === 301) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Account Not Verified',
        textBody: response.message,
        button: 'close',
      });
      props.navigation.navigate('Register');
    } else if (response.status === 500) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Internal Server Error',
        textBody: response.message,
        button: 'close',
      });
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Internal Server Error',
        textBody: 'Something went wrong',
        button: 'close',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/jmLogo.png')}
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
        Mobile:
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          keyboardType="phone-pad"
          placeholder="eg. 1234567890"
          placeholderTextColor="#003f5c"
          onChangeText={phone => setPhone(phone)}
        />
      </View>
      <Text
        style={{
          color: 'black',
          justifyContent: 'flex-start',
          width: '65%',
          paddingBottom: 2,
        }}>
        Password:
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="eg. **********"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('FPScreen')}
        style={{
          justifyContent: 'flex-start',
          width: '65%',
          paddingBottom: 2,
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          forget password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={disPatchLogin} style={styles.loginBtn}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          LOGIN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            color: 'black',
            marginTop: 20,
          }}>
          New here? Create an account
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
    width: 100,
    height: 100,
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
    backgroundColor: DARK_GREEN,
  },
});

export default LoginScreen;
