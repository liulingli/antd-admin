/**
 * Created by liulingli on 2017-09-09
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router} from "react-router";
import App from './component/layout/app';
import MainLayout from './component/layout/layout';
import mainRoute from './route/mainRoute';
import Login from './component/layout/login';
import Register from './component/layout/register';

import './themes/theme.less';

const rootRoute = {
    path: '/',
    component: App,
    indexRoute: {component: MainLayout},
    childRoutes: [
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/', component: MainLayout, childRoutes: mainRoute}
    ],
    onEnter: function (nextState, replaceState) {
        //验证是否登录
        let loginData = localStorage.getItem('user');
        if(loginData){
            return;
        }else{
            nextState.location.pathname != '/login' && replaceState('/login');
        }
    }
};


ReactDOM.render((
    <Router history={browserHistory} routes={rootRoute}/>
), document.getElementById('main'));

window.browserHistory = browserHistory;