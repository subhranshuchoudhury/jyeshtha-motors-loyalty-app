import React, {useContext, useEffect, useState} from 'react';
import {
  Carousel,
  Image,
  SkeletonView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native-ui-lib';
import {ThemeContext} from '../../context/ThemeContext';
import {getCarousel} from './carousel';
import pb from '../../utils/pocketbase';

export default function AdCarousel({props}: any) {
  const {Theme, setTheme}: any = useContext(ThemeContext);
  const [Data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCarousel().then(result => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <SkeletonView
        style={{margin: 13}}
        template={SkeletonView.templates.LIST_ITEM}
        showContent={!isLoading}
        renderContent={() => (
          <Carousel allowAccessibleLayout loop animated autoplay>
            {Data.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Web', {uri: item.url})
                  }
                  key={index}>
                  <View
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
                      <Image
                        source={{
                          uri: `${pb.baseUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`,
                        }}
                        style={{width: '100%', height: '100%', borderRadius: 8}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Carousel>
        )}
        times={1}
      />
    </>
  );
}
