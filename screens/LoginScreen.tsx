import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require('./assets/log2.png')} /> */}
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
      <Spinner visible={false} />
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
          placeholder="eg. **********"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          LOGIN
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
    backgroundColor: '#618264',
  },
});

export default LoginScreen;
