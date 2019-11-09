import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router><App /></Router>
    </Provider>, 
    document.getElementById('root'));

serviceWorker.unregister();
