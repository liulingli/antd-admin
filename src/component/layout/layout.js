/**
 * Created by liulingli on 2017-09-09
 */
import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './layout.less';

export default class MainLayout extends React.Component{

  render(){
    return (
      <Layout className="main-layout">
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}
