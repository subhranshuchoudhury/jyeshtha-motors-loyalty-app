import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {Carousel} from 'react-native-ui-lib';
import {carousels} from '../../demo/data';
import {ThemeContext} from '../../context/ThemeContext';

export default function AdCarousel() {
  const {Theme, setTheme}: any = useContext(ThemeContext);

  return (
    <Carousel loop animated autoplay>
      {carousels.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                marginTop: 40,
                width: '90%',
                height: 100,
                backgroundColor: Theme.theme.primary,
                borderRadius: 8,
              }}>
              <Text>{item.name}</Text>
            </View>
          </View>
        );
      })}
    </Carousel>
  );
}
