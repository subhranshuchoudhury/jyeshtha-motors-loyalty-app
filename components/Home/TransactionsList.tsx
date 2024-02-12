import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {transactions} from '../../demo/data';
import {ThemeContext} from '../../context/ThemeContext';
import {ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCoins} from '@fortawesome/free-solid-svg-icons';
export default function TransactionsList(props: any) {
  const {Theme}: any = useContext(ThemeContext);
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Theme.theme.background,
        }}>
        <Text
          style={{
            fontFamily: Theme.theme.fontFamilies.mLight,
            color: Theme.theme.text,
          }}>
          Transactions
        </Text>
        <View
          style={{
            backgroundColor: Theme.theme.primary,
            width: '30%',
            height: 2,
            borderRadius: 20,
            marginTop: 2,
            elevation: 5,
          }}></View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 10,
          marginTop: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => console.log('Transaction')}
          activeBackgroundColor={Theme.theme.primary}
          style={{
            width: '90%',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: Theme.theme.background,
              borderColor: Theme.theme.secondary,
              borderWidth: 1,
              height: 70,
              borderRadius: 4,
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 10,
              elevation: 5,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: Theme.theme.font2,
                    fontFamily: Theme.theme.fontFamilies.bold2,
                    color: Theme.theme.secondary,
                  }}>
                  GHUJ-907Y-R5GH6
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <FontAwesomeIcon
                  icon={faCoins}
                  color={true ? 'lightgreen' : 'red'}
                />
                <Text style={{fontFamily: Theme.theme.fontFamilies.bold1}}>
                  Rs. 5
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: Theme.theme.fontFamilies.RThin,
                  fontSize: Theme.theme.font3,
                }}>
                11-02-2024 08:20 PM
              </Text>
              <Text
                style={{
                  fontFamily: Theme.theme.fontFamilies.RThin,
                  fontSize: Theme.theme.font3,
                }}>
                Success
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Transaction')}
          activeBackgroundColor={Theme.theme.primary}
          style={{
            width: '90%',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: Theme.theme.background,
              borderColor: Theme.theme.secondary,
              borderWidth: 1,
              height: 70,
              borderRadius: 4,
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: Theme.theme.font2,
                    fontFamily: Theme.theme.fontFamilies.bold2,
                    color: Theme.theme.secondary,
                  }}>
                  HJFR-907Y-R5GH6
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <FontAwesomeIcon
                  icon={faCoins}
                  color={false ? 'lightgreen' : 'red'}
                />
                <Text style={{fontFamily: Theme.theme.fontFamilies.bold1}}>
                  Rs. 5
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: Theme.theme.fontFamilies.RThin,
                  fontSize: Theme.theme.font3,
                }}>
                11-02-2024 08:20 PM
              </Text>
              <Text
                style={{
                  fontFamily: Theme.theme.fontFamilies.RThin,
                  fontSize: Theme.theme.font3,
                }}>
                Failed
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
