import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {AuthContext} from '../context/AuthContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {BASE_URL, DARK_GREEN, LIGHT_GREEN} from '../constants/constants';
import QRCode from 'react-native-qrcode-svg';
const RedeemSingle = (props: any) => {
  const {AuthInfo}: any = useContext(AuthContext);
  const [RedeemCodeData, setRedeemCodeData] = useState<any>({});
  const [Loading, setLoading] = useState(true);

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
        code: props.route.params.code,
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `${BASE_URL}/api/buyer/redeem-code/get`,
        requestOptions,
      );
      const result = await response.json();

      if (response.status === 200) {
        console.log(result);
        setRedeemCodeData(result);
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
        backgroundColor={DARK_GREEN}
        speed={900}
        borderRadius={4}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 10,
            borderRadius: 20,
            borderColor: DARK_GREEN,
            padding: 3,
          }}>
          <QRCode
            backgroundColor={LIGHT_GREEN}
            size={100}
            value={props.route.params.code}
          />
        </View>
      </SkeletonPlaceholder>
      <Text
        style={{
          color: DARK_GREEN,
          fontWeight: '700',
          fontSize: 20,
          marginBottom: 20,
          marginTop: 10,
        }}>
        {props.route.params.code}
      </Text>

      {Loading ? (
        <SkeletonPlaceholder
          speed={900}
          enabled={Loading}
          backgroundColor={DARK_GREEN}>
          <View style={styles.inputView}>
            <Text style={styles.TextInput}></Text>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <>
          <Text
            style={{
              color: 'black',
              justifyContent: 'flex-start',
              width: '65%',
              paddingBottom: 2,
            }}>
            Redeemer Name:
          </Text>
          <View style={styles.inputView}>
            <Text style={styles.TextInput}>
              {RedeemCodeData?.redeemer?.name}
            </Text>
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
            <Text style={styles.TextInput}>
              {RedeemCodeData?.redeemer?.mobile}
            </Text>
          </View>
          <Text
            style={{
              color: 'black',
              justifyContent: 'flex-start',
              width: '65%',
              paddingBottom: 2,
            }}>
            Amount:
          </Text>
          <View style={styles.inputView}>
            <Text style={styles.TextInput}>{RedeemCodeData?.amount}</Text>
          </View>
          <Text
            style={{
              color: 'black',
              justifyContent: 'flex-start',
              width: '65%',
              paddingBottom: 2,
            }}>
            Time of Redeem:
          </Text>
          <View style={styles.inputView}>
            <Text style={styles.TextInput}>
              {new Date(RedeemCodeData?.redeemer?.timestamp).toLocaleString()}
            </Text>
          </View>
        </>
      )}

      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.loginBtn}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          BACK
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: DARK_GREEN,
  },
  inputView: {
    backgroundColor: '#D0E7D2',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 5,
    alignItems: 'center',
  },
  TextInput: {
    color: 'black',
    fontWeight: '600',
    height: 10,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    width: '100%',
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

export default RedeemSingle;
