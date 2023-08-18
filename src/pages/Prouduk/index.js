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

export default function Produk({ navigation, route }) {


    const item = route.params;




    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />
            <ScrollView style={{
                padding: 10,
            }}>
                <Image source={{
                    uri: item.foto_karya
                }} style={{
                    width: windowWidth,
                    height: windowWidth
                }} />
                <Text style={{
                    marginTop: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: 25,
                }}>{item.judul}</Text>
                <Text style={{
                    marginTop: 10,
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                }}>{item.konten}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})