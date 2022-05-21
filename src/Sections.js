import React, { useState, useEffect,useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReadMore from '@fawazahmed/react-native-read-more';

import './global';
import MyContext from './Contexts/Context';


const Sections = () => {

    const [placeList, setPlaceList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const context = useContext(MyContext)

    var list = [{ id: 0, name: 'Kesari Tours, Pune', image: 'https://gumlet.assettype.com/swarajya%2F2019-10%2Fc15839cf-81c2-47d5-a4df-84a5ff4fcef3%2FBandipur_National_park_road.jpg?w=640&q=75&auto=format%2Ccompress'},]
   
    useEffect(async() => {
        let a=[]
        await firestore.collection("PackagesBooking").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                var data = doc.data();
                //setInfo(arr => [...arr , data]);
                a.push({...data,id:doc.id})
                console.log(data);
                console.log(`${doc.id} => ${doc.data().name}`);
            });
        });
        setPlaceList(a)
        setIsLoading(false)
    },[])
        
    useEffect(() => {
      console.log(placeList)
      console.log(context.getTouristPackages)
    }, [isLoading])





    
    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <Text style={{ color: 'orange', fontFamily: boldFont, fontSize: 20 }}>Users Post</Text>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() => getData()}>
                    <Icon name={"refresh"} size={24} color={'orange'} />
                    <Text style={{ color: 'orange', fontFamily: baseFont, fontSize: 12 }}>Refresh</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {list.map(items =>
                    <View style={styles.card} key={items.id}>
                        <View style={styles.cardTitle}>
                            <View style={{ padding: '2%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={styles.image2Container}>
                                    <Image style={styles.image2} source={{ uri: items.profile }}>

                                    </Image>
                                </View>
                                <View style={{width:'80%',marginLeft: 0,justifyContent: 'center'}}>
                                    <Text style={{ color: 'black', fontFamily: boldFont, fontSize: 16 }}>{items.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name={"map-marker-radius"} size={14} color={'black'} />
                                        <Text style={{ color: 'black', fontFamily: liteFont, fontSize: 12 }}>{items.place}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Icon name={"dots-vertical"} size={24} color={'black'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: items.image }} />
                        </View>
                        <View style={styles.description}>
                            <ReadMore numberOfLines={3} style={{ fontFamily: boldFont }} >
                                {
                                    <Text>{items.experience}</Text>

                                }
                            </ReadMore>
                        </View>
                        <View style={styles.rating}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name={"star-half-full"} size={22} color={'green'} />
                                <Text style={{ fontSize: 18, color: 'green' }}>{items.rating}/9</Text>
                            </View>
                        </View>
                    </View>)}
            </ScrollView>

        </View >
    )
}

export default Sections


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f5f9'
    },
    navBar: {
        backgroundColor: 'black',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        backgroundColor: 'white',
    },
    image: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    imageContainer: {
        height: 300,
        width: '100%'
    },
    rating: {
        paddingHorizontal: '2%',
        alignItems: 'flex-end',
    },
    description: {
        padding: '2%'
    },
    cardTitle: {
        marginTop: 14
    },
    image2Container: {
        height: 40,
        width: 40,
        backgroundColor: '#F5FDF8',
        borderRadius: 500,
        // overflow: 'hidden'

    },
    image2: {
        height: null,
        width: null,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 60
    },
})
