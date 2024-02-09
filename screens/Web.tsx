/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

import WebView from 'react-native-webview';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
const Web = (props: any) => {
  const [load, setLoad] = useState(true);
  const {Theme}: any = useContext(ThemeContext);

  return (
    <View style={{flex: 1, backgroundColor: Theme.theme.background}}>
      {load ? (
        <>
          <View
            style={{
              alignSelf: 'center',
              marginTop: '20%',
              flex: 1,
            }}>
            <ActivityIndicator size="large" color={Theme.theme.primary} />
          </View>
        </>
      ) : null}

      <WebView
        onError={() =>
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'ERROR',
            textBody: 'Try again after sometime.',
            button: 'CLOSE',
            onHide: () => props.props.navigation.navigate('Home'),
          })
        }
        pullToRefreshEnabled={true}
        onLoadEnd={() => setLoad(false)}
        onLoad={() => setLoad(true)}
        allowsFullscreenVideo={true}
        style={load ? {display: 'none'} : {flex: 1}}
        source={{uri: props.props.route.params.uri}}
      />
    </View>
  );
};

export default Web;
