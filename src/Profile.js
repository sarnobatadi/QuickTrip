import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput, Image } from 'react-native'
import './global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import global from './global'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CircleFade } from 'react-native-animated-spinkit'
import { set } from 'lodash';


export const Profile = ({ navigation }) => {


    const [name, setName] = useState(null)
    const [place, setPlace] = useState(null)
    const [experience, setExperience] = useState(null)
    const [rating, setRating] = useState()
    const [image, setImage] = useState(null)
    const [profile, setProfile] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)




    const register = () => {
        const data = new FormData()
        data.append('name', name);
        data.append('place', place);
        data.append('experience', experience);
        data.append('rating', rating);
        data.append('image', image);
        data.append('profile', profile);

        var config = {
            method: 'post',
            url: global.baseUrl + 'api/users/',
            // headers: {
            //     ...data.getHeaders()
            // },
            data: data
        };
        console.log(config.url, config.data)
        axios(config)
            .then(function (response) {
                goTo()
                setLoading(false)
                setName('')
                setPlace('')
                setExperience('')
                setRating('')
                setImage(null)
                setDisabled(true)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const goTo = async () => {
        await navigation.navigate('Sections')
    }



    const handleChange = (e) => {
        setRating(e)
        console.log(rating, 'ddjodj')
        if (name != null && e != null) {
            if (name.length >= 2 && e.length >= 1) {
                console.log(name, 'inside')
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }

    }


    const imagePicker = () => {
        let ImagePickerOptions = {
            title: 'Choose your profile photo',
            maxWidth: 1000,
            mediaType: 'photo',
            maxHeight: 1000,
            quality: 1,
            storageOptions: {
                skipBackup: true,
            },
        };

        launchImageLibrary(ImagePickerOptions, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const image_dir = response.assets[0];
                const image = {
                    uri: image_dir.uri,
                    // type: 'jpeg',
                    type: 'multipart/form-data',
                    name: image_dir.fileName,
                };
                setImage(image), () => console.log(image, 'dd');
            }
        });
    };



    const profilePic = () => {
        let ImagePickerOptions = {
            title: 'Choose your profile photo',
            maxWidth: 1000,
            mediaType: 'photo',
            maxHeight: 1000,
            quality: 1,
            storageOptions: {
                skipBackup: true,
            },
        };

        launchImageLibrary(ImagePickerOptions, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const image_dir = response.assets[0];
                const profile = {
                    uri: image_dir.uri,
                    type: 'jpeg',
                    type: 'multipart/form-data',
                    name: image_dir.fileName,
                };
                setProfile(profile), () => console.log(profile, 'dd');
            }
        });
    };


    const upload = () => {
        setLoading(true)
        register()
    }



    const signOut = async () => {
        await AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.subContainer}>
                    <View style={styles.navBar}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name={"arrow-left"} size={26} color={'orange'}
                                onPress={() => navigation.goBack()} />
                            <Text style={{ color: 'orange', fontFamily: liteFont, fontSize: 20, marginLeft: 80 }}>User Account</Text>
                        </View>
                    </View>
                    <View style={styles.imageMainContainer}>
                        <View style={styles.image2Container}>
                            {profile !== null ? (
                                <Image
                                    source={profile

                                    }

                                    style={[styles.image2]}
                                />
                            ) : (
                                <Image
                                    source={{
                                        uri: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095529-stock-illustration-profile-icon-male-avatar.jpg',
                                    }}
                                    style={[styles.image2]}
                                />
                            )}

                            <TouchableOpacity style={styles.camera} onPress={() => profilePic()}>
                                <Icon name={"camera"} color={"black"} size={20} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput value={name} placeholder='Name' style={styles.search}
                                onChangeText={(e) => setName(e)}>
                            </TextInput>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"crosshairs-gps"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput value={place} placeholder='Visited Location' style={styles.search}
                                onChangeText={(e) => setPlace(e)}>
                            </TextInput>
                        </View>
                        <View style={styles.textPara}>
                            <TextInput value={experience} placeholder='Experience' style={styles.address}
                                onChangeText={(e) => setExperience(e)}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ ...styles.username, width: 140 }}>
                                <Icon name={"star-half-full"} size={20} color={'orange'} />
                                <TextInput value={rating} keyboardType="numeric" maxLength={1} placeholder='Rating out of 9' style={styles.search}
                                    onChangeText={(e) => handleChange(e)}>
                                </TextInput>
                            </View>
                            <TouchableOpacity style={styles.imageButton} onPress={() => imagePicker()}>
                                <Icon name={"camera"} size={22} color={'orange'} />
                                <Text style={{ color: 'white', fontFamily: liteFont, fontSize: 16 }}>Pick Image</Text>
                            </TouchableOpacity>
                        </View>
                        {loading &&
                            <View style={{ alignItems: 'center' }}>
                                <Text>Uploading...</Text>
                                <CircleFade size={50} color="orange" />
                            </View>}
                        <View style={{ alignItems: 'center', marginVertical: 30 }}>
                            <TouchableOpacity style={{ ...styles.changePassword, backgroundColor: 'white', borderColor: 'orange', borderWidth: 0.5 }}
                                disabled={disabled} onPress={() => upload()}>
                                <View elevation={5} style={styles.lock}>
                                    <Icon name={"upload"} color={"orange"} size={22} />
                                </View>
                                <Text style={{ fontFamily: boldFont, fontSize: 24, color: 'orange', textAlign: 'center' }}>Upload</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.changePassword} onPress={() => signOut()}>
                                <View elevation={5} style={styles.lock}>
                                    <Icon name={"arrow-right-bold-box-outline"} color={"orange"} size={22} />
                                </View>
                                <Text style={{ fontFamily: liteFont, fontSize: 20, color: 'orange' }}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            </ScrollView>

        </View>
    )
}

export default Profile


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    subContainer: {
        // height: '100%',
    },
    navBar: {
        backgroundColor: 'black',
        padding: 15
    },
    search: {
        padding: 2,

    },
    inputContainer: {
        padding: '5%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'blue',
        marginTop: 25
    },
    username: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'orange',
        marginVertical: 8,

    },
    address: {
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        fontFamily: baseFont,
        fontSize: 16
    },
    textPara: {
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: '20%',
        borderRadius: 20,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'orange',
        marginVertical: 8,
    },
    imageButton: {
        backgroundColor: 'black',
        padding: '5%',
        borderRadius: 20,
        width: 160,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    changePassword: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: '3%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'space-around',
        marginVertical: 10,
        elevation: 5,
        width: '90%',
        paddingRight: 60,

    },
    lock: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderRadius: 5,
    },
    imageMainContainer: {
        alignItems: 'center',
        marginTop: '6%',

    },
    image2Container: {
        height: 100,
        width: 100,
        backgroundColor: '#F5FDF8',
        borderRadius: 500,
        // overflow: 'hidden'
        elevation:2

    },
    image2: {
        height: null,
        width: null,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 60
    },
    camera: {
        width: 24,
        height: 24,
        backgroundColor: '#F5FDF8',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 40,
        top: 80,
        right: 1,
        elevation: 3,


    },
    modalContainer: {
        alignItems: 'center',
        marginVertical: 220,
        flex: 1
    }
})
