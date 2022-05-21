import React, { useState, useEffect,useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet,Linking, ImageBackground, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'

import './global';
import { firestore } from './firebase';
import MyContext from './Contexts/Context';




const PackageSingle = ({ navigation, route }) => {
    const context = useContext(MyContext)
    const handleBooking= async()=>{
        const packageRef = firestore.collection(`PackagesBooking`)
        const updatedDate = new Date();
        var date = updatedDate.getFullYear()+'-'+(updatedDate.getMonth()+1)+'-'+updatedDate.getDate();
        try{
            await packageRef.add({
                "UserDoc":context.getUser.displayName,
                date:date,
                packageDoc:route.params.item.packageName,
                tmpUserDoc:context.getUser.id
            })
            console.log("final",{
               UserDoc:context.getUser.displayName,
                date:date,
                packageDoc:route.params.item.id,
                tmpUserDoc:context.getUser.displayName
            });
        } catch( error ){
            console.log('error creating user',error.message)
            return false
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.subContainer}>
                    <ImageBackground imageStyle={{ borderBottomRightRadius: 30 }} style={styles.imageHotel} source={{ uri: route.params.item.imglink }}>
                        <View style={styles.subImg}>
                            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                                <Icon name={"keyboard-backspace"} size={35} color={'black'} />
                            </TouchableOpacity>
                            <View style={styles.name}>
                                <Text style={{ fontSize: 30, fontFamily: liteFont, color: 'white' }}>{route.params.item.packageName},{ }</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name={"map-marker-radius"} size={18} color={'orange'} />
                                    <Text style={{ fontSize: 16, fontFamily: boldFont, color: 'white' }}> {route.params.item.location}</Text>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                   
                    {/* <TouchableOpacity style={{ ...styles.changePassword, backgroundColor: 'white', borderColor: 'orange', borderWidth: 0.5 }}
                    onPress={() => { Linking.openURL(`geo:0,0?q=${route.params.item.location}`); }}>
                        <View elevation={5} style={styles.lock}>
                            <Icon name={"map-marker"} color={"orange"} size={22} />
                        </View>
                        <Text style={{ fontFamily: boldFont, fontSize: 24, color: 'orange', textAlign: 'center' }}>See On the map</Text>
                    </TouchableOpacity> */}

                    <View style={styles.inputContainer}>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Description' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.description}</Text>
                        </View>
                        
                         <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Time' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.time}</Text>
                        </View>
                         <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Duration of trip' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.duration}</Text>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Price' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.price}</Text>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='PickupPoint' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.pickupPoint}</Text>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Comapnay Name' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.companyName}</Text>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} style={{ paddingRight: 5 }} />
                            <TextInput  placeholder='Contact Email' disabled style={styles.search}>
                            </TextInput>
                            <Text style={{ fontSize: 15, color: 'orange'}}> {route.params.item.email}</Text>
                        </View>
                            
                        <View style={{ alignItems: 'center', marginVertical: 30 }}>
                            <TouchableOpacity style={styles.changePassword} onPress={()=>handleBooking()}>
                                <View elevation={5} style={styles.lock}>
                                    <Icon name={"arrow-right-bold-box-outline"} color={"orange"} size={22} />
                                </View>
                                <Text style={{ fontFamily: liteFont, fontSize: 20, color: 'orange' }}>Book Trip</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default PackageSingle


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
    },
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
        marginTop: 25,
        marginLeft:'10%'
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