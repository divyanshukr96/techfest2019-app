import React from 'react';
import {connect} from 'react-redux'
import {ScrollView, StyleSheet} from 'react-native';
import QrScanner from "../components/QrScanner";


class QrScanScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        // if (!this.props.isAuthenticated) {
        //     this.props.navigation.navigate('Auth');
        //     return null;
        // }
        return (
            <ScrollView style={styles.container}>

                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
                <QrScanner/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#2c3e50'
    },
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(QrScanScreen)
