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

export default function ProdukDetail({ navigation, route }) {

    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const item = route.params;
    const [comp, setCom] = useState({});
    const __getTransaction = () => {

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

            <View style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={{
                    uri: item.image
                }} style={{
                    width: windowWidth / 1.5,
                    height: windowWidth / 1.5,
                    resizeMode: 'contain'
                }} />
            </View>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <Text style={{
                    color: colors.tertiary,
                    fontFamily: fonts.secondary[600],
                    fontSize: 25,
                }}>Rp {new Intl.NumberFormat().format(item.harga_produk)}</Text>
                <View style={{
                    height: 35,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.secondary
                    }}>{item.nama_produk}</Text>
                </View>

                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 15,
                    color: colors.secondary
                }}>{item.keterangan}</Text>


            </View>
            <MyButton onPress={() => {
                let urlWA = 'https://wa.me/' + comp.tlp + `?text=Saya mau beli produk *${item.nama_produk}*`;

                Linking.openURL(urlWA)

            }} radius={0} Icons="logo-whatsapp" title="Order Via Whatsapp" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})