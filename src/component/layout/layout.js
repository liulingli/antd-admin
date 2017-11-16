/**
 * Created by liulingli on 2017-09-09
 */
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Layout, Icon, Menu,Popconfirm } from 'antd';
const { Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
import Login from './login';
import './layout.less';

export default class MainLayout extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLogin : window.sessionStorage.getItem("isLogin")||false,
      collapse : false,
      menu :[{
        key : '0',
        icon : 'pie-chart',
        text : 'dashboard',
        path : '/dashboard'
      },{
        key : '1',
        icon : 'desktop',
        text : 'table',
        path : '/table'
      }]
    }
  }

  /**
   *@method 验证登录
   */
  checkLogin = (values)=>{
    if(values.userName==='123'&&values.password==='123'){
      this.setState({
        isLogin : true
      });
      browserHistory.push('/dashboard');
      window.sessionStorage.setItem("isLogin",true);
    }
  };
  /**
   * @method 左侧菜单栏伸缩
   */
  collapseToggle = () =>{
     this.setState({
       collapse : !this.state.collapse
     })
  };

  confirm = () =>{

  };
  /**
   * @method 菜单单击事件
   * @param item
   * @param key
   * @param keyPath
   */
  onMenuChange = ({ item, key, keyPath }) =>{
    try{
      browserHistory.push(key);
    }catch(err){
      console.log(1222)
    }
  };
  render(){
    const {isLogin,collapse} = this.state;
    return (
       <AppContainer>
         {
           isLogin ?
             <Layout className="main-layout">
               <Header className={collapse ? "collapse" : ""}>
                 <Icon type={collapse ? 'menu-unfold' : 'menu-fold'} onClick={this.collapseToggle}/></Header>
               <div className="header-right">
                 <ul className="header-menu">
                   <li className="menu-item"><Icon type="user"/>测试用户</li>
                   <Popconfirm placement="bottom" title={"确定退出系统？"} onConfirm={confirm} okText="确定" cancelText="取消">
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
                       this.state.menu.map((v,i)=>{
                         return  <Menu.Item key={v.path}>
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
             : <Login checkLogin={this.checkLogin}/>
         }
       </AppContainer>
    )
  }
}
