import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from '../context/AuthContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import QRScanner from '../components/QRScanner';
import SplashScreen from 'react-native-splash-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = () => {
  const [showQRScanner, setshowQRScanner] = useState<boolean>(false);
  const [scanData, setScanData] = useState<string>('');
  const [isRedeemedLoading, setIsRedeemedLoading] = useState(false);
  // splash screen
  useEffect(() => {
    changeNavigationBarColorAsync('');
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
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
      setScanData(data);
      setshowQRScanner(false);
    }
  };

  const actionQRScanner = (action: boolean) => {
    setshowQRScanner(action);
  };

  const demoArray = [
    {
      code: 'TYGHFD HYUIYT BHGUT8 GHGFD4',
      amount: '2000',
      date: '12/12/2021',
      _id: '34535',
    },
    {
      code: 'TYGHFD HYUIYT BHGUT8 GHGFD4',
      amount: '100',
      date: '12/12/2021',
      _id: '23423',
    },
    {
      code: 'TYGHFD HYUIYT BHGUT8 GHGFD4',
      amount: '100',
      date: '12/12/2021',
      _id: '677856',
    },
    {
      code: 'TYGHFD HYUIYT BHGUT8 GHGFD4',
      amount: '100',
      date: '12/12/2021',
      _id: '67698',
    },
    {
      code: 'TYGHFD HYUIYT BHGUT8 GHGFD4',
      amount: '100',
      date: '12/12/2021',
      _id: '7676',
    },
  ];

  const emptyArray: any = [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />
      <Modal transparent={true} visible={showQRScanner} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#618264',
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

        <TouchableOpacity>
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
                color: 'black',
                fontWeight: '800',
              }}>
              907877
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
        <Text style={styles.headingText}>Subhranshu!</Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          width: '85%',
          marginTop: 30,
        }}>
        <Text style={{color: '#618264', height: 20, fontWeight: '700'}}>
          Redeem History
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#618264', height: 20, fontWeight: '700'}}>
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
        <Spinner color="#618264" animation="fade" visible={false} />

        {isRedeemedLoading && (
          <SkeletonPlaceholder backgroundColor="#618264" borderRadius={4}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View style={{width: '90%', height: 100, borderRadius: 10}} />
            </View>
          </SkeletonPlaceholder>
        )}
        <FlatList
          data={demoArray}
          renderItem={({item}) => qrRedeemedTile(item)}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'black'}}>
                You have no redemption history.
              </Text>
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
      <Text style={{color: '#618264', fontWeight: '700'}}>
        © Jyeshtha Motors
      </Text>
    </View>
  );
};

const qrRedeemedTile = (data: any) => (
  <TouchableOpacity>
    <View
      style={{
        backgroundColor: '#618264',
        minWidth: '90%',
        borderRadius: 10,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        elevation: 6,
        margin: 5,
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
          Date: {data?.date}
        </Text>

        <Text
          style={{
            color: 'white',
            fontWeight: '700',
          }}>
          Amount: ₹ {data?.amount}
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
          {data?.code}
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
    color: '#618264',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
