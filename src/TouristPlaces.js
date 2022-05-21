import React, { useState,useEffect,useContext } from 'react'
import { Text, View, TouchableOpacity, Linking, StyleSheet, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyContext from './Contexts/Context';







const TouristPlaces = ({navigation}) => {
    
    const context = useContext(MyContext)
    return (
        <View style={styles.container}>
            <View style={{  flexDirection: 'row', width: '100%', height: 50, backgroundColor: 'black' ,alignItems:'center'}}>
                <Icon name={"arrow-left"} size={26} color={'orange'}
                                onPress={() => navigation.goBack()}  style={{marginLeft:'5%'}}/>
                <Text style={{ color: 'orange', fontFamily: liteFont, textAlign: 'center', fontSize: 24, marginLeft: 80}}>All Places</Text>
            </View> 
            
            <ScrollView>
                <View style={styles.subContainer}>
     

                    { context.getTouristPlaces && context.getTouristPlaces.map(item =>
                        <View style={styles.cardView} key={item.id}>
                           
                             <View style={styles.card}>
                                <View style={styles.imageView}>
                                    <Image style={styles.image} source={{ uri: item.image }} ></Image>
                                      <Text style={{ color: 'orange', fontFamily: boldFont,backgroundColor: '#f5fdf8', fontSize: 20, textAlign: 'center' }}>{item.name}</Text>
                                </View>
                                <View style={styles.cardtitleView}>
                                   
                                    <View style={styles.contact}>
                                        
                                      
                                        <TouchableOpacity style={{ backgroundColor: '#f5fdf8', width: 100, alignItems: 'center', borderRadius: 6, elevation: 4 }}
                                            onPress={() => { Linking.openURL(`geo:0,0?q=${item.location}`); }}>
                                            <Text style={{ color: 'black', fontFamily: boldFont, }}>Location</Text>
                                            <Icon name={"map-marker"} size={24} color={'green'} />
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

export default TouristPlaces

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
