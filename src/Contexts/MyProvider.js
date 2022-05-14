import React, { Component } from 'react';
import MyContext from './Context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



class MyProvider extends Component {
    state = {
        search: null,
        loading: true,
    };



    setItem = (e) => {
        this.setState({ search: e })
    }

    setLoading = () => {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 200);
    };


    filterList = (lis) => {
        return lis.filter(listItem => listItem.place.toLowerCase().includes(this.state.search.toLowerCase()));
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



                }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
export default MyProvider;
