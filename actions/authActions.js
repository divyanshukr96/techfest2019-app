import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as types from "./actionTypes";
import {AsyncStorage, ToastAndroid} from 'react-native';
import SetAuthorizationToken from "../utils/setAuthorizationToken";

export const setCurrentUser = user => {
    return {
        type: types.SET_CURRENT_USER,
        user
    }
};

export const login = (data, props) => async dispatch => {
    try {
        const result = await axios.post('/api/auth/login', data);
        const userToken = result.data.token;
        await AsyncStorage.setItem('userToken', userToken);
        SetAuthorizationToken(userToken);
        dispatch(setCurrentUser(jwtDecode(userToken)));
        await props.navigation.navigate('App');
        return {
            response: result
        };
    } catch (err) {
        ToastAndroid.showWithGravityAndOffset(
            'Login failed',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            150,
        );
        return {
            error: err.response
        };
    }
};


export const logout = (props) => async dispatch => {
    await AsyncStorage.clear();
    SetAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    if (props) await props.navigation.navigate('Auth');
};