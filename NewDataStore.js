import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, SQLite, AppLoading } from 'expo';
import { Button, Text, Container, Content } from 'native-base';
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer';

const db = SQLite.openDatabase('db.db');

const freightRatesObj = require('./assets/freight_rates.json');

const createDB = new DatabaseLayer(async () => SQLite.openDatabase('db.db'))

export default class NewDataStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true, dataLoaded: false, }
        this.getData = this.getData.bind(this);
        this.insertData = this.insertData.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
    }

    componentDidMount() {
        createDB.executeSql('create table if not exists items (id integer primary key not null, port_of_loading text, pol_country text, port_of_discharge text, pod_country text, price_per_20ft_container text, created_at text, updated_at text);').then(response => {
            console.log('createDB   ... => ', response);
        })
        this.setState({ loading: false });
    }

    insertData() {
        createDB.tableName = 'items';
        createDB.bulkInsertOrReplace(freightRatesObj).then(response => {
            console.log('bulkinsertResponse... => ', response);

        })
    }


    deleteTable() {
        createDB.executeSql('delete from items;').then(response => {
            console.log('deleteTable.....=>', response);
        })
    }

    getData() {
        createDB.executeSql('select * from items;').then(response => {
            console.log('getData.... => ', response.rows);
            this.setState({ items: response.rows })
        })


    }

    render() {
        if (this.state.loading) {
            return (<AppLoading />);
        }
        return (
            <Container style={{ marginBottom: 16, marginHorizontal: 16 }}>
                <Content>
                    <Button onPress={this.insertData}>
                        <Text>Insert data to DB</Text>
                    </Button>

                    <Button onPress={this.deleteTable} style={{ marginTop: '10%' }}>
                        <Text>Delete Table data</Text>
                    </Button>

                    <Button onPress={this.getData} style={{ marginTop: '10%' }}>
                        <Text>Fetch the data from DB</Text>
                    </Button>

                    <Text style={styles.sectionHeading}> Items List </Text>
                    {(this.state.items) ? this.state.items.map(({ id, port_of_loading, pol_country, port_of_discharge, pod_country, price_per_20ft_container, created_at, updated_at }) => (
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
                    )) : null}
                </Content>
            </Container>
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
        marginBottom: 8,
        paddingTop: '10%'
    },
});