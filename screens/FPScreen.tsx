import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {DARK_GREEN} from '../constants/constants';
const FPScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

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

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/jmLogo.png')}
      />
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
      <Spinner color={DARK_GREEN} visible={false} />
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
          style={styles.TextInput}
          placeholder="eg. 1234567890"
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
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
          placeholder="**********"
          placeholderTextColor="#003f5c"
          secureTextEntry={false}
          onChangeText={password => setPassword(password)}
        />
      </View>

      {otpSent ? (
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
              secureTextEntry={true}
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
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
              placeholder="**********"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
            />
          </View>
        </>
      )}

      <TouchableOpacity
        onPress={() => setOtpSent(!otpSent)}
        style={styles.loginBtn}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          {otpSent ? 'RESEND OTP' : 'SEND OTP'}
        </Text>
      </TouchableOpacity>

      {otpSent && (
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
            REGISTER
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

export default FPScreen;
