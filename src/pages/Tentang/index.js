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
import RenderHtml from 'react-native-render-html';
import { Linking } from 'react-native';
export default function Tentang({ navigation, route }) {

    const [open, setOpen] = useState(false);
    const [comp, setComp] = useState({});
    useEffect(() => {

        axios.post(apiURL + 'get_tentang').then(res => {
            setComp(res.data);
            console.log(res.data);
            setOpen(true)

        })
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondary,
                height: 100,
            }}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={
                        {
                            width: 120,
                            height: 80,
                        }
                    }
                />
            </View>

            <View style={{
                flex: 1,
                backgroundColor: colors.tertiary,
            }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    padding: 20
                }}>
                    <Text style={{
                        marginVertical: 10,
                        color: colors.primary,
                        textAlign: 'center',
                        fontSize: 22,
                        fontFamily: fonts.secondary[800],
                        fontStyle: 'italic'
                    }}>TENTANG KAMI</Text>

                    <Text style={{
                        marginBottom: 10,
                        color: colors.primary,
                        textAlign: 'justify',
                        fontSize: 20,
                        fontFamily: fonts.secondary[600],
                    }}>{' '}{' '}{' '}Karya sastra merupakan ungkapan seseorang yang bersifat pribadi berupa pengalaman, pemikiran, perasaan. Ide, semangat, keyakinan dalam bentuk gambaran kehidupan yang dapat membangkitkan pesona dengan gaya bahasa dan dilukiskan dalam bentuk tulisan.</Text>
                    <Text style={{
                        marginBottom: 10,
                        color: colors.primary,
                        textAlign: 'justify',
                        fontSize: 20,
                        fontFamily: fonts.secondary[600],
                    }}>{' '}{' '}Komunitas kami merupakan wadah berkumpulnya para pecinta karya sastra maka dari itu kami menggunakan nama BAUR untuk komunitas kami, yang bermakna kami semua bisa berbaur di komunitas ini bagi pecinta karya sastra atau bagi siapapun yang ingin mengenal karya sastra lebih dalam.
                    </Text>

                    <Text style={{
                        marginBottom: 10,
                        color: colors.primary,
                        textAlign: 'justify',
                        fontSize: 20,
                        fontFamily: fonts.secondary[600],
                    }}>{' '}{' '}Bagi yang memiliki saran atau masukan bisa langsung kontak ke pengurus komunitas kami di bawah.</Text>

                    <TouchableOpacity onPress={() => {
                        let urlText = 'https://wa.me/62081547267036';
                        Linking.openURL(urlText)
                    }} style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/wa.png')} style={{
                            width: 50,
                            height: 50
                        }} />
                        <Text style={{
                            flex: 1,
                            paddingLeft: 10,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                            fontSize: 28,
                        }}>0815-4726-7036</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})