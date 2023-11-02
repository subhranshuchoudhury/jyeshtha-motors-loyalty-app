import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {AuthContext} from '../context/AuthContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
const ProfileScreen = (props: any) => {
  const {AuthInfo, logoutUser, handleManipulation}: any =
    useContext(AuthContext);
  const [Loading, setLoading] = useState(true);
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

  const getUserBasicData = async () => {
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append('x-access-token', AuthInfo?.accessToken);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        details: ['accountBalance name mobile'],
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://jyeshtha-rewards.onrender.com/api/buyer/details',
        requestOptions,
      );
      const result = await response.json();

      if (response.status === 200) {
        handleManipulation('name', result.userData.name);
        handleManipulation('mobile', result.userData.mobile);
        handleManipulation('accountBalance', result.userData.accountBalance);
      } else {
        console.log(result);
      }
      setLoading(false);
      console.log(result);
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Internet Problem',
        textBody: 'Something went wrong',
        button: 'close',
      });
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBasicData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
      <SkeletonPlaceholder
        enabled={Loading}
        backgroundColor="#618264"
        speed={900}
        borderRadius={4}>
        <Image
          style={styles.image}
          source={require('../assets/images/avatar.png')}
        />
      </SkeletonPlaceholder>

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
        <Text style={styles.TextInput}>{AuthInfo?.name}</Text>
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
        <Text style={styles.TextInput}>{AuthInfo?.mobile}</Text>
      </View>
      <Text
        style={{
          color: 'black',
          justifyContent: 'flex-start',
          width: '65%',
          paddingBottom: 2,
        }}>
        Account Balance:
      </Text>
      <View style={styles.inputView}>
        <Text style={styles.TextInput}>{AuthInfo.accountBalance || 0}</Text>
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
          Change password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logoutUser} style={styles.loginBtn}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          LOGOUT
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
    borderWidth: 5,
    borderColor: '#618264',
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
    backgroundColor: '#C70039',
  },
});

export default ProfileScreen;
