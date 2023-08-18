import { Alert, StyleSheet, Text, View, Image, KeyboardAvoidingView, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyCalendar from '../../components/MyCalendar';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
export default function Add({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [dataKategori, setdataKategori] = useState([])
    const [kirim, setKirim] = useState({

        foto_karya: 'https://zavalabs.com/nogambar.jpg',
        judul: '',
        konten: '',

    });

    useEffect(() => {
        getData('user').then(uu => {
            axios.post(apiURL + 'kategori_list').then(res => {
                console.log(res.data)
                setKirim({
                    ...kirim,
                    fid_kategori: res.data[0].value,
                    fid_user: uu.id
                })
                setdataKategori(res.data);
            });

        })
    }, []);
    const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
    const richText = React.useRef();

    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);
        axios.post(apiURL + 'karya_add', kirim).then(res => {
            showMessage({
                type: 'success',
                message: res.data.message
            });
            navigation.goBack()
            console.log(res.data);
            setLoading(false)
        })
    }
    const options = {
        includeBase64: true,
        quality: 0.5,
        maxWidth: 400
    };
    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            // console.log('All Response = ', response);

            // console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 2000000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setKirim({
                                ...kirim,
                                foto_karya: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;


                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.tertiary,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 20
                }}>
                    <TouchableOpacity onPress={() => getGallery(1)} style={{
                        width: 150,
                        height: 150,
                        alignSelf: 'center',
                        padding: 0,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: colors.border,
                        backgroundColor: colors.white,
                    }}>
                        {kirim.foto_karya !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                            uri: kirim.foto_karya
                        }} style={{
                            width: '100%',
                            height: 150,
                            resizeMode: 'contain',
                            borderRadius: 10,
                        }} />}
                        {kirim.foto_karya == 'https://zavalabs.com/nogambar.jpg' &&
                            <>
                                <Image source={require('../../assets/camera.png')} style={{
                                    width: 40,
                                    height: 40,
                                }} /><Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 15,
                                }}>Gambar</Text>
                            </>
                        }

                    </TouchableOpacity>
                    <MyGap jarak={10} />
                    <MyInput label="Judul" iconname="bookmark-outline" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            judul: x
                        })
                    }} placeholder="Masukan judul" />
                    <MyGap jarak={10} />
                    <MyPicker label="Kategori" iconname="options-outline" data={dataKategori} />
                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            konten: x
                        })
                    }} label="Konten isi karya" multiline iconname="create-outline" placeholder="Masukan isi karya sastra" />
                    <MyGap jarak={20} />
                    {!loading && <MyButton onPress={sendServer} title="SIMPAN" Icons="save-outline" />}
                    {loading && <ActivityIndicator size="large" color={colors.primary} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})