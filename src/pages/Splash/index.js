import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {



  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          // navigation.replace('GetStarted')
          navigation.replace('MainApp')
        }
      })
    }, 1500)
  }, []);


  return (
    <ImageBackground style={{
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    }}>


      <Image source={require('../../assets/logo.png')} style={{
        width: windowWidth,
        height: windowWidth / 1.3,
        resizeMode: 'contain'
      }} />

      <View style={{
        padding: 10,
      }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
