import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'moment/locale/id';
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';
import { Linking } from 'react-native';

export default function MenuWa({ navigation, route }) {

    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [comp, setCom] = useState({});
    const __getTransaction = () => {

        axios.post(apiURL + 'menu', {
            modul: route.params.modul
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        });

        axios.post(apiURL + 'company').then(res => {
            console.log(res.data);
            setCom(res.data.data)
        });

    }




    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus]);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                textAlign: 'center',
            }}>{route.params.menu}</Text>

            <ScrollView style={{
                padding: 10,
            }}>

                {data.map(i => {

                    return (
                        <TouchableWithoutFeedback onPress={() => {
                            let urlWA = ''
                            if (route.params.menu == 'Diet dan Pola Makan') {
                                urlWA = 'https://wa.me/' + comp.tlp + `?text=Saya mau konsultasi pola makan`;
                            } else {
                                urlWA = 'https://wa.me/' + comp.tlp + `?text=Saya mau ${route.params.menu} Mengenai *${i.menu}*`;
                            }


                            Linking.openURL(urlWA)
                            console.log(urlWA)

                        }}>
                            <View style={{
                                marginVertical: 5,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: colors.zavalabs,
                                borderRadius: 5,
                                paddingRight: 10,
                                overflow: 'hidden'

                            }}>

                                <Image source={{
                                    uri: i.image
                                }} style={{
                                    width: 80,
                                    height: 80
                                }} />

                                <Text style={{
                                    left: 10,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                    flex: 1,
                                }}>{i.menu}</Text>

                                <Icon type='ionicon' name='logo-whatsapp' size={25} color={colors.primary} />

                            </View>
                        </TouchableWithoutFeedback>

                    )
                })}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})