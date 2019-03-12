import React from 'react';
import axios from "axios";
import {logout} from "../actions/authActions";


export default {
    setupInterceptors: (store, history) => {
        axios.defaults.baseURL = 'https://techfestsliet.com';
        // axios.defaults.baseURL = 'http://172.21.17.70:50000';
        axios.interceptors.request.use(config => {
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            switch (error.response.status) {
                case 401:
                    store.dispatch(logout());
                    break;
                // case 404:
                //     history.push('/not-found');
                //     break;
                default:
                    return Promise.reject(error);
            }
            return Promise.reject(error);
        });
    },
};
