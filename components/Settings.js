import React from 'react';
import {Constants} from 'expo';
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {SectionList, Image, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {logout} from '../actions/authActions';

const Logout = (props) => (
    <TouchableOpacity
        componenet={Button}
        style={styles.buttonContainer}
        onPress={() => props.logout(props)}>
        <Text style={styles.buttonText}>LOGOUT</Text>
    </TouchableOpacity>
);

class Settings extends React.Component {
    render() {
        if (!this.props.isAuthenticated){
            this.props.navigation.navigate('App')
        }
        const section = [
            {data: [{value: this.props.user.username}], title: 'Username'},
            // {data: [{value: 'medagaskar'}], title: 'Event Category'},
            // {data: [{value: 'medagaskar'}], title: 'Event Title'},
            // {data: [{value: 'medagaskar'}], title: 'Total Registration'},
            // {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: <Logout {...this.props}/>, type: 'button'}], title: ''},
        ];

        return (
            <SectionList
                style={styles.container}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={ListHeader}
                sections={section}
            />
        );
    }

    _renderSectionHeader = ({section}) => {
        return <SectionHeader title={section.title}/>;
    };

    _renderItem = ({item}) => {
        if (item.type === 'button') {
            return (
                <SectionContent>
                    {item.value}
                </SectionContent>
            );
        } else {
            return (
                <SectionContent>
                    <Text style={styles.sectionContentText}>
                        {item.value}
                    </Text>
                </SectionContent>
            );
        }
    };
}

const ListHeader = () => {
    const {manifest} = Constants;
    return (
        <View style={styles.titleContainer}>
            <View style={styles.titleIconContainer}>
                <AppIconPreview iconUrl={manifest.iconUrl}/>
            </View>
            <View style={styles.titleTextContainer}>
                <Text style={styles.nameText} numberOfLines={1}>
                    {manifest.name}
                </Text>
                <Text style={styles.slugText} numberOfLines={1}>
                    www.techfestsliet.com
                </Text>
                <Text style={styles.descriptionText}>
                    innovation in cycle design
                </Text>
            </View>
        </View>
    );
};

const SectionHeader = ({title}) => {
    if (!title) return null;
    return (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>
                {title}
            </Text>
        </View>
    );
};

const SectionContent = props => {
    return (
        <View style={styles.sectionContentContainer}>
            {props.children}
        </View>
    );
};

const AppIconPreview = ({iconUrl}) => {
    if (!iconUrl) {
        iconUrl =
            'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
    }

    return (
        <Image
            source={{uri: iconUrl}}
            style={{width: 64, height: 64}}
            resizeMode="cover"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
    },
    titleIconContainer: {
        marginRight: 15,
        paddingTop: 2,
    },
    sectionHeaderContainer: {
        backgroundColor: '#fbfbfb',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ededed',
    },
    sectionHeaderText: {
        // fontSize: 14,
    },
    sectionContentContainer: {
        paddingTop: 8,
        paddingBottom: 12,
        paddingHorizontal: 15,
    },
    sectionContentText: {
        color: '#808080',
        // fontSize: 14,
    },
    nameText: {
        fontWeight: '600',
        fontSize: 18,
    },
    slugText: {
        color: '#a39f9f',
        fontSize: 14,
        backgroundColor: 'transparent',
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 6,
        color: '#4d4d4d',
    },
    colorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorPreview: {
        width: 17,
        height: 17,
        borderRadius: 2,
        marginRight: 6,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
    colorTextContainer: {
        flex: 1,
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

Settings.propTypes = ({
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
});

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {logout})(Settings);
