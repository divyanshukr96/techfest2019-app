import thunk from "redux-thunk";
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
import {applyMiddleware, createStore, compose} from 'redux'
// import {createBrowserHistory} from 'history';
// import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import rootReducer from '../reducers/rootReducer'
import SetAuthorizationToken from "../utils/setAuthorizationToken";
import {setCurrentUser} from "../actions/authActions";

const initialState = {};

const middleware = [thunk];

// export const history = createBrowserHistory();

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(
            ...middleware,
        ),
    ),
);

AsyncStorage.getItem('userToken').then(token => {
    SetAuthorizationToken(token);
    store.dispatch(setCurrentUser(jwtDecode(token)));
}).catch(e => {
    SetAuthorizationToken(null);
});


export default store