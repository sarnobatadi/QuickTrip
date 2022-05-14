import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image } from "react-native";
import axios from 'axios'

import MyContext from './Contexts/Context'
import './global';
import global from './global'

const List = ({ navigation }) => {



    // const data = [
    //     { id: '1', place: 'First item' },
    //     { id: '2', place: 'Second item' },
    //     { id: '3', place: 'Third item' },
    //     { id: '4', place: 'Fourth item' }
    // ];


    const context = useContext(MyContext)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        var config = {
            method: 'get',
            url: global.baseUrl + 'api/places/',
            // headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.status === 200) {
                    setList(response.data.data)
                    setLoading(false)

                    console.log(list, "inside")
                } else {
                    console.warn('not found')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const pushData = (e) => {
        setHistory(e)
        const data = new FormData()
        data.append('name', e);
        var config = {
            method: 'post',
            url: global.baseUrl + 'history/',
            // headers: {
            //     ...data.getHeaders()
            // },
            data: data
        };
        console.log(config.url, config.data)
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    if (loading) {
        return <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="small" color="orange" /></View>
    }
    return (
        <View>

            <View>
                {context.filterList(list).map((list, index) => (
                    <View style={styles.WrapperContainer} key={list.id}>
                        <TouchableOpacity activeOpacity={0.3} onPress={() =>  navigation.navigate('PlaceSingle', { item: list },pushData(list.place))}>
                            <View style={styles.listItems}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: list.image }} />
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text key={index} style={{ fontFamily: liteFont, fontSize: 18, color: 'black' }}>{list.place}</Text>
                                    <Text style={{ fontFamily: baseFont, fontSize: 14, color: 'grey' }}>{list.location}</Text>
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
