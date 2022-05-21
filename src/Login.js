import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import './global';
import global from './global'
import a from './login.json'
import { auth } from './firebase';


const Login = ({ navigation }) => {

    const [hidePass, setHidePass] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleChange = (e) => {
        setPassword(e)
        if (email != null && e != null) {
            if (email.length > 0 && e.length >= 3) {
                setDisabled(false)
                console.log(email, 'ee')
                console.log(password, 'eed')
            } else {
                setDisabled(true)
            }
        }

    }


    // const signIn = () => {
    //     const data = new FormData()
    //     data.append('username', username);
    //     data.append('password', password);

    //     // var config = {
    //     //     method: 'post',
    //     //     url: global.baseUrl + 'logins/',
    //     //     // headers: {
    //     //     // },
    //     //     data: data
    //     // };
    //     // console.log(config.url, config.data)
    //     // axios(config)
    //     //     .then(function (response) {
    //     //         response={data: a}
    //     //         console.log(response)
    //     //         if (response.data.status === 200) {
    //     //             setAsync(response.data.data.token)
    //     //         } else{
    //     //             console.log('Invalid')
    //     //         }
    //     //         console.log(JSON.stringify(response.data));
    //     //     })
    //     //     .catch(function (error) {
    //     //         alert('Invaid Credentials')
    //     //         console.log(error);
    //     //     });

    //     const response={"data": a}
    //     console.log(response)
    //     if (response.data.status === 200) {
    //         setAsync(response.data.data.token)
    //     } else{
    //         console.log('Invalid')
    //     }
    //     console.log(JSON.stringify(response.data));

    // }


    const setAsync = async (auth) => {
        await AsyncStorage.setItem("MyToken", auth).then(() =>
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }],
            })
        )
    }



    const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("")

    const handleSubmit = async () =>{
       
        try {
            await auth.signInWithEmailAndPassword( email, password )
            setEmail("")
            setPassword("")
            setAsync("f3803f332fbd386d78d120cb5163291818a53cfa6a5ff68de1f8d8feae5a0a84")
        } catch (error) {
            console.log(error)
            alert('Invaid Credentials')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/aa.jpg')}>
                    </Image>
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Login</Text>
                        <Text style={{ fontSize: 18, marginVertical: 5, fontFamily: boldFont }}>Please sign in to continue</Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.username}>
                            <Icon name={"account"} size={20} color={'orange'} />
                            <TextInput placeholder='Email' style={styles.search}
                                onChangeText={(e) => setEmail(e)}>
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
                        <TouchableOpacity disabled={disabled} style={styles.btn} onPress={() => handleSubmit()}>
                            <ImageBackground style={[styles.button, disabled && { ...styles.button, opacity: 0.4 }]} imageStyle={{ height: 50, width: 120, borderRadius: 40 }} source={require('../assets/bb.jpg')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontFamily: liteFont }}>Login</Text>
                                    <Icon style={{ paddingLeft: 5, marginTop: 4 }} name={"arrow-right"} size={28} color={'white'} />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontFamily: boldFont }}>Don't have an account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={{ fontFamily: liteFont, color: 'orange', }}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default Login


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
        marginVertical: 22
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
    }
})
