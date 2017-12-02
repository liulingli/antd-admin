/**
 * Created by liulingli on 2017-09-09
 */
import React from 'react';
import {AppContainer} from 'react-hot-loader';
import {Layout, Icon, Menu, Popconfirm} from 'antd';

const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
import MainLayout from './layout';
import Login from './login';
import Register from './register';

import './layout.less';

export default class APP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    compoentWillMount(){
        consoele.log(this.props)
    }

    render() {
        return (
            <AppContainer>
                {this.props.children || <div>首页</div>}
            </AppContainer>
        )
    }
}
