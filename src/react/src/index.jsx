import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

const todayRoute = moment().format('YYYY/M');

ReactDOM.render((
   <Router history={hashHistory}>
    <Route path="/">
      <IndexRedirect to={todayRoute} />
      <Route path=":year/:month" component={App} />
    </Route>
  </Router>
), document.getElementById( 'app' ) );