import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const QRScanner = (props: any) => {
  const [torchLightToggle, setTorchLightToggle] = useState(false);
  const changeNavigationBarColorAsync = async () => {
    try {
      const response = await changeNavigationBarColor('#F3FDE8');
    } catch (e) {
      console.log('changeNavigationBarColorAsync', e); // {success: false}
    }
  };

  useEffect(() => {
    changeNavigationBarColorAsync();
  }, []);

  return (
    <QRCodeScanner
      flashMode={
        torchLightToggle
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
      onRead={data => props.scanResult(data.data)}
      showMarker={true}
      reactivateTimeout={1000}
      reactivate={false}
      customMarker={
        <View>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/scanner.png')}
          />
        </View>
      }
      bottomContent={
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <TouchableOpacity onPress={() => props.actionQRScanner(false)}>
            <Image
              style={{
                marginTop: 20,
                width: 70,
                height: 70,
                resizeMode: 'contain',
              }}
              source={require('../assets/images/close.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.scanResult('KEYBOARD_INPUT')}>
            <Image
              style={{
                marginTop: 20,
                width: 70,
                height: 70,
                resizeMode: 'contain',
              }}
              source={require('../assets/images/keyboard.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTorchLightToggle(!torchLightToggle)}>
            <Image
              style={{
                marginTop: 20,
                width: 70,
                height: 70,
                resizeMode: 'contain',
              }}
              source={require('../assets/images/torch-light.png')}
            />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default QRScanner;
