import React from 'react';
import Settings from "../components/Settings";

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Settings {...this.props}/>
        )
    }
}
