import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, Linking } from 'react-native'
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


const MydetailMenu = ({ label, img, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                width: windowWidth / 4.5,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: colors.border,
                }}>
                    <Image source={img} style={{
                        width: 60,
                        height: 60
                    }} />
                </View>
                <View style={{
                    marginTop: 5,
                    height: 50,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 13,
                        textAlign: 'center',

                    }}>{label}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default function Search({ navigation, route }) {

    const [user, setUser] = useState({});
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [tmp, setTMP] = useState([]);
    const [dataKategori, setdataKategori] = useState([]);
    const [open, setOpen] = useState(false);
    const [comp, setComp] = useState({});

    const __GetTransaction = async () => {

        await getData('user').then(u => {
            setUser(u);
        })

        await axios.post(apiURL + 'kategori').then(res => {

            setdataKategori(res.data);
        });

        await axios.post(apiURL + 'karya').then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data)
        });
        await axios.post(apiURL + 'company').then(res => {

            setComp(res.data.data);

        });
    }


    useEffect(() => {
        if (isFocus) {
            __GetTransaction();
        }
    }, [isFocus]);

    const __renderItemKategori = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <View style={{
                    width: 80,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginHorizontal: 5,
                    backgroundColor: colors.white
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        color: colors.tertiary
                    }}>{item.nama_kategori}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Produk', item)}>

                <View style={{
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


    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.tertiary,
        }}>

            <View style={{
                padding: 10,
                backgroundColor: colors.tertiary
            }}>
                <MyInput label="Masukan Kata Kunci" iconname="search" onChangeText={x => {
                    const filtered = data.filter(i => i.judul.toLowerCase().indexOf(x.toLowerCase()) > -1);
                    console.log(filtered.length)
                    if (x.length == 0) {
                        setData(tmp)
                    } else if (filtered.length > 0) {
                        setData(filtered)
                    } else {
                        setData(filtered)
                    }


                }} placeholder="Masukan kata kunci" />
            </View>


            {/* KATEGORI */}


            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})