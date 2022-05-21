import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image } from "react-native";
import MyContext from './Contexts/Context'


import { firestore } from "./firebase";


const List = ({ navigation }) => {

    const context = useContext(MyContext)
    const [placeList, setPlaceList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // var list = [{ id: 0, name: 'Kesari Tours, Pune', image: 'https://gumlet.assettype.com/swarajya%2F2019-10%2Fc15839cf-81c2-47d5-a4df-84a5ff4fcef3%2FBandipur_National_park_road.jpg?w=640&q=75&auto=format%2Ccompress'},{ id: 0, name: 'Pune', image: 'https://gumlet.assettype.com/swarajya%2F2019-10%2Fc15839cf-81c2-47d5-a4df-84a5ff4fcef3%2FBandipur_National_park_road.jpg?w=640&q=75&auto=format%2Ccompress'}]
   
    useEffect(() => {
        let a=[]
        firestore.collection("cities").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                a.push(data)
            });
            setPlaceList(a);
        });
        setIsLoading(false)
    },[])
        
    useEffect(() => {
      console.log(placeList)
    }, [isLoading])

    const handleSubmit =(lis)=>{
        context.setCity(lis.cityname )
        updateLastSearch(context.getUser,lis)
        updateTouristPlacesList(lis);
        updateTouristPackagesList(lis.cityname);
        navigation.navigate('HomePage')
    }
    
    const updateLastSearch =  async (userAuth, urlData) =>{
        if(!userAuth){
            return;
        }
        const urlRef = firestore.doc(`user/${userAuth.id}`)
        const urlSnapshot = await urlRef.get()
        if(urlSnapshot.exists){
            //console.log((urlSnapshot.data()))
            try{
                await urlRef.update({
                    "lastSearch":urlData.cityname
                })
            } catch( error){
                console.log('error updating data',error.message)
            }
        }
        else {
            console.log("Invalid id");
        }
    }

    const updateTouristPlacesList= async(lis)=>{
        let a=[]
        await firestore.collection("touristPlaces").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if(data.city.toLowerCase()===lis.cityname.toLowerCase())
                    a.push(data)
            });
        });
        context.setTouristPlaces(a)
        
    }

    const updateTouristPackagesList= async(lis)=>{
        let a=[]
        await firestore.collection("package").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                console.log("data",data,lis)
                a.push(data)
            });
        });
        context.setTouristPackages(a)
    }
    

    if (isLoading) {
        return <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="small" color="orange" /></View>
    }
    return (
        <View>
            <View>
                {placeList && context.filterList(placeList).map((lis, index) => (
                    <View style={styles.WrapperContainer} key={index}>
                        {/* <TouchableOpacity activeOpacity={0.3} onPress={() =>  navigation.navigate('PlaceSingle', { item: lis },pushData(list.place))}> */}
                        <TouchableOpacity activeOpacity={0.3} onPress={() => handleSubmit(lis)}>
                            <View style={styles.listItems}>
                                {/* <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: lis.image }} />
                                </View> */}
                                <View style={styles.titleContainer}>
                                    <Text key={index} style={{ fontFamily: liteFont, fontSize: 18, color: 'black' }}>{lis.cityname}</Text>
                                    {/* <Text style={{ fontFamily: baseFont, fontSize: 14, color: 'grey' }}>{lis.location}</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default List

const styles = StyleSheet.create({

    // itemText: {
    //     margin: 10,
    //     color: 'white',
    //     fontSize: 24,
    //     backgroundColor: 'blue',
    //     width: '100%',
    //     height: 50,
    // },
    WrapperContainer: {
        padding: '2%'

    },
    listItems: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'blue',
        marginBottom: 10


    },
    image: {
        height: null,
        width: null,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 200
    },
    imageContainer: {
        height: 50,
        width: 50
    },
    titleContainer: {
        marginHorizontal: 20
    }
})
