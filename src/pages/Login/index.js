import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});





  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      Alert.alert(MYAPP, 'Username dan Password tidak boleh kosong !');
    } else if (kirim.username == null) {
      Alert.alert(MYAPP, 'Username tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }

        });



    }




  }

  useEffect(() => {

    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.tertiary, position: 'relative' }}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary
        }}>
          <Image
            source={require('../../assets/icon.png')}
            style={
              {
                width: windowWidth / 1.2,
                height: windowWidth / 2.2,
              }
            }
          />




        </View>



        <View style={{ padding: 20, flex: 1, backgroundColor: colors.tertiary }}>
          <Text style={{
            color: colors.primary,
            textAlign: 'center',
            fontSize: 25,
            fontFamily: fonts.primary[600],
            fontStyle: 'italic'
          }}>SELAMAT DATANG</Text>
          <Text style={{
            marginTop: 10,
            color: colors.primary,
            fontSize: 18,
            marginBottom: 20,
            lineHeight: 30,
            textAlign: 'justify',
            fontFamily: fonts.secondary[400],
          }}>Mari berbaur bersama komuitas kami.  Komunitas ini adalah wadah bagi para pecinta karya sastra untuk bisa saling mengenal dan berbagi karya sastra.</Text>


          <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Username" onChangeText={val => setKirim({
            ...kirim,
            username: val
          })}
            iconname="at" placeholder="Masukan username" />
          <MyGap jarak={20} />
          <MyInput textColor={colors.primary} colorIcon={colors.primary}
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <MyGap jarak={40} />
          {!loading &&


            <MyButton
              onPress={masuk}
              title="Log in"
              warna={colors.primary}
              Icons="log-in-outline"
            />

          }

        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>

      <TouchableOpacity activeOpacity={1} onPress={() => {

        navigation.navigate('Register')
      }} style={{
        padding: 10,
        backgroundColor: colors.tertiary,
        justifyContent: 'center',
        alignItems: 'center'
      }}><Text style={{
        fontSize: windowWidth / 28,
        marginTop: 10,
        fontFamily: fonts.primary[400],
        textAlign: 'center',
        color: colors.secondary
      }}>TIdak punya akun ? <Text style={{
        color: colors.primary,
        fontFamily: fonts.primary[600],
      }}> daftar disini</Text></Text></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
