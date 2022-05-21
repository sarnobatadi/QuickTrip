import React, { useState,useContext } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput, Image } from 'react-native'
import './global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import global from './global'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CircleFade } from 'react-native-animated-spinkit'
import { set } from 'lodash';
import { auth } from './firebase';
import MyContext from './Contexts/Context';


export const Profile = ({ navigation }) => {
    const context = useContext(MyContext)

    const signOut = async () => {
        auth.signOut();
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
                           
                                <Image
                                    source={{
                                        uri: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095529-stock-illustration-profile-icon-male-avatar.jpg',
                                    }}
                                    style={[styles.image2]}
                                />
                            <TouchableOpacity style={styles.camera} >
                                <Icon name={"camera"} color={"black"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Name' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 20, color: 'orange'}}> {context.getUser.displayName}</Text>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Email' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 20, color: 'orange'}}> {context.getUser.email}</Text>
                        </View>     
                        <View style={{ alignItems: 'center', marginVertical: 30 }}>
                            <TouchableOpacity style={{ ...styles.changePassword, backgroundColor: 'white', borderColor: 'orange', borderWidth: 0.5 }}
                                 onPress={() => upload()}>
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
