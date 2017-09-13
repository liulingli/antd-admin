import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {browserHistory, Router} from "react-router";
import MainLayout from './component/layout/layout';

ReactDOM.render(
  <AppContainer>
    <MainLayout/>
  </AppContainer>,
  document.getElementById('main')
);
