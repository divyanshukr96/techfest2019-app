import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, TextInput, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {login} from '../actions/authActions'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    onLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state, this.props)
    };

    render() {
        const {username, password} = this.state;
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           autoCapitalize="none"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           onChangeText={(username) => this.setState({username})}
                           autoCorrect={false}
                           keyboardType='email-address'
                           returnKeyType="next"
                           placeholder='Username'
                           placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style={styles.input}
                           returnKeyType="go" ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.setState({password})}
                           placeholder='Password'
                           placeholderTextColor='rgba(225,225,225,0.7)'
                           secureTextEntry/>
                <TouchableOpacity
                    componenet={Button}
                    style={styles.buttonContainer}
                    disabled={!username || !password}
                    onPress={this.onLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(LoginForm);
