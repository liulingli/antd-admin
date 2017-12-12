/**
 * Created by liulingli on 2017-09-09
 */
import React from 'react';
import {AppContainer} from 'react-hot-loader';
import {Layout, Icon, Menu, Popconfirm} from 'antd';
import {browserHistory, Router} from "react-router";

const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

import './layout.less';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            menu: [{
                key: '0',
                icon: 'pie-chart',
                text: '主页',
                path: '/dashboard'
            }, {
                key: '1',
                icon: 'user',
                text: '用户管理',
                path: '/user'
            }, {
                key: '2',
                icon: 'file',
                text: '博客管理',
                path: '/blogs'
            }]
        }

        this.confirm = this.confirm.bind(this);
        this.collapseToggle = this.collapseToggle.bind(this);
        this.onMenuChange = this.onMenuChange.bind(this);
    }

    componentWillMount(){
        console.log(this.props)
        // 生成左侧菜单

    }

    /**
     * @method 左侧菜单栏伸缩
     */
    collapseToggle(){
        this.setState({
            collapse: !this.state.collapse
        })
    };

    /**
     * @method 退出登录
     */
    confirm(){
        localStorage.clear();
        browserHistory.replace('/login');
    };

    /**
     * @method 菜单单击事件
     * @param item
     * @param key
     * @param keyPath
     */
    onMenuChange({item, key, keyPath}) {
        try {
            browserHistory.push(key);
        } catch (err) {
            console.log(1222)
        }
    };

    render() {
        const {isLogin, collapse} = this.state;
        return (
            <Layout className="main-layout">
                <Header className={collapse ? "collapse" : ""}>
                    <Icon type={collapse ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.collapseToggle}/></Header>
                <div className="header-right">
                    <ul className="header-menu">
                        <li className="menu-item"><Icon type="user"/>测试用户</li>
                        <Popconfirm placement="bottom" title={"确定退出系统？"} onConfirm={this.confirm} okText="确定"
                                    cancelText="取消">
                            <li className="menu-item"><Icon type="logout"/>退出系统</li>
                        </Popconfirm>

                    </ul>
                </div>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapse}
                    >
                        <div className="desc-layout">
                            <img src="./static/logo.png"/>
                            <span>antd-admin</span>
                        </div>
                        <Menu
                            defaultSelectedKeys={[this.state.menu[0].path]}
                            defaultOpenKeys={[this.state.menu[0].path]}
                            mode="inline"
                            theme="light"
                            inlineCollapsed={collapse}
                            onClick={this.onMenuChange}
                        >
                            {
                                this.state.menu.map((v, i) => {
                                    return <Menu.Item key={v.path}>
                                        <Icon type={v.icon}/>
                                        <span>{v.text}</span>
                                    </Menu.Item>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Content>{this.props.children ? this.props.children : "测试"}</Content>
                </Layout>
            </Layout>
        )
    }
}
