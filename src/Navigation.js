import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import LoginScreen from './Login';
import LoaderScreen from './Loader';
import SignupScreen from "./Signup";
import HomePageScreen from "./HomePage";
import AuthcheckScreen from "./Authcheck";
import ProfileScreen from "./Profile";
import CategoryScreen from "./Category";
import PlacesScreen from "./Places";
import ListScreen from "./List";
import PlaceSingle from "./PlaceSingle";
import Section from "./Sections";
import HotelSingle from "./Hotel";









import Slider from './slider/Slider'





const Tab1 = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const HomeTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarStyle: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20, height: 60, elevation: 1,
                backgroundColor: 'black', alignItems: 'center'
            },
        }} tabBarOptions={{ showLabel: false }}>
            <Tab.Screen name="Home" options={{
                tabBarIcon: ({ focused, color }) => (
                    <Icon name="home-circle" color={focused ? '#f18100' : color} size={28} />
                ),
            }} component={HomePageScreen} />
            <Tab.Screen name="Places" options={{
                tabBarIcon: ({ focused, color }) => (
                    <Icon name="phone" color={focused ? '#f18100' : color} size={28} />
                ),
            }} component={PlacesScreen} />
            <Tab.Screen name="Sections" options={{
                tabBarIcon: ({ focused, color }) => (
                    <Icon name="palm-tree" color={focused ? '#f18100' : color} size={28} />
                ),
            }} component={Section} />
            <Tab.Screen name="Profile" options={{
                tabBarIcon: ({ focused, color }) => (
                    <Icon name="account-tie" color={focused ? '#f18100' : color} size={28} />
                ),
            }} component={ProfileScreen} />



        </Tab.Navigator>
    )
}






// const MyTest = () => {
//     return (
//         <Tab1.Navigator
//             screenOptions={{
//                 tabBarLabelStyle: { color: 'white', fontWeight: 'bold', fontSize: 15, marginTop: 0 },
//                 tabBarItemStyle: {},
//                 tabBarStyle: { backgroundColor: 'black', padding: 3 },

//             }} tabBarOptions={{ showLabel: false }}>
//             <Tab1.Screen name="CHATS"
//                 options={{
//                     tabBarIcon: ({ focused, color }) => (
//                         <Icon name="account-tie" color={focused ? '#f18100' : color} size={28} />
//                     ),

//                 }} component={Section} />
//             <Tab1.Screen name="CALLS" options={{
//                 tabBarIcon: ({ focused, color }) => (
//                     <Icon name="account-tie" color={focused ? '#f18100' : color} size={28} />
//                 ),

//             }} component={Section} />

//         </Tab1.Navigator>
//     )
// }



const Navigation = () => {
    return (

        <Stack.Navigator >
            {/* <Stack.Screen name="Loader" options={{ headerShown: false }} component={LoaderScreen} />
            <Stack.Screen name="Authcheck" options={{ headerShown: false }} component={AuthcheckScreen} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} /> */}
            <Stack.Screen name="HomePage" options={{ headerShown: false }} component={HomeTabs} />
            <Stack.Screen name="Slider" options={{ headerShown: false }} component={Slider} />
            <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
            <Stack.Screen name="Category" options={{ headerShown: false }} component={CategoryScreen} />
            <Stack.Screen name="Places" options={{ headerShown: false }} component={PlacesScreen} />
            <Stack.Screen name="List" options={{ headerShown: false }} component={ListScreen} />
            <Stack.Screen name="PlaceSingle" options={{ headerShown: false }} component={PlaceSingle} />
            <Stack.Screen name="Sections" options={{ headerShown: false }} component={Section} />
            <Stack.Screen name="HotelSingle" options={{ headerShown: false }} component={HotelSingle} />













        </Stack.Navigator>
    );
};


export default Navigation