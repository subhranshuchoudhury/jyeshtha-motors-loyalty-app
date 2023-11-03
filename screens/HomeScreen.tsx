import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import QRScanner from '../components/QRScanner';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {BASE_URL, DARK_BLUE, DARK_GREEN} from '../constants/constants';
const HomeScreen = (props: any) => {
  const [showQRScanner, setshowQRScanner] = useState<boolean>(false);
  const [isRedeemedLoading, setIsRedeemedLoading] = useState(false);
  const {AuthInfo, handleManipulation}: any = useContext(AuthContext);
  const [redeemedCoupons, setRedeemedCoupons] = useState<any>([]);
  // splash screen
  useEffect(() => {
    changeNavigationBarColorAsync('');
  }, []);

  const changeNavigationBarColorAsync = async (color: string) => {
    try {
      const response = await changeNavigationBarColor('#F3FDE8');
      // console.log(response); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }
  };

  const scanResult = (data: string) => {
    console.log(data);
    if (data?.length > 5) {
      setshowQRScanner(false);
      props.navigation.navigate('RedeemScanProcess', {
        code: data,
      });
    }
  };

  const actionQRScanner = (action: boolean) => {
    setshowQRScanner(action);
  };

  const fetchReq1 = fetch(
    `${BASE_URL}/api/buyer/redeem-code/history?limit=10&skip=0`,
    {
      method: 'GET',
      headers: {
        'x-access-token': AuthInfo?.accessToken,
      },
    },
  )
    .then(res => res.json())
    .catch(error => console.log(error));
  const fetchReq2 = fetch(`${BASE_URL}/api/buyer/details`, {
    method: 'POST',
    body: JSON.stringify({
      details: ['accountBalance name mobile'],
    }),
    headers: {
      'x-access-token': AuthInfo?.accessToken,
      'Content-Type': 'application/json',
    },

    redirect: 'follow',
  })
    .then(res => res.json())
    .catch(error => console.log(error));

  const getInitialData = () => {
    const allData = Promise.all([fetchReq1, fetchReq2]);
    allData.then(res => {
      setIsRedeemedLoading(false);
      if (res?.[0]) {
        setRedeemedCoupons(res?.[0]?.user || []);
        // setRedeemedCoupons([]); // TESTING
      }
      if (res?.[1]) {
        handleManipulation('name', res?.[1]?.userData?.name);
        handleManipulation('mobile', res?.[1]?.userData?.mobile);
        handleManipulation(
          'accountBalance',
          res?.[1]?.userData?.accountBalance,
        );
      }

      if (!res?.[0] || !res?.[1]) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Internet Problem',
          textBody: 'Something went wrong',
          button: 'close',
        });
      }
    });
  };

  useEffect(() => {
    setIsRedeemedLoading(true);
    getInitialData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
      <Modal transparent={true} visible={showQRScanner} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: DARK_GREEN,
            marginTop: 20,
            width: '100%',
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <QRScanner
            scanResult={scanResult}
            actionQRScanner={actionQRScanner}
          />
        </View>
      </Modal>
      <View
        style={{
          marginTop: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.headingText}>Hi</Text>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../assets/images/hand.gif')}
          />
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              columnGap: -10,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../assets/images/coinFlip.gif')}
            />

            <Text
              style={{
                color: DARK_GREEN,
                fontWeight: '800',
                fontSize: 15,
              }}>
              {AuthInfo?.accountBalance || 0}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 5,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '90%',
          flexWrap: 'wrap',
        }}>
        <Text style={styles.headingText}>
          {AuthInfo?.name?.split(' ')?.[0]}!
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          width: '85%',
          marginTop: 30,
          marginBottom: 10,
        }}>
        <Text style={{color: DARK_GREEN, height: 20, fontWeight: '700'}}>
          Redeem History
        </Text>
        <TouchableOpacity>
          <Text style={{color: DARK_GREEN, height: 20, fontWeight: '700'}}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 10,
          height: 500,
        }}>
        <Spinner color={DARK_GREEN} animation="fade" visible={false} />
        {isRedeemedLoading && (
          <SkeletonPlaceholder backgroundColor={DARK_GREEN} borderRadius={4}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View style={{width: '95%', height: 100, borderRadius: 10}} />
            </View>
          </SkeletonPlaceholder>
        )}
        <FlatList
          data={redeemedCoupons}
          renderItem={item => qrRedeemedTile(item, props)}
          keyExtractor={item => item.redeemHistory._id}
          ListEmptyComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {!isRedeemedLoading && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://www.youtube.com/watch?v=GRJGKS9blm8',
                    )
                  }
                  style={{
                    width: '95%',
                    height: 100,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: DARK_BLUE,
                      width: '100%',
                      borderRadius: 10,
                      height: 100,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '500',
                          fontSize: 20,
                        }}>
                        How to use the app?
                      </Text>
                      <Text>Click here to know more</Text>
                    </View>
                    <View>
                      <Image
                        style={{
                          width: 60,
                          height: 60,
                        }}
                        source={require('../assets/images/helpPerson.gif')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          flexDirection: 'column',
          marginBottom: 10,
        }}>
        <TouchableOpacity onPress={() => setshowQRScanner(!showQRScanner)}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 100,
              elevation: 5,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../assets/images/qr-code.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{color: DARK_GREEN, fontWeight: '700'}}>
        © Jyeshtha Motors
      </Text>
    </View>
  );
};

const qrRedeemedTile = (data: any, props: any) => (
  <TouchableOpacity
    onPress={() =>
      props.navigation.navigate('RedeemSingle', {
        code: data?.item?.redeemHistory?.code,
      })
    }>
    <View
      style={{
        backgroundColor: DARK_GREEN,
        minWidth: '90%',
        borderRadius: 10,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        elevation: 6,
        margin: 5,
        marginBottom: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 70,
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Date:{' '}
          {new Date(data?.item?.redeemHistory?.createdAt)?.toLocaleDateString()}
        </Text>

        <Text
          style={{
            color: 'white',
            fontWeight: '700',
          }}>
          Amount: ₹ {data?.item?.redeemHistory?.amount}
        </Text>
      </View>

      <View
        style={{
          marginBottom: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontWeight: '700',
          }}>
          {data?.item?.redeemHistory?.code}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: '#F3FDE8',
            fontWeight: '700',
            marginTop: 10,
          }}>
          JYESHTHA MOTORS
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: -15,
          right: 10,
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require('../assets/images/coupon-cut.png')}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDE8',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  headingText: {
    color: DARK_GREEN,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
