import React, { useState,useEffect,useContext } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyContext from './Contexts/Context';


import { firestore } from './firebase';
import Navigation from './Navigation';





const Places = ({ navigation }) => {
    const [placeList, setPlaceList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const context = useContext(MyContext)

    //var list = [{ id: 0, name: 'Kesari Tours, Pune', image: 'https://gumlet.assettype.com/swarajya%2F2019-10%2Fc15839cf-81c2-47d5-a4df-84a5ff4fcef3%2FBandipur_National_park_road.jpg?w=640&q=75&auto=format%2Ccompress'},]
   
    useEffect(async() => {
        let a=[]
        await firestore.collection("package").get().then((querySnapshot) => {
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
            <View style={{ width: '100%', height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'orange', fontFamily: liteFont, textAlign: 'center', fontSize: 24 }}>Contact</Text>
            </View> 
            <ScrollView>
                <View style={styles.subContainer}>
                    {placeList && placeList.map((item,id )=><View style={styles.cardView} key={id}>
                        <View style={styles.card}>
                                <View style={styles.imageView}>
                                    <Image style={styles.image} source={{ uri: item.imglink }} ></Image>
                                      <Text style={{ color: 'orange', fontFamily: boldFont,backgroundColor: '#f5fdf8', fontSize: 20, textAlign: 'center' }}>{item.packageName}</Text>
                                </View>
                                <View style={styles.cardtitleView}>
                                   
                                    <View style={styles.contact}>
                                        
                                        <TouchableOpacity style={{ backgroundColor: '#f5fdf8', width: 100, alignItems: 'center', borderRadius: 6, elevation: 4 }}
                                            onPress={() => navigation.navigate("PackageSingle",{item:item})}>
                                            <Text style={{ color: 'black', fontFamily: boldFont, }}>Book Now</Text>
                                            <Icon name={"book"} size={24} color={'green'} />
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
