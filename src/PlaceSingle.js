import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'

import './global';
import global from './global'



const PlaceSingle = ({ navigation, route }) => {

    useEffect(() => {
        getData()
    }, []);


    const [page, setPage] = useState(true)
    const [select, setSelect] = useState(1)
    const [modal, setModal] = useState(false)
    const [comment, setComment] = useState(null)
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(true);




    const item = [{ id: 1, title: 'Overview' },
    { id: 2, title: 'Gallery' },]

    const content = [{ id: 1, title: 'Why Not Go', description: 'deufgirifug3f3gfo4shfe3g' }]



    const handle = (e) => {
        setSelect(e)
        if (e === 1) {
            setPage(true)
            console.log(e, 'dd')
        } else {
            setPage(false)
            console.log(e)
        }
    }


    const handleChange = (e) => {
        setComment(e)
        if (e != null) {
            if (e.length >= 1) {
                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
        }

    }


    const pushData = () => {
        const data = new FormData()
        data.append('comment', comment);
        var config = {
            method: 'post',
            url: global.baseUrl + 'reviews/',
            // headers: {
            // },
            data: data
        };
        console.log(config.url, config.data)
        axios(config)
            .then(function (response) {
                setLoading(true)
                getData()
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const getData = () => {
        var config = {
            method: 'get',
            url: global.baseUrl + 'reviews/',
            // headers: {}
        };

        axios(config)
            .then(function (response) {
                setReview(response.data.data)
                setLoading(false)
                setComment("")
                setDisabled(true)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }


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
                                <Text style={{ fontSize: 30, fontFamily: liteFont, color: 'white' }}>{route.params.item.place},{ }</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name={"map-marker-radius"} size={18} color={'orange'} />
                                    <Text style={{ fontSize: 16, fontFamily: boldFont, color: 'white' }}> {route.params.item.location}</Text>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.sub}>
                        <View style={styles.title}>
                            {item.map(item =>
                                <TouchableOpacity key={item.id}>
                                    <Text style={select == item.id ? { ...styles.over, borderBottomWidth: 2, borderBottomColor: 'orange', } : { ...styles.over, color: 'grey' }} onPress={() => handle(item.id)}>{item.title}</Text>
                                </TouchableOpacity>)}
                            <TouchableOpacity activeOpacity={0.5} onPress={() => setModal(!modal)}>
                                <Text style={{ ...styles.over, color: 'grey' }}>Reviews</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {page === true ?
                            <View style={styles.description}>
                                <View style={{marginBottom:15}}>
                                    <Text style={{ color: 'black', fontSize: 27, fontFamily: liteFont }}>WhY go Now : {route.params.item.place}</Text>
                                </View>

                                <Text style={{ fontFamily: baseFont }}>{route.params.item.description}</Text>
                            </View> : <Text>{route.params.item.location}</Text>}
                    </View>
                </View>
                <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={() => {
                    setModal(!modal);
                }}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={{ width: '100%', borderRadius: 100, alignItems: 'center', }}
                                onPress={() => setModal(!modal)}>
                                <Icon name={"close-circle-outline"} size={28} color={'#FD6244'} />
                            </TouchableOpacity>
                            <ScrollView>
                                <View style={{ borderBottomWidth: 1, borderColor: 'orange', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 30, marginVertical: 25 }}>
                                    <TextInput value={comment} placeholder='Submit Your Review' style={{ padding: 0 }}
                                        onChangeText={(e) => handleChange(e)}>

                                    </TextInput>

                                    <TouchableOpacity onPress={() => pushData()} disabled={disabled} style={[disabled === true ? { ...styles.send, backgroundColor: 'grey' } : styles.send]}>
                                        <Icon style={{ flex: 1 }} name={"send-circle-outline"} size={36} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                                {loading ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="small" color="orange" /></View>
                                    :
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginVertical: 30, }}>
                                        {review.map(item =>
                                            <Text style={styles.comments} key={item.id}>{item.comment}</Text>)}
                                    </View>}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
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