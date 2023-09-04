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

        axios.post(apiURL + 'karya').then(res => {
            setData(res.data);
        });

    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Produk', item)}>

                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    marginHorizontal: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View>
                        <Image style={{
                            width: 100,
                            height: 100,
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                        }} source={{
                            uri: item.foto_karya
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            backgroundColor: colors.primary,
                            paddingHorizontal: 10,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            textAlign: 'center',
                            color: colors.white,
                        }}>{item.nama_kategori}</Text>
                    </View>
                    <View style={{
                        padding: 10,
                        flex: 1,
                    }}>

                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                        }}>{item.judul}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            fontSize: 15,
                        }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 15,
                        }}>{item.kontensub}...</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
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
                fontSize: 22,
                color: colors.black,
                textAlign: 'center',
                padding: 20,
                backgroundColor: colors.primary,
            }}>{route.params.nama_kategori}</Text>

            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})