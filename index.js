import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';

import store from './models/store';
import { Provider } from 'mobx-react/native'

class MainApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('HupuApp', () => MainApp);
