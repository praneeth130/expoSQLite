import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Constants, SQLite, AppLoading, Font } from 'expo';
import { Text, Button } from 'native-base';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>SQLite Example</Text>
                <Button onPress={() => { this.props.navigation.navigate('NewDataStore') }}>
                    <Text> Goto next screen </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexRow: {
        flexDirection: 'row'
    },
    input: {
        borderColor: '#4630eb',
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 5
    },
    listArea: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        paddingTop: 16
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8
    },
});