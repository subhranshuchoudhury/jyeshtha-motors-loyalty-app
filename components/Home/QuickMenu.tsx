import React, {useContext} from 'react';
import {Avatar, Text, View} from 'react-native-ui-lib';
import QuickMenuList from '../../constants/quickmenu';
import {ThemeContext} from '../../context/ThemeContext';

const QuickMenu = () => {
  const {Theme, setTheme}: any = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 25,
      }}>
      {QuickMenuList.map((item, index) => {
        return (
          <View
            key={item.id}
            style={{flexDirection: 'column', alignItems: 'center'}}>
            <Avatar
              containerStyle={{
                margin: 5,
                backgroundColor: Theme.theme.secondary,
                elevation: 5,
              }}
              useAutoColors
              source={item.image}
              label={item.title}
              animate
              ribbonLabel={item.ribbonLabel}
              ribbonLabelStyle={{
                fontSize: 10,
                padding: 0,
                margin: 0,
                height: 15,
              }}
            />
            <Text style={{fontSize: Theme.theme.font3}}>{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default QuickMenu;
