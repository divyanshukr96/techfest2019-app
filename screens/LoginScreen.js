import React from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';
import LoginForm from "../components/LoginForm";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.logoContainer}>
                        <Image resizeMode="contain" style={styles.logo}
                               source={require('../assets/images/TFglow.png')}/>
                        <Image resizeMode="contain" style={styles.techFest}
                               source={require('../assets/images/techFEST.faea55af.png')}/>
                    </View>
                    <LoginForm {...this.props}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 180
    },
    techFest: {
        height: 60,
        width: 180
    }
});
