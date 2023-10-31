import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
// import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from '../context/AuthContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const HomeScreen = () => {
  // splash screen
  useEffect(() => {
    setTimeout(() => {
      //   SplashScreen.hide();
    }, 3000);
  }, []);

  // const changeNavigationBarColorAsync = async () => {
  //   try {
  //     const response = await changeNavigationBarColor('#80b3ff');
  //     console.log(response); // {success: true}
  //   } catch (e) {
  //     console.log(e); // {success: false}
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated backgroundColor="#F3FDE8" />

      <View
        style={{
          marginTop: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <Text style={styles.headingText}>Hi 👋</Text>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              columnGap: 5,
            }}>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../assets/images/coin.png')}
            />

            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
              }}>
              9078
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
          flex: 1,
          justifyContent: 'flex-end',
          flexDirection: 'column',
          marginBottom: 40,
        }}>
        <TouchableOpacity>
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
    </View>
  );
};

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
