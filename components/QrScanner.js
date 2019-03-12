import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert, TouchableOpacity, Button} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import axios from 'axios'

export default class QrScanner extends Component {
    _isMounted = false;
    state = {
        hasCameraPermission: null,
        ready: true,
    };

    componentDidMount() {
        this._isMounted = true;
        this._requestCameraPermission();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (this._isMounted) this.setState({hasCameraPermission: status === 'granted'});
    };

    _handleBarCodeRead = data => {
        this.setState({ready: false});
        axios.post('/api/auth/check', {qr: data.data}).then(response => {
            Alert.alert(
                'Successful',
                response.data.success,
                [
                    {text: 'OK', onPress: () => this.setState({ready: true})},
                ],
                {cancelable: false},
            );
        }).catch(({response}) => {
            if (response.status === 401) {
                return this.props.navigation.navigate('Auth');
            }
            if (response.data.event) return Alert.alert(
                'Warning',
                response.data.event,
                [
                    {text: 'OK', onPress: () => this.setState({ready: true})},
                ],
                {cancelable: false},
            );
            setTimeout(() => this.setState({ready: true}), 2000)
        });
    };

    render() {
        const {ready} = this.state;
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <View style={{padding: 8}}>
                            <Text>Camera permission is not granted</Text>
                            <TouchableOpacity
                                componenet={Button}
                                style={styles.buttonContainer}
                                onPress={this._requestCameraPermission}>
                                <Text style={styles.buttonText}>Allow Camera</Text>
                            </TouchableOpacity>
                        </View> :
                        <BarCodeScanner
                            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                            onBarCodeRead={ready && this._handleBarCodeRead}
                            style={{height: 0, paddingBottom: '100%', width: '100%'}}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
});
