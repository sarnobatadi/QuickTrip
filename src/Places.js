import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, Linking, StyleSheet, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebaseConfig } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import "firebase/firestore";
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import { AppState} from "react-native";
import 'firebase/compat/firestore';
import 'firebase/auth';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();




const Places = () => {
    const [placeList, setPlaceList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //var list = [{ id: 0, name: 'Kesari Tours, Pune', image: 'https://gumlet.assettype.com/swarajya%2F2019-10%2Fc15839cf-81c2-47d5-a4df-84a5ff4fcef3%2FBandipur_National_park_road.jpg?w=640&q=75&auto=format%2Ccompress'},]
   
    useEffect(() => {
        db.collection("places").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                var data = doc.data();
                //setInfo(arr => [...arr , data]);
                setPlaceList([...placeList,data])
                console.log(data);
                console.log(`${doc.id} => ${doc.data().name}`);
            });
        });
        setIsLoading(false)
    },[])
        
    useEffect(() => {
      
    }, [isLoading])
        
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'orange', fontFamily: liteFont, textAlign: 'center', fontSize: 24 }}>Contact</Text>
            </View> 
            <ScrollView>
                <View style={styles.subContainer}>
     

                    {placeList && placeList.map(item =>
                        <View style={styles.cardView} key={item.id}>
                           
                             <View style={styles.card}>
                                <View style={styles.imageView}>
                                    <Image style={styles.image} source={{ uri: item.image }} ></Image>
                                      <Text style={{ color: 'orange', fontFamily: boldFont,backgroundColor: '#f5fdf8', fontSize: 20, textAlign: 'center' }}>{item.name}</Text>
                                </View>
                                <View style={styles.cardtitleView}>
                                   
                                    <View style={styles.contact}>
                                        
                                        <TouchableOpacity style={{ backgroundColor: '#f5fdf8', width: 100, alignItems: 'center', borderRadius: 6, elevation: 4 }}
                                            onPress={() => { Linking.openURL(`tel:${item.phone}`); }}>
                                            <Text style={{ color: 'black', fontFamily: boldFont, }}>Phone</Text>
                                            <Icon name={"phone"} size={24} color={'green'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: '#f5fdf8', width: 100, alignItems: 'center', borderRadius: 6, elevation: 4 }}
                                            onPress={() => { Linking.openURL(item.web); }}>
                                            <Text style={{ color: 'black', fontFamily: boldFont, }}>Website</Text>
                                            <Icon name={"web"} size={24} color={'green'} />
                                        </TouchableOpacity>
                                    </View>
                                </View> 
                            </View> 
                        </View>)}
                </View>
            </ScrollView>
        </View>
    )
}

export default Places

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f5f9'
    },
    subContainer: {
        padding: '3%',
        paddingHorizontal: '6%',
        marginVertical: '3%',
    },
    card: {
        width: '100%',
    },
    cardView: {
        marginVertical: 10

    },
    imageView: {
        height: 150,
        width: '100%',
        borderRadius: 20,
        // elevation:4

    },
    image: {
        height: null,
        width: null,
        resizeMode: 'cover',
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    cardtitleView: {
        backgroundColor: '#fff',
        padding: '2%',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        elevation: 4

    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 15
    }
})
