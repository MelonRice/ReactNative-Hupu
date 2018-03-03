import React, { Component } from 'react';

import { observer, inject } from 'mobx-react/native'
import store from './models/store';

import DrawerNavigator from './screens/DrawerNavigator';

@inject('store') @observer
export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return  (<DrawerNavigator/>);
    }
}

