import React from 'react';
import {Constants} from 'expo';
import {connect} from 'react-redux';
import {SectionList, StyleSheet, Text, View} from 'react-native';

class Participation extends React.Component {
    render() {
        const section = [
            {data: [{value: 'medagaskar'}], title: 'Event Category'},
            {data: [{value: 'medagaskar'}], title: 'Event Title'},
            {data: [{value: 'medagaskar'}], title: 'Total Registration'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar '}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
            {data: [{value: 'medagaskar'}], title: 'Participated'},
        ];

        return (
            <SectionList
                style={styles.container}
                // renderSectionHeader={this._renderSectionHeader}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index}
                // ListHeaderComponent={ListHeader}
                sections={section}
            />
        );
    }


    _renderItem = ({item}) => (
        <SectionContent>
            <Text style={styles.sectionContentText}>
                {item.value} ({item.value})
            </Text>
        </SectionContent>
    );
}

const ListHeader = () => {
    const {manifest} = Constants;
    return (
        <View style={styles.titleContainer}>
            <View>
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


const SectionContent = props => {
    return (
        <View style={styles.sectionContentContainer}>
            {props.children}
        </View>
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
    sectionContentContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f8',
        marginBottom: 2,
    },
    sectionContentText: {
        fontSize: 18,
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
});

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(Participation);
