import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import '../global';
import './global';
import global from './global'
import axios from 'axios'


import List from './List'
import MyContext from './Contexts/Context'



const Category = ({ navigation }) => {

    const context = useContext(MyContext)
    const searchInputRef = React.useRef(null);

    useEffect(() => {
        searchInputRef.current.focus();
        getData()
    }, []);


    const [page, setPage] = useState(true)
    const [searchField, setsearchField] = useState(null)
    const [close, setClose] = useState(false)
    // const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState([])
    const [history, setHistory] = useState([])



    const getData = () => {
        var config = {
            method: 'get',
            url: global.baseUrl + 'popular/',
            // headers: {
            // }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.status === 200) {
                    setName(response.data.data)
                    getHistory()
                } else {
                    console.warn('no internet connection')
                }
            })
            .catch(function (error) {
                console.log(error);
                console.warn('no internet connection')

            });

    }


    const getHistory = () => {
        var config = {
            method: 'get',
            url: global.baseUrl + 'history/',
            // headers: {
            // }
        };

        axios(config)
            .then(function (response) {
                setHistory(response.data.data)
                setLoading(false)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }



    const handleChange = (e) => {
        context.setItem(e)
        setsearchField(e)
        if (e !== null) {
            if (e.length >= 1) {
                setClose(true)
            } else {
                setClose(false)
            }
            console.log('close icon enable')
            if (e.length >= 2) {
                console.log('show restuarent page')
                setPage(false)
            } else {
                console.log('show history page')
                setPage(true)
            }
        }

    }

    const handleSelect = (name) => {
        handleChange(name)


    }

    const handleClear = (clear) => {
        setsearchField('')
        handleChange(clear)
    }



    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.backBtn}>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.goBack()}>
                        <Icon name={"arrow-left"} size={24} color={'#FD6244'} />
                    </TouchableOpacity>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Icon name={"magnify"} size={22} color={'grey'} />
                            <TextInput value={searchField} ref={searchInputRef} autoFocus={false} placeholder='Search places or locations' style={styles.search}
                                onChangeText={(e) => handleChange(e)}>
                            </TextInput>
                            <TouchableOpacity onPress={(clear) => handleClear(clear)}>
                                {close && <Icon style={styles.closeBtn} name={"close"} size={18} color={'grey'} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {page === true ?
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text style={styles.title}>POPULAR SEARCHES</Text>
                        {loading ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="small" color="orange" /></View>
                            :
                            <View style={styles.suggestList}>
                                {name.map(item =>
                                    <TouchableOpacity onPress={() => handleSelect(item.name)} key={item.id}><Text style={styles.name}>{item.name}</Text></TouchableOpacity>
                                )}
                            </View>}
                        <View style={styles.history}>
                            <Text style={styles.recent}>RECENT SEARCHES</Text>
                        </View>
                        <View>
                            {history.map(items =>
                                <TouchableOpacity key={items.id} onPress={() => handleSelect(items.name)}>
                                    <View style={styles.historyList}>
                                        <Icon name={"history"} size={22} color={'rgba(52, 52, 52, 0.5)'} />
                                        <View style={{ marginHorizontal: '8%' }} >
                                            <Text style={{ fontFamily: baseFont, fontSize: 16 }}>{items.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>)}
                        </View>
                    </ScrollView>

                </View> : <List navigation={navigation} />}
        </View>
    )
}





export default Category


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        padding: '3%'
    },
    subContainer: {
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    search: {
        padding: 0,
        width: '100%',
        paddingLeft: 5
    },
    searchBar: {
        backgroundColor: '#F4F4F4',
        width: '100%',
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0.5,
        paddingRight: '16%'
    },
    title: {
        fontSize: 12,
        fontFamily: boldFont,
        color: 'grey',
        paddingLeft: 10
    },
    recent: {
        fontSize: 12,
        fontFamily: boldFont,
        color: 'grey',
        paddingLeft: 12,
        marginVertical: 2
    },
    list: {
        padding: 5,
        backgroundColor: '#F4F4F4',
        width: 80,
        borderRadius: 6,
        margin: 5
    },
    suggestList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent:'space-around'
        marginVertical: 10
    },
    name: {
        fontFamily: boldFont,
        color: 'grey',
        backgroundColor: '#F1F4F9',
        padding: 8,
        borderRadius: 10,
        paddingHorizontal: 15,
        margin: 5
    },
    history: {
        marginVertical: 10,
    },
    historyList: {
        paddingHorizontal: '3%',
        flexDirection: 'row',
        marginBottom: '8%',
    },
})