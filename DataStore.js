import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Constants, SQLite, AppLoading } from 'expo';
import { Button, Text } from 'native-base';

const db = SQLite.openDatabase('db.db');

const freightRatesObj = require('./assets/freight_rates.json');

export default class DataStore extends React.Component {
    constructor(props) {
        super(props);
        console.log('inside constructor ----------------------');
        this.state = { items: null, loading: true, dataLoaded: false, }
    }

    componentDidMount() {
        console.log('inside componentDidMount |||||||||||||||||');

        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists items (id integer primary key not null, port_of_loading text, pol_country text, port_of_discharge text, pod_country text, price_per_20ft_container text, created_at text, updated_at text);'
            );
        });
        this.setState({ loading: false });
    }

    insertData() {
        console.log('inside insertData....~~#####~~~~');

        db.transaction(tx => {
            // freightRatesObj.map(function (item) {
            tx.executeSql(
                'insert into items (port_of_loading, pol_country, port_of_discharge, pod_country, price_per_20ft_container, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)', ["item.port_of_loading", "item.pol_country", "item.port_of_discharge", "item.pod_country", "item.price_per_20ft_container", "item.created_at", "item.updated_at"], () => console.log('inserted record........................')
            );
            // });
        });

        // return new Promise((resolve, reject) => {
        //     db.transaction(
        //         tx => {
        //             freightRatesObj.map(function (item) {
        //                 tx.executeSql(
        //                     'insert into items (port_of_loading, pol_country, port_of_discharge, pod_country, price_per_20ft_container, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)', [item.port_of_loading, item.pol_country, item.port_of_discharge, item.pod_country, item.price_per_20ft_container, item.created_at, item.updated_at]
        //                 );
        //             }
        //             // tx.executeSql('select * from items', [], (_, { rows: _array }) => {
        //             //     //console.log(rows);
        //             //     console.log('rows => ', rows);
        //             //     console.log('_array => ', _array);
        //             //     this.setState({ items: _array })
        //             //     resolve(_array);
        //             // });
        //         }, null, null);
        // });
    }

    getData() {
        console.log('inside getData ??????????????????????????');

        db.transaction(tx => {
            tx.executeSql(
                'select * from items',
                [],
                (_, { rows: _array }) =>
                    // console.log(rows, '....', _array)
                    this.setState({ items: _array })
            );
        });

        // return new Promise((resolve, reject) => {
        //     db.transaction(
        //         tx => {
        //             tx.executeSql('select * from items', [], (_, { rows: _array }) => {
        //                 //console.log(rows);
        //                 console.log('rows => ', rows);
        //                 console.log('_array => ', _array);
        //                 this.setState({ items: _array })
        //                 resolve(_array);
        //             });
        //         }, null, null);
        //     this.setState({ dataLoaded: true })
        // });

    }

    render() {
        if (this.state.loading) {
            return (<AppLoading />);
        }
        return (
            <View style={{ marginBottom: 16, marginHorizontal: 16 }}>

                <Button onPress={this.insertData}>
                    <Text>Insert data to DB</Text>
                </Button>

                <Button onPress={this.getData} style={{ top: '20%' }}>
                    <Text>Fetch the data from DB</Text>
                </Button>

                <Text style={styles.sectionHeading}> Items List </Text>
                {/* {this.state.items.map(({ id, port_of_loading, pol_country, port_of_discharge, pod_country, price_per_20ft_container, created_at, updated_at }) => (
                    <TouchableOpacity
                        key={id}
                        style={{
                            backgroundColor: '#1c9963',
                            borderColor: '#000',
                            borderWidth: 1,
                            padding: 8
                        }}>
                        <Text style={{ color: '#000' }} >{id}</Text>
                        <Text style={{ color: '#000' }}>{port_of_loading}</Text>
                        <Text style={{ color: '#000' }}>{pol_country}</Text>
                        <Text style={{ color: '#000' }}>{port_of_discharge}</Text>
                        <Text style={{ color: '#000' }}>{pod_country}</Text>
                        <Text style={{ color: '#000' }}>{price_per_20ft_container}</Text>
                        <Text style={{ color: '#000' }}>{created_at}</Text>
                        <Text style={{ color: '#000' }}>{updated_at}</Text>
                    </TouchableOpacity>
                ))} */}
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