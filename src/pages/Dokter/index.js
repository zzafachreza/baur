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

export default function Dokter({ navigation, route }) {

    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const item = route.params;

    const __getTransaction = () => {

        axios.post(apiURL + 'dokter').then(res => {
            console.log(res.data)
            setData(res.data);
        });

    }


    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (

            <View style={{
                flex: 0.5,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.zavalabs,
                margin: 10,
                overflow: 'hidden'
            }}>

                <Image source={{
                    uri: item.image
                }} style={{
                    width: '100%',
                    height: windowWidth / 2,
                    alignSelf: 'center'
                }} />

                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 15,
                        color: colors.secondary
                    }}>{item.nama_dokter}</Text>
                    <Text style={{
                        color: colors.tertiary,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>Spesialis {item.spesialis}</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('DokterDetail', item)} style={{


                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 5,
                    margin: 10,
                    padding: 5,
                    alignItems: 'center'
                }}>

                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        color: colors.primary
                    }}>Detail Informasi</Text>
                </TouchableOpacity>


            </View>

        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />
            <Text style={{
                marginHorizontal: 10,
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: colors.secondary
            }}>Curhat Dokter</Text>

            <FlatList data={data} renderItem={__renderItem} numColumns={2} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})