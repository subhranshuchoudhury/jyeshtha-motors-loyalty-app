import {View, Text, Button} from 'react-native-ui-lib';
import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import {ActivityIndicator, StatusBar, TextInput} from 'react-native';
import {Formik} from 'formik';
import {useLoginManual} from '../../hooks/useLogin';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const Login = (props: any) => {
  const {Theme}: any = useContext(ThemeContext);
  const {
    data,
    mutate: manualLogin,
    isError,
    isLoading,
    isSuccess,
  } = useLoginManual();

  console.log('Data', data, 'isError', isError, 'isSuccess', isSuccess);
  // props.handleAuthResponse(data);
  if (!isLoading && isSuccess && data) {
    if (data?.accessToken) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Message',
        textBody: data.message,
        button: 'Close',
        // closeOnOverlayTap: false,
      });
    } else {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Message',
        textBody: data.message,
        button: 'Close',
        // closeOnOverlayTap: false,
      });
    }
  } else if (isError) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Server failure',
      textBody: 'Try again after sometime',
      button: 'Close',
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Theme.theme.background}}>
      <StatusBar
        backgroundColor={Theme.theme.background}
        barStyle={!Theme.theme.isLight ? 'light-content' : 'dark-content'}
      />
      <View style={{margin: 20}}>
        <Text
          style={{
            color: Theme.theme.primary,
            fontSize: 35,
            fontFamily: 'Roboto-Bold',
          }}>
          Login
        </Text>
      </View>

      <View
        style={{justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
        <Formik
          initialValues={{mobile: '', password: ''}}
          validateOnBlur={true}
          validate={values => {
            const errors: any = {};
            const mobileRegex = /^[0-9]{10}$/;
            if (!values.mobile) {
              errors.mobile = 'Mobile Required';
            } else if (mobileRegex.test(values.mobile) === false) {
              errors.mobile = 'Invalid mobile number';
            }
            if (!values.password) {
              errors.password = 'Password Required';
            }

            if (values.password.length < 6) {
              errors.password = 'Password should be atleast 6 characters';
            }
            return errors;
          }}
          onSubmit={values =>
            manualLogin({
              mobile: values.mobile,
              password: values.password,
            })
          }>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TextInput
                placeholder="Mobile"
                maxLength={10}
                keyboardType="phone-pad"
                placeholderTextColor={'gray'}
                style={{
                  borderBottomWidth: 2,
                  borderColor: Theme.theme.secondary,
                  color: Theme.theme.text,
                  width: '70%',
                  // elevation: 1,
                }}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
              />

              <Text
                style={{
                  color: Theme.theme.error,
                  textAlign: 'left',
                  fontFamily: 'Roboto-Light',
                  fontSize: Theme.theme.font3,
                  width: '70%',
                }}>
                {errors.mobile}
              </Text>

              <TextInput
                placeholder="Password"
                placeholderTextColor={'gray'}
                style={{
                  borderBottomWidth: 2,
                  borderColor: Theme.theme.secondary,
                  color: Theme.theme.text,
                  width: '70%',
                }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />

              <Text
                style={{
                  color: Theme.theme.error,
                  textAlign: 'left',
                  fontFamily: 'Roboto-Light',
                  fontSize: Theme.theme.font3,
                  width: '70%',
                }}>
                {errors.password}
              </Text>

              {isLoading ? (
                <ActivityIndicator
                  color={Theme.theme.secondary}
                  size={'large'}
                  style={{
                    marginTop: 40,
                  }}
                />
              ) : (
                <Button
                  label="Submit"
                  style={{
                    width: '30%',
                    marginTop: 40,
                    marginBottom: 20,
                    backgroundColor: Theme.theme.secondary,
                  }}
                  onPress={handleSubmit}
                />
              )}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
