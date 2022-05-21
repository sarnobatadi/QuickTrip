import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet,Linking, ImageBackground, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'

import './global';




const PlaceSingle = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.subContainer}>
                    <ImageBackground imageStyle={{ borderBottomRightRadius: 30 }} style={styles.imageHotel} source={{ uri: route.params.item.image }}>
                        <View style={styles.subImg}>
                            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                                <Icon name={"keyboard-backspace"} size={35} color={'black'} />
                            </TouchableOpacity>
                            <View style={styles.name}>
                                <Text style={{ fontSize: 30, fontFamily: liteFont, color: 'white' }}>{route.params.item.name},{ }</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name={"map-marker-radius"} size={18} color={'orange'} />
                                    <Text style={{ fontSize: 16, fontFamily: boldFont, color: 'white' }}> {route.params.item.city}</Text>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                    
                   
                </View>
                <View style={{ alignItems: 'center', marginVertical: 30 }}>

                    <TouchableOpacity style={{ ...styles.changePassword, backgroundColor: 'white', borderColor: 'orange', borderWidth: 0.5 }}
                    onPress={() => { Linking.openURL(`geo:0,0?q=${route.params.item.location}`); }}>
                        <View elevation={5} style={styles.lock}>
                            <Icon name={"map-marker"} color={"orange"} size={22} />
                        </View>
                        <Text style={{ fontFamily: boldFont, fontSize: 24, color: 'orange', textAlign: 'center' }}>See On the map</Text>
                    </TouchableOpacity>
                </View>
                    
                
            </ScrollView>
        </View>

    )
}

export default PlaceSingle


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5fdf8',
        height: '100%',
        width: '100%',
    },
    subContainer: {
        padding: '0%',
        // elevation:2,
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
    imageHotel: {
        height: 350,
        width: '100%',
        // flex: 1,
        resizeMode: 'cover',

    },
    subImg: {
        height: 350,
        width: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        borderBottomRightRadius: 30,
    },
    sub: {
        padding: '3%'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 5
    },
    over: {
        fontSize: 20,
        fontFamily: liteFont,
        color: 'black',
    },
    border: {
        borderColor: "orange",

    },
    back: {
        padding: '2%',
        width: '15%',
    },
    name: {
        padding: '4%',
        marginTop: '60%',
        // backgroundColor: 'blue'
    },
    modalView: {
        height: 420,
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 360,
        elevation: 4,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderWidth: 1,
        borderColor: 'orange'
    },
    modalContainer: {
        padding: '5%',
    },
    comments: {
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        elevation: 3,
        margin: 4,
        fontFamily: baseFont,
        color: 'white',
        textAlign: 'center'
    },
    send: {
        backgroundColor: 'orange',
        borderRadius: 100,
        marginBottom: 5
    },
    description: {
        padding: '3%'
    }
})