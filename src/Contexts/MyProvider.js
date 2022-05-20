import React, { Component } from 'react';
import MyContext from './Context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



class MyProvider extends Component {
    state = {
        search: null,
        loading: true,
        city:'aa',
        user:''
    };



    setItem = (e) => {
        this.setState({ search: e })
    }
    setCity = (e) => {
        this.setState({ city: e })
    }
    setUser = (e) => {
        this.setState({ user: e })
    }
    setLoading = () => {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 200);
    };
    getUser=()=>{
        return this.state.user;
    }
    getCity=()=>{
        return this.state.city;
    }


    filterList = (lis) => {
        return lis.filter(listItem => listItem.cityname.toLowerCase().includes(this.state.search.toLowerCase()));
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    loading: this.state.loading,
                    filterList: this.filterList,
                    search: this.state.search,
                    setItem: this.setItem,
                    setLoading: this.setLoading,
                    setCity: this.setCity,
                    setUser : this.setUser,
                    getCity :this.state.city,
                    getUser: this.getUser
                }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
export default MyProvider;
