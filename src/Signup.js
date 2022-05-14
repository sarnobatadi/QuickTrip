import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Flow } from 'react-native-animated-spinkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import './global';
import global from './global'

const Signup = ({ navigation }) => {


    const [modal, setModal] = useState(false)
    const [hidePass, setHidePass] = useState(true)
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [disabled, setDisabled] = useState(true);


    const handleChange = (e) => {
        setPassword(e)
        if (username != null && e != null) {
            if (username.length > 0 && e.length >= 3) {
                setDisabled(false)
                console.log(username, 'ee')
                console.log(password, 'eed')
                console.log(email)
            } else {
                setDisabled(true)
            }
        }

    }

    const register = () => {
        const data = new FormData()
        data.append('email', email);
        data.append('username', username);
        data.append('password', password);

        var config = {
            method: 'post',
            url: global.baseUrl + 'registers/',
            // headers: {
            //     ...data.getHeaders()
            // },
            data: data
        };
        console.log(config.url, config.data)
        axios(config)
            .then(function (response) {
                if (response.data.status === 200) {
                    setAsync(response.data.token)
                } else {
                    alert('failed to Signup')
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                alert('User Already Exist')
                console.log(error);
            });
    }



    const setAsync = (auth) => {
        setModal(!modal)
        setTimeout( async () => {
            await AsyncStorage.setItem("MyToken", auth).then(() =>
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePage' }],
                })


            )
        }, 1200)
    }



    const usemodal = () => {
        setModal(!modal)
        setTimeout(() => {


        }, 2000)

    }


    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={() => {
                setModal(!modal);
            }}>
                <View style={styles.modalContainer}>
                    <View style={{
                        height: 300, width: 300, justifyContent: 'center', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'white', borderRadius: 20, elevation: 6, borderWidth: 0.5, borderColor: 'orange'
                    }}>
                        <Icon style={{ marginVertical: 5 }} name={"account-check-outline"} size={60} color={'green'} />
                        <Text style={{ color: 'green', fontSize: 35, fontFamily: liteFont, textAlign: 'center' }}>Suuceesfully Registered</Text>
                        <View style={{ marginTop: 40 }}>
                            <Flow size={60} color="orange" />
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/aa.jpg')}>
                    </Image>
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Create Account</Text>
                        <Text style={{ fontSize: 18, marginVertical: 5, fontFamily: boldFont }}>Please sign up to continue</Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.password}>
                            <Icon name={"email"} size={20} color={'orange'} />
                            <TextInput placeholder='Email' style={styles.search}
                                onChangeText={(e) => setEmail(e)}>
                            </TextInput>
                        </View>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} />
                            <TextInput placeholder='Username' style={styles.search}
                                onChangeText={(e) => setUsername(e)}>
                            </TextInput>
                        </View>
                        <View style={styles.password}>
                            <Icon name={"lock"} size={20} color={'orange'} />
                            <TextInput placeholder='Password' style={styles.search}
                                secureTextEntry={hidePass ? true : false}
                                onChangeText={(e) => handleChange(e)}>
                            </TextInput>
                            <Icon name={hidePass ? 'eye-off' : 'eye'} size={20} color={'grey'}
                                onPress={() => setHidePass(!hidePass)} />
                        </View>
                        <TouchableOpacity disabled={disabled} style={styles.btn} onPress={() => register()}>
                            <ImageBackground style={[styles.button, disabled && { ...styles.button, opacity: 0.4 }]} imageStyle={{ height: 50, width: 120, borderRadius: 40 }} source={require('../assets/bb.jpg')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: liteFont, textAlign: 'center' }}>Sign Up</Text>
                                    <Icon style={{ marginTop: 3, marginLeft: 2 }} name={"arrow-right"} size={28} color={'white'} />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontFamily: boldFont }}>Already have a  account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontFamily: liteFont, color: 'orange', }}> Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default Signup


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {
        height: 130,
        width: 160,
        marginLeft: '60%',
    },
    image: {
        height: null,
        width: null,
        flex: 1,
        resizeMode: 'cover'
    },
    subContainer: {
        padding: '5%',
        // marginVertical: 22,
    },
    title: {
        marginVertical: 20
    },
    titleText: {
        color: 'black',
        // fontWeight: 'bold',
        fontSize: 32,
        fontFamily: liteFont,
    },
    search: {
        padding: 0,
        width: '100%',
        paddingLeft: 5,
        paddingRight: 20
    },
    username: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f5f5fd',
        padding: 10,
        borderRadius: 40,
        width: '100%',
        paddingRight: '18%',
        marginVertical: '10%',
        borderWidth: 2,
        borderColor: 'orange',
    },
    password: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f5f5fd',
        padding: 10,
        borderRadius: 40,
        width: '100%',
        paddingRight: '18%',
        borderWidth: 2,
        borderColor: 'orange',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        marginLeft: 100,
        height: 50,
        width: 120,
        borderRadius: 40,
    },
    btn: {
        marginLeft: 100,
        flex: 1,
        marginVertical: 10,
        alignItems: 'center',
    },
    footer: {
        alignItems: 'center',
        marginTop: '20%'
    },
    modalContainer: {
        alignItems: 'center',
        marginVertical: 220,
        flex: 1
    }
})
