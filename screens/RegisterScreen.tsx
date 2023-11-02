import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
const RegisterScreen = (props: any) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const {registerUser, sendOTP, verifyOTP}: any = useContext(AuthContext);
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

  const disPatchRegister = async () => {
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

    if (password !== confirmPassword) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Password Mismatch',
        textBody: 'Please enter same password',
        button: 'close',
      });
      return;
    }

    setLoading(true);
    const response = await registerUser(name, phone, password);
    setLoading(false);
    if (response.status === 200) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: response.message,
        button: 'close',
      });
      navigation.navigate('Login');
    } else if (response.status === 400) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Already Registered',
        textBody: response.message,
        button: 'close',
      });
    } else if (response.status === 301) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Verification Incomplete',
        textBody: response.message,
        button: 'close',
      });
      setRegistered(true);
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: response.message,
        button: 'close',
      });
    }
  };

  const sendOTPToUser = async () => {
    if (!phone || phone.length < 10) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid Mobile',
        textBody: 'Please enter valid mobile number',
        button: 'close',
      });
      return;
    }

    setLoading(true);
    const response = await sendOTP(phone);
    setLoading(false);
    if (response.status === 200) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: response.message,
        button: 'close',
      });
      setOtpSent(true);
    } else if (response.status === 400) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Already Sent',
        textBody: response.message,
        button: 'close',
      });
      setOtpSent(true);
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: response.message,
        button: 'close',
      });
    }
  };

  const verifyOTPUser = async () => {
    if (!otp || otp.length < 8) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid OTP',
        textBody: 'Please enter valid OTP',
        button: 'close',
      });
      return;
    }

    if (!phone || phone.length < 10) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid Mobile',
        textBody: 'Please enter valid mobile number',
        button: 'close',
      });
      return;
    }

    const response = await verifyOTP(phone, otp);
    if (response.status === 200) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: response.message,
        button: 'close',
      });
    } else if (response.status === 401) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Incorrect OTP',
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
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: response.message,
        button: 'close',
      });
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#F3FDE8',
        paddingTop: 50,
      }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/jmLogo.png')}
        />
        <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
        <Spinner color="#618264" visible={Loading} />
        <Text
          style={{
            color: 'black',
            justifyContent: 'flex-start',
            width: '65%',
            paddingBottom: 2,
          }}>
          Name:
        </Text>
        <View style={styles.inputView}>
          <TextInput
            keyboardType="name-phone-pad"
            style={styles.TextInput}
            placeholder="eg. John Doe"
            editable={!registered}
            placeholderTextColor="#003f5c"
            onChangeText={name => setName(name)}
          />
        </View>
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
            keyboardType="phone-pad"
            editable={!registered}
            style={styles.TextInput}
            placeholder="eg. 1234567890"
            placeholderTextColor="#003f5c"
            onChangeText={phone => setPhone(phone)}
          />
        </View>
        {!registered && (
          <>
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
                keyboardType="visible-password"
                style={styles.TextInput}
                placeholder="eg. **********"
                placeholderTextColor="#003f5c"
                secureTextEntry={false}
                onChangeText={password => setPassword(password)}
              />
            </View>
          </>
        )}

        {registered ? (
          <>
            <Text
              style={{
                color: 'black',
                justifyContent: 'flex-start',
                width: '65%',
                paddingBottom: 2,
              }}>
              OTP:
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="eg. 12XX56"
                placeholderTextColor="#003f5c"
                onChangeText={otp => setOtp(otp)}
              />
            </View>
          </>
        ) : (
          <>
            <Text
              style={{
                color: 'black',
                justifyContent: 'flex-start',
                width: '65%',
                paddingBottom: 2,
              }}>
              Confirm Password:
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="eg. **********"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={confirmPassword =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </View>
          </>
        )}

        {!registered && (
          <TouchableOpacity onPress={disPatchRegister} style={styles.loginBtn}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
              REGISTER
            </Text>
          </TouchableOpacity>
        )}

        {registered && (
          <TouchableOpacity onPress={sendOTPToUser} style={styles.loginBtn}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
              {otpSent ? 'RESEND OTP' : 'SEND OTP'}
            </Text>
          </TouchableOpacity>
        )}

        {registered && (
          <TouchableOpacity onPress={verifyOTPUser} style={styles.loginBtn}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
              VERIFY
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: 'black',
              marginTop: 20,
            }}>
            Already have account? Login
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#618264',
            marginTop: 20,
            fontWeight: '700',
          }}>
          © Jyeshtha Motors
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
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
    marginBottom: 15,
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
    backgroundColor: '#618264',
  },
});

export default RegisterScreen;
