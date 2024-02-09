import React, {useContext, useEffect, useState} from 'react';
import {Avatar, SkeletonView, Text, View} from 'react-native-ui-lib';
import QuickMenuList from '../../constants/quickmenu';
import {ThemeContext} from '../../context/ThemeContext';
import {getQuickMenu} from './quickmenuAPI';
import pb from '../../utils/pocketbase';

const QuickMenu = ({props}: any) => {
  const {Theme}: any = useContext(ThemeContext);
  const [Data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getQuickMenu().then(result => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 25,
          height: 60,
          backgroundColor: Theme.theme.background,
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
                  alignSelf: 'center',
                  justifyContent: 'center',
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
              <Text
                style={{
                  fontSize: Theme.theme.font3,
                  fontFamily: Theme.theme.fontFamilies.primary,
                }}>
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>

      <SkeletonView
        style={{margin: 13}}
        template={SkeletonView.templates.LIST_ITEM}
        showContent={!isLoading}
        renderContent={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              margin: 25,
              marginTop: 25,
              columnGap: 23,
              height: 100,
              backgroundColor: Theme.theme.background,
            }}>
            {Data.map((item: any, index: number) => {
              return (
                <View
                  key={item.id}
                  style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Avatar
                    onPress={() => {
                      if (!item.screen)
                        props.navigation.navigate('Web', {uri: item.url});
                      else
                        props.navigation.navigate(item.screen, {
                          data: item.data,
                        });
                    }}
                    containerStyle={{
                      margin: 5,
                      backgroundColor: Theme.theme.secondary,
                      elevation: 5,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    useAutoColors
                    source={{
                      uri: `${pb.baseUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`,
                    }}
                    animate
                    ribbonLabel={item.ribbonLabel}
                    ribbonLabelStyle={{
                      fontSize: 10,
                      padding: 0,
                      margin: 0,
                      height: 15,
                    }}
                  />
                  <Text
                    style={{
                      color: Theme.theme.text,
                      fontSize: Theme.theme.font3,
                      fontFamily: Theme.theme.fontFamilies.primary,
                    }}>
                    {item.title}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        times={1}
      />
    </>
  );
};

export default QuickMenu;
