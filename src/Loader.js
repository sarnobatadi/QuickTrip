import React from 'react'
import { View, Text, StyleSheet,ImageBackground } from 'react-native'
import { Wander, Flow } from 'react-native-animated-spinkit'

const Loader = ({ navigation }) => {

    setTimeout(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Authcheck' }],
        })

    }, 1000)

    return (
        <View>
            <View style={styles.container}>
            <Text style={{ fontSize: 60, color: 'orange',backgroundColor: 'white',textAlign: 'center',marginBottom:50}}>ππ π£πΈπΎπ»π²πΌπΆ</Text>
                <Wander size={100} color="orange"
                />
            </View>
        </View>
    )
}


export default Loader


const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

})