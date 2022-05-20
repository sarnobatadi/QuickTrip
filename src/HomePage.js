import React, { useState,useContext,useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from "react-native-image-viewing";

import MyContext from './Contexts/Context'

import Slider from './slider/Slider'



const HomePage = ({ navigation }) => {

    const [modal, setModal] = useState(false)
    const [visible, setIsVisible] = useState(false);
    const context = useContext(MyContext)
    //const name=context.getCity()



    const category = [{ id: 1, name: 'Adventure', image: 'https://i.pinimg.com/originals/ec/6c/73/ec6c733bbe59569b43e1d034118aa090.jpg' },
    { id: 2, name: 'Amusment', image: 'https://image.shutterstock.com/image-vector/ice-peak-mountain-green-meadows-260nw-1337286755.jpg' },
    // { id: 3, name: 'Camping', image: 'https://i.pinimg.com/originals/ec/6c/73/ec6c733bbe59569b43e1d034118aa090.jpg' },
    // { id: 4, name: 'Camping', image: 'https://i.pinimg.com/originals/ec/6c/73/ec6c733bbe59569b43e1d034118aa090.jpg' },
    // { id: 5, name: 'Camping', image: 'https://i.pinimg.com/originals/ec/6c/73/ec6c733bbe59569b43e1d034118aa090.jpg' },


    ]

    const images = [
        {
            id: 1,
            uri: "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg'",
        },
        // {
        //     id: 2,
        //     uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        // },
        {
            id: 3,
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
    ];


    const reels = [{
        id: 1, name: 'Krishna River', place: 'Sangli', image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'
    },
    { id: 2, name: 'Ganpati Mandir', place: 'Sangli', image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4' },
    { id: 3, name: 'Dandoba', place: 'Sangli', image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4' },

    ]

    useEffect(() => {
      
    }, [name])
    

    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={() => {
                setModal(!modal);
            }}>
                <View style={styles.modalView}>
                    <Text>dugduefe</Text>

                </View>
            </Modal>
            <ImageBackground imageStyle={{ borderBottomRightRadius: 40 }} style={styles.imageHotel} source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageHotelContent}>
                        <View style={styles.subContainer}>
                            <View style={styles.title}>
                                <Text style={{ fontSize: 24, fontFamily: liteFont, color: 'white' }}>Hi</Text>
                                <Text style={{ fontSize: 22, fontFamily: baseFont, color: 'orange', marginLeft: 6 }}>Aditya,</Text>
                                <View activeOpacity={0.9} style={{ paddingLeft: 180, alignItems: 'center' }}
                                    onPress={() => setModal(!modal)}>
                                    <Icon name={"bell-ring"} size={30} color={'orange'} onPress={() => setModal(!modal)} />
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: 24, color: 'white' }}>𝐰𝐡𝐞𝐫𝐞 𝐝𝐨 𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨  {context.getCity}{console.log("**********",context.getCity)}</Text>
                                <Text style={{ fontSize: 26, fontFamily: liteFont, color: 'orange', marginLeft: 6 }}>ɠơ </Text>
                                <Text style={{ fontSize: 25, fontFamily: liteFont, color: '#fff' }}>?̾</Text>
                            </View>
                            <TouchableOpacity style={styles.searchView} activeOpacity={0.7}
                                onPress={() => navigation.navigate('Category')}>
                                <Icon name={"magnify"} size={24} color={'orange'} />
                                <Text style={{ color: '#f1f5f9', fontFamily: baseFont, fontSize: 15, paddingLeft: 5 }}>Search Places..</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titleHead}>
                        <Text style={{ fontSize: 20, color: 'black', fontFamily: boldFont }}>Categories</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 15, color: 'orange', fontFamily: liteFont }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cat}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.category}>
                                {category.map(item =>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.Art} key={item.id} onPress={() =>
                                        navigation.navigate('HotelSingle')}>
                                        <View style={styles.imgContainer}>
                                            <Image style={styles.img} source={{ uri: item.image }} />
                                        </View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}> {item.name}</Text>
                                    </TouchableOpacity>)}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.bgm}>
                        <View style={styles.places}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, color: 'black', fontFamily: boldFont }}>Sangli Districts</Text>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, color: 'orange', fontFamily: liteFont }}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.slider}>
                                <Slider navigation={navigation} />
                            </View>
                            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 22, color: 'black', fontFamily: boldFont }}>Discover</Text>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, color: 'orange', fontFamily: liteFont }}>More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.reels}>
                                {reels.map(item =>
                                    <TouchableOpacity activeOpacity={0.7} style={{ marginHorizontal: 6 }} key={item.id} onPress={() => setIsVisible(true)}>
                                        <ImageBackground imageStyle={{ height: 250, width: 160, borderRadius: 12 }} style={styles.img2} source={{ uri: item.image }}>
                                            <View style={styles.inside}>
                                                <View style={styles.head}>
                                                    <Text style={{ color: '#fff', fontFamily: liteFont, fontSize: 15 }}>{item.name}</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                                                        <Icon name={"map-marker"} size={18} color={'orange'} />
                                                        <Text style={{ fontSize: 12, color: '#fff', fontFamily: baseFont }}>{item.place}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>)}
                            </View>
                        </ScrollView>
                        <View style={styles.reelUnder}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.explore} onPress={() => navigation.navigate('Sections')}>
                                <Text style={{ color: '#f1f5f9', fontFamily: liteFont, fontSize: 18 }}>Explore more places</Text>
                                <Icon name={"arrow-decision-outline"} size={24} color={'black'} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <ImageView
                            images={images}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setIsVisible(false)}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    subContainer: {
        padding: '5%',

    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageHotel: {
        height: 240,
        width: '100%',
        flex: 1,
        resizeMode: 'cover',
        borderBottomRightRadius: 40,
    },
    imageHotelContent:
    {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        height: 240,
        borderBottomRightRadius: 40,
    },
    searchView: {
        width: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        padding: 8,
        borderRadius: 30,
        marginVertical: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    bgm: {
        backgroundColor: '#fff',
        padding: '5%',
        // height: 160,
        justifyContent: 'center'
    },
    titleHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5%'
    },
    img: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 6
    },
    imgContainer: {
        width: 60,
        height: 45,
        flex: 1
    },
    Art: {
        width: 130,
        height: 60,
        padding: 6,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6
    },
    category: {
        flexDirection: 'row',
        // height: 100,
        marginVertical: 10
    },
    places: {
        marginVertical: 10,
    },
    slider: {
        marginVertical: 20,
        marginBottom: 10
    },
    cat: {
        paddingLeft: '5%'

    },
    inside: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        width: 160,
        borderRadius: 12,
        padding: 10,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    img2: {
        height: 250,
        width: '100%',
        flex: 1,
        resizeMode: 'cover',
    },
    reels: {
        flexDirection: 'row',


    },
    modalView: {
        height: 300,
        width: '100%',
        backgroundColor: '#f1f5f9',
        marginTop: 415,
        elevation: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    reelUnder: {
        padding: 10

    },
    explore: {
        padding: 12,
        backgroundColor: 'orange',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'


    }


})


