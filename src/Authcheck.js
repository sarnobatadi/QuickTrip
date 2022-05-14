import React, { useEffect } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Authcheck = ({ navigation }) => {


    useEffect(() => {
        authLogin()
    }, []);


    const authLogin = async () => {
        try {
            const GetId = await AsyncStorage.getItem("MyToken");
            // alert(GetId);
            console.log(GetId)
            {
                GetId ? navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePage' }],
                }) :
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })

            }
        }
        catch (error) {
            alert(error);
        }

    }

    return null;
}

export default Authcheck
