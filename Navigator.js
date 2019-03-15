import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import DataStore from './DataStore';
import SQLiteExample from './SQLiteExample';
import HomeScreen from './HomeScreen';
import NewDataStore from './NewDataStore';


const nav = createStackNavigator({
    HomeScreen: HomeScreen,
    NewDataStore: NewDataStore,
    DataStore: DataStore,
    SQLiteExample: SQLiteExample,
}, {
        initialRouteName: 'HomeScreen',
    });

const Cont = createAppContainer(nav);

export default Cont;