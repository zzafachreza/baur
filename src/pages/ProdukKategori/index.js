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

export default function ProdukKategori({ navigation, route }) {

    const isFocus = useIsFocused();
    const [data, setData] = useState([]);

    const __getTransaction = () => {

        axios.post(apiURL + 'kategori').then(res => {
            setData(res.data);
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
            backgroundColor: colors.white,

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
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Produk', i)}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: colors.zavalabs
                            }}>

                                <Image source={{
                                    uri: i.image
                                }} style={{
                                    width: 65,
                                    height: 65
                                }} />

                                <Text style={{
                                    left: 10,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                    flex: 1,
                                }}>{i.nama_kategori}</Text>

                                <Icon type='ionicon' name='chevron-forward' size={25} color={colors.primary} />

                            </View>
                        </TouchableWithoutFeedback>

                    )
                })}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})