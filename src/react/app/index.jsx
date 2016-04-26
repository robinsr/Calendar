import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

import items from '../../common/items.json';

persist(alt, storage, 'app');

ReactDOM.render( <App items={items}/>, document.getElementById( 'app' ) );