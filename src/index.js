/**
 * Created by liulingli on 2017-09-09
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router} from "react-router";
import MainLayout from './component/layout/layout';
import mainRoute from './route/mainRoute';
const rootRoute = {
  path: '/',
  component: MainLayout,
  childRoutes: mainRoute
};
console.log(mainRoute);
ReactDOM.render((
  <Router history={browserHistory} routes={rootRoute}/>
), document.getElementById('main'));

window.browserHistory = browserHistory;